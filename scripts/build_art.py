"""
MANGA PORTFOLIO — ART PIPELINE
Turns the generated manga artwork (7 reference PNGs) into the layered,
compressed assets the site actually ships: paper, distress, cut-out
character, forest strips, orange brush block and per-section art panels.

Run:  python scripts/build_art.py
In :  .ref/artwork/*.png   (originals)  or the source folder passed as argv[1]
Out :  public/art/*.webp
"""

from __future__ import annotations

import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "art")

CANDIDATE_SOURCES = [
    os.path.join(ROOT, ".ref", "artwork"),
    r"C:\Users\subisuriya\Downloads\portfolio mages",
]

W, H = 1672, 941  # every reference plate is 16:9-ish at this size


def find_source() -> str:
    if len(sys.argv) > 1:
        return sys.argv[1]
    for c in CANDIDATE_SOURCES:
        if os.path.isdir(c) and glob_pngs(c):
            return c
    raise SystemExit("No artwork folder found — pass the path as argv[1].")


def glob_pngs(folder: str) -> dict:
    out = {}
    for n in os.listdir(folder):
        if n.lower().endswith(".png"):
            out[os.path.splitext(n)[0].replace(" ", "_").lower()] = os.path.join(folder, n)
    return out


def load(files: dict, key: str) -> np.ndarray:
    if key not in files:
        raise SystemExit(f"missing plate: {key}")
    img = cv2.imread(files[key], cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return img


def frac(img: np.ndarray, x0, y0, x1, y1) -> np.ndarray:
    h, w = img.shape[:2]
    return img[int(y0 * h):int(y1 * h), int(x0 * w):int(x1 * w)].copy()


def save_webp(arr: np.ndarray, name: str, quality: int = 84) -> dict:
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, name)
    if arr.ndim == 2:
        Image.fromarray(arr).save(path, "WEBP", quality=quality, method=6)
    elif arr.shape[2] == 4:
        Image.fromarray(arr, "RGBA").save(path, "WEBP", quality=quality, method=6, exact=False)
    else:
        Image.fromarray(arr, "RGB").save(path, "WEBP", quality=quality, method=6)
    kb = os.path.getsize(path) / 1024
    print(f"  {name:26s} {arr.shape[1]}x{arr.shape[0]}  {kb:7.1f} KB")
    return {"file": name, "w": int(arr.shape[1]), "h": int(arr.shape[0]), "kb": round(kb, 1)}


def alpha_fade(a: np.ndarray, top=0, right=0, bottom=0, left=0) -> np.ndarray:
    """Linear alpha ramps in from the given edges (pixels)."""
    h, w = a.shape[:2]
    yy = np.arange(h)[:, None]
    xx = np.arange(w)[None, :]
    out = a.astype(np.float32)
    if top:
        out *= np.clip(yy / top, 0, 1)
    if bottom:
        out *= np.clip((h - 1 - yy) / bottom, 0, 1)
    if left:
        out *= np.clip(xx / left, 0, 1)
    if right:
        out *= np.clip((w - 1 - xx) / right, 0, 1)
    return out


# ---------------------------------------------------------------------------
# 1. CHARACTER CUT-OUT  (hero)  — the plate has no alpha, so we key it out
# ---------------------------------------------------------------------------
def character_mask(rgb: np.ndarray) -> np.ndarray:
    r = rgb[..., 0].astype(np.int16)
    g = rgb[..., 1].astype(np.int16)
    b = rgb[..., 2].astype(np.int16)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    span = rgb.max(axis=2).astype(np.int16) - rgb.min(axis=2).astype(np.int16)

    # background = burnt-orange display type  OR  bright *neutral* paper.
    # the saturation guard matters: lit skin is nearly as bright as the paper
    # but keeps a warm 40+ channel spread, so it survives the key.
    bg_orange = ((r - g) > 45) & (r > 100)
    bg_paper = (lum > 203) & (span < 30)
    raw = (~(bg_orange | bg_paper)).astype(np.uint8) * 255

    # pass 1 — a coarse, hole-free silhouette used only as a region of interest
    k_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (19, 19))
    coarse = cv2.morphologyEx(raw, cv2.MORPH_OPEN, k_open, iterations=1)
    coarse = cv2.morphologyEx(coarse, cv2.MORPH_CLOSE, k_close, iterations=1)
    coarse = keep_central_runs(largest_component(coarse))

    # pass 2 — re-apply the raw key inside that region so hair spikes, hatching
    # and fabric edges stay crisp instead of getting rounded off by the close.
    region = cv2.dilate(
        coarse, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (31, 31))
    )
    fine = cv2.bitwise_and(raw, region)
    fine = cv2.morphologyEx(
        fine, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    )
    fine = fill_holes(fine)
    fine = keep_central_runs(largest_component(fine))
    # 1px inset eats the anti-aliased rim of the original background
    return cv2.erode(
        fine, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    )


def largest_component(mask: np.ndarray) -> np.ndarray:
    num, lab, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    if num <= 2:
        return mask
    keep = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    return np.where(lab == keep, 255, 0).astype(np.uint8)


def fill_holes(mask: np.ndarray) -> np.ndarray:
    """Close bright specular gaps inside the figure without touching its edge."""
    inv = cv2.bitwise_not(mask)
    ff = inv.copy()
    cv2.floodFill(ff, np.zeros((mask.shape[0] + 2, mask.shape[1] + 2), np.uint8), (0, 0), 0)
    return cv2.bitwise_or(mask, ff)


def keep_central_runs(mask: np.ndarray) -> np.ndarray:
    ys, xs = np.where(mask > 0)
    if len(xs) == 0:
        return mask
    centre = xs.mean()
    out = np.zeros_like(mask)
    for y in range(mask.shape[0]):
        row = (mask[y] > 0).astype(np.int16)
        if not row.any():
            continue
        padded = np.concatenate(([0], row, [0]))
        edges = np.diff(padded)
        starts = np.where(edges == 1)[0]
        ends = np.where(edges == -1)[0]
        if len(starts) == 1:
            out[y, starts[0]:ends[0]] = 255
            continue
        best, best_d = None, 1e18
        for s, e in zip(starts, ends):
            if e - s < 8:
                continue
            d = abs((s + e) / 2 - centre)
            if d < best_d:
                best_d, best = d, (s, e)
        if best is not None:
            out[y, best[0]:best[1]] = 255
    return out


def build_character(files: dict) -> dict:
    plate = load(files, "home")
    crop = frac(plate, 0.245, 0.00, 0.725, 0.645)
    m = character_mask(crop)
    m = cv2.GaussianBlur(m, (0, 0), 1.1)
    a = alpha_fade(m, bottom=int(0.16 * m.shape[0]))
    rgba = np.dstack([crop, a.astype(np.uint8)])
    ys, xs = np.where(a > 10)
    rgba = rgba[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    return save_webp(rgba, "hero-character.webp", 88)


# ---------------------------------------------------------------------------
# 2. FOREST STRIPS  (hero foreground parallax)
# ---------------------------------------------------------------------------
def build_forest(files: dict) -> list:
    plate = load(files, "home")
    out = []
    specs = [
        ("forest-l.webp", (0.000, 0.715, 0.140, 1.000), dict(top=46, right=90)),
        ("forest-r.webp", (0.705, 0.715, 1.000, 1.000), dict(top=46, left=110)),
    ]
    for name, box, fade in specs:
        c = frac(plate, *box)
        r = c[..., 0].astype(np.int16)
        g = c[..., 1].astype(np.int16)
        orange = ((r - g) > 55) & (r > 110)
        if orange.mean() > 0.02:          # drop leftovers of the display type
            c = c.copy()
            c[orange] = np.array([233, 227, 216], dtype=np.uint8)
        a = alpha_fade(np.full(c.shape[:2], 255, np.uint8), **fade).astype(np.uint8)
        out.append(save_webp(np.dstack([c, a]), name, 84))
    return out


# ---------------------------------------------------------------------------
# 3. PER-SECTION ART PANELS  (left column of each plate, soft right edge)
# ---------------------------------------------------------------------------
PANELS = [
    ("aboutme", "art-about.webp", 0),
    ("experience", "art-experience.webp", 0),
    ("projects", "art-projects.webp", 0),
    ("skils", "art-skills.webp", 0),
    ("contact", "art-contact.webp", 0),
]


def build_panels(files: dict) -> list:
    out = []
    for key, name, _ in PANELS:
        if key not in files:
            continue
        plate = load(files, key)
        bx = art_boundary(plate) + 54
        c = plate[:, :bx].copy()
        a = alpha_fade(np.full(c.shape[:2], 255, np.uint8), right=int(0.30 * bx))
        out.append(save_webp(np.dstack([c, a.astype(np.uint8)]), name, 84))
    return out


def art_boundary(plate: np.ndarray) -> int:
    """First column from which the plate stays mostly blank paper."""
    a = plate.astype(np.int16)
    mx = a.max(axis=2)
    mn = a.min(axis=2)
    paper = ((mx > 175) & ((mx - mn) < 40)).mean(axis=0)
    for x in range(40, plate.shape[1] - 200):
        if paper[x:x + 160].mean() > 0.62:
            return x
    return 420


# ---------------------------------------------------------------------------
# 4. ORANGE BRUSH BLOCK  (solid display colour, torn edges, real grunge)
# ---------------------------------------------------------------------------
def build_orange(files: dict) -> dict:
    plate = load(files, "home")
    # densest patch of burnt orange on the plate
    r = plate[..., 0].astype(np.int16)
    g = plate[..., 1].astype(np.int16)
    b = plate[..., 2].astype(np.int16)
    om = (((r - g) > 55) & (r > 110) & (b < 150)).astype(np.float32)
    win_w, win_h = 360, 640
    dens = cv2.boxFilter(om, -1, (win_w, win_h), normalize=True)
    _, _, _, maxloc = cv2.minMaxLoc(dens)
    x, y = maxloc
    x = min(max(0, x - win_w // 2), plate.shape[1] - win_w)
    y = min(max(0, y - win_h // 2), plate.shape[0] - win_h)
    patch = plate[y:y + win_h, x:x + win_w].copy()

    # solid colour base + the plate's own grain multiplied back in
    base = np.array([197, 68, 31], dtype=np.float32)
    gray = cv2.cvtColor(patch, cv2.COLOR_RGB2GRAY).astype(np.float32)
    # heavy blur: keep the plate's lighting gradient, drop its printed text —
    # otherwise the crop bakes a second copy of the meta list into the block
    gray = cv2.GaussianBlur(gray, (0, 0), 24)
    shade = np.clip(0.78 + gray / 255.0 * 0.4, 0.7, 1.12)[..., None]
    solid = np.clip(base * shade, 0, 255).astype(np.uint8)

    # ragged left/right edges so it reads as a brush block, not a CSS box
    h, w = solid.shape[:2]
    rng = np.random.default_rng(7)
    def edge(n, amp):
        e = np.cumsum(rng.normal(0, 1, n))
        e = np.abs(e)
        e = cv2.GaussianBlur(e.reshape(-1, 1), (0, 0), 9).ravel()
        return (e / (e.max() + 1e-6) * amp).astype(int)
    left = edge(h, w * 0.10)
    right = edge(h, w * 0.10)
    yy = np.arange(h)[:, None]
    xx = np.arange(w)[None, :]
    alpha = ((xx >= left[:, None]) & (xx <= (w - 1 - right[:, None]))).astype(np.uint8) * 255
    alpha = cv2.GaussianBlur(alpha, (0, 0), 1.4)
    return save_webp(np.dstack([solid, alpha]), "orange-block.webp", 88)


# ---------------------------------------------------------------------------
# 5. PAPER + DISTRESS  (sampled from the plates so the grain is authentic)
# ---------------------------------------------------------------------------
def build_paper(files: dict) -> list:
    plate = load(files, "aboutme")
    # a blank pocket of paper on the right of the about plate
    sw = frac(plate, 0.55, 0.08, 0.95, 0.72)
    sw = cv2.resize(sw, (1600, 1000), interpolation=cv2.INTER_CUBIC)
    # flatten the lighting, keep the fibre/speckle grain
    blur = cv2.GaussianBlur(sw, (0, 0), 38).astype(np.float32)
    detail = sw.astype(np.float32) - blur + np.array([237.0, 231.0, 220.0])
    paper = np.clip(detail, 0, 255).astype(np.uint8)

    out = [save_webp(paper, "paper.webp", 82)]

    # high-contrast speckle/scratch map → used as a multiply overlay.
    # NOTE: this original speck layer is near-opaque black; the shipped file is
    # rebuilt by scripts/build_textures.py — run that one after this script.
    g = cv2.cvtColor(sw, cv2.COLOR_RGB2GRAY)
    g = cv2.normalize(g, None, 0, 255, cv2.NORM_MINMAX)
    alpha = np.clip((200 - g) * 2.2, 0, 255).astype(np.uint8)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 0.5)
    speck = np.dstack([np.full_like(g, 34), np.full_like(g, 26), np.full_like(g, 20), alpha])
    out.append(save_webp(speck, "distress.webp", 80))
    return out


# ---------------------------------------------------------------------------
# 6. PROCEDURAL TILES  (halftone + film grain, seamless)
# ---------------------------------------------------------------------------
def build_tiles() -> list:
    out = []
    n = 72
    tile = np.zeros((n, n, 4), np.uint8)
    cv2.circle(tile, (18, 18), 3, (17, 15, 14, 255), -1, lineType=cv2.LINE_AA)
    cv2.circle(tile, (54, 54), 3, (17, 15, 14, 255), -1, lineType=cv2.LINE_AA)
    cv2.circle(tile, (54, 18), 2, (196, 68, 31, 190), -1, lineType=cv2.LINE_AA)
    cv2.circle(tile, (18, 54), 2, (196, 68, 31, 190), -1, lineType=cv2.LINE_AA)
    out.append(save_webp(tile, "halftone.webp", 95))

    rng = np.random.default_rng(3)
    n = 160
    noise = rng.normal(128, 26, (n, n))
    noise = np.clip(noise, 0, 255).astype(np.uint8)
    g = np.dstack([noise, noise, noise, np.full((n, n), 255, np.uint8)])
    out.append(save_webp(g, "grain.webp", 90))
    return out


def main():
    src = find_source()
    files = glob_pngs(src)
    print(f"source: {src}")
    manifest = {}
    print("character")
    manifest["character"] = build_character(files)
    print("forest")
    manifest["forest"] = build_forest(files)
    print("panels")
    manifest["panels"] = build_panels(files)
    print("orange")
    manifest["orange"] = build_orange(files)
    print("paper")
    manifest["paper"] = build_paper(files)
    print("tiles")
    manifest["tiles"] = build_tiles()
    total = sum(
        os.path.getsize(os.path.join(OUT, m["file"]))
        for group in manifest.values()
        for m in (group if isinstance(group, list) else [group])
    )
    print(f"\ntotal art payload: {total/1024:.0f} KB")
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)


if __name__ == "__main__":
    main()
