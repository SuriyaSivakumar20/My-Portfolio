"""Print textures: the ink distress layer.

The distress that comes out of build_art.py is a flat high-pass of the paper
photo — almost fully opaque near-black, which is why multiplying it over the
cream stage turned the whole page grey. This rebuilds it the way press
distress actually looks: transparent stock with sparse ink specks, scratches,
blotches and edge wear, so the paper stays cream and only the marks darken.

Run:  python scripts/build_textures.py
"""

import os

import cv2
import numpy as np

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "art")
PAPER = os.path.join(OUT, "paper.webp")
W, H = 1600, 1000
INK = (16, 12, 10)  # BGR — warm near-black

rng = np.random.default_rng(7)


def fibre_layer() -> np.ndarray:
    """Darken only the paper's crevices, never the whole sheet."""
    paper = cv2.imread(PAPER)
    if paper is None:
        return np.zeros((H, W), np.float32)
    paper = cv2.resize(paper, (W, H))
    g = cv2.cvtColor(paper, cv2.COLOR_BGR2GRAY).astype(np.float32)
    hp = g - cv2.GaussianBlur(g, (0, 0), 5.0)
    return np.clip(-hp / 14.0, 0.0, 1.0) * 0.45


def speck_layer() -> np.ndarray:
    a = np.zeros((H, W), np.float32)
    n = int(W * H * 0.0016)
    xs = rng.integers(0, W, n)
    ys = rng.integers(0, H, n)
    a[ys, xs] = rng.uniform(0.35, 0.95, n)
    return cv2.GaussianBlur(a, (0, 0), 0.7)


def scratch_layer() -> np.ndarray:
    layer = np.zeros((H, W), np.uint8)
    for _ in range(80):  # fine scratches
        x0 = int(rng.integers(0, W))
        y0 = int(rng.integers(0, H))
        ang = rng.uniform(0, np.pi)
        ln = int(rng.uniform(24, 380))
        x1 = int(np.clip(x0 + np.cos(ang) * ln, 0, W - 1))
        y1 = int(np.clip(y0 + np.sin(ang) * ln * 0.45, 0, H - 1))
        cv2.line(layer, (x0, y0), (x1, y1), 255, int(rng.integers(1, 3)))
    for _ in range(16):  # small plate wear — kept tight so it reads as ink, not cloud
        cx, cy = int(rng.integers(0, W)), int(rng.integers(0, H))
        cv2.ellipse(
            layer,
            (cx, cy),
            (int(rng.integers(3, 24)), int(rng.integers(2, 12))),
            float(rng.uniform(0, 180)),
            0,
            360,
            255,
            -1,
        )
    a = layer.astype(np.float32) / 255.0
    return cv2.GaussianBlur(a, (0, 0), 0.8)


def edge_layer() -> np.ndarray:
    """Handled sheets wear out at the edges."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dx = np.minimum(xx, W - 1 - xx) / (W / 2)
    dy = np.minimum(yy, H - 1 - yy) / (H / 2)
    d = np.minimum(dx, dy)
    return np.clip((0.22 - d) / 0.22, 0, 1) * 0.35


def main() -> None:
    alpha = fibre_layer()
    alpha = np.maximum(alpha, speck_layer())
    alpha = np.maximum(alpha, scratch_layer() * 0.55)
    alpha = np.maximum(alpha, edge_layer())

    out = np.zeros((H, W, 4), np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = INK
    out[..., 3] = np.clip(alpha * 255, 0, 255).astype(np.uint8)

    path = os.path.join(OUT, "distress.webp")
    cv2.imwrite(path, out, [cv2.IMWRITE_WEBP_QUALITY, 72])
    kb = os.path.getsize(path) / 1024
    print(f"distress.webp  {W}x{H}  mean alpha {out[..., 3].mean():.1f}  {kb:.0f} KB")


if __name__ == "__main__":
    main()
