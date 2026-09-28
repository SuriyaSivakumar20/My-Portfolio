import { useState, useRef, useEffect, useCallback } from 'react';

interface AmbientAudioProps {
  className?: string;
  variant?: 'nav' | 'compact' | 'drawer';
}

const TRACKS = [
  {
    id: 'ambient',
    label: 'Warm Forest',
    sublabel: 'Acoustic Guitar & Woodwinds',
    src: '/audio/forest-ambient.mp3',
  },
  {
    id: 'nature',
    label: 'Forest Birds',
    sublabel: 'Canopy Breeze & Birds',
    src: '/audio/forest-nature.mp3',
  },
];

export default function AmbientAudio({ className = '', variant = 'nav' }: AmbientAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [showMenu, setShowMenu] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const currentTrack = TRACKS[trackIndex];

  // Initialize audio instance once
  useEffect(() => {
    const audio = new Audio();
    audio.src = currentTrack.src;
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'none';
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.addEventListener('ended', handleEnded);

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  // Smooth volume fade helper
  const fadeVolume = useCallback((targetVol: number, durationMs = 600, onComplete?: () => void) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) return;

    const stepMs = 30;
    const steps = Math.max(1, Math.floor(durationMs / stepMs));
    const startVol = audio.volume;
    const diff = targetVol - startVol;
    let stepCount = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      stepCount++;
      const current = Math.max(0, Math.min(1, startVol + (diff * (stepCount / steps))));
      if (audio) audio.volume = current;

      if (stepCount >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        if (audio) audio.volume = targetVol;
        if (onComplete) onComplete();
      }
    }, stepMs);
  }, []);

  // Switch track dynamically
  const switchTrack = useCallback((index: number) => {
    setTrackIndex(index);
    setShowMenu(false);
    const audio = audioRef.current;
    if (!audio) return;

    const nextTrack = TRACKS[index];
    if (isPlaying) {
      fadeVolume(0, 300, () => {
        audio.src = nextTrack.src;
        audio.play().then(() => {
          fadeVolume(volume, 600);
        }).catch(() => {
          setIsPlaying(false);
        });
      });
    } else {
      audio.src = nextTrack.src;
    }
  }, [isPlaying, volume, fadeVolume]);

  // Toggle Play / Pause with smooth fade
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeVolume(0, 450, () => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      audio.src = currentTrack.src;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeVolume(volume, 700);
          })
          .catch((err) => {
            console.warn('Audio playback blocked or unavailable:', err);
            setIsPlaying(false);
          });
      }
    }
  }, [isPlaying, currentTrack.src, volume, fadeVolume]);

  // Close popup menu when clicking outside
  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [showMenu]);

  // Drawer variant for mobile sheet
  if (variant === 'drawer') {
    return (
      <div className={`pt-4 border-t border-[var(--rule)] ${className}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--ink-4)]">
              Background Ambience
            </span>
            <span className="text-[13px] font-bold text-[var(--ink)]">
              {currentTrack.label}
            </span>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-300 border ${
              isPlaying
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm'
                : 'bg-[var(--paper-2)] text-[var(--ink-2)] border-[var(--ink)]/20 hover:border-[var(--accent)]'
            }`}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pause forest music' : 'Play forest music'}
          >
            {/* Visualizer bars */}
            <div className="flex items-end gap-[2px] h-[14px]" aria-hidden="true">
              <span
                className={`w-[2.5px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-white animate-[equalizer_0.9s_ease-in-out_infinite]' : 'bg-[var(--ink-3)] h-[4px]'
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-white animate-[equalizer_1.2s_ease-in-out_infinite_0.15s]' : 'bg-[var(--ink-3)] h-[8px]'
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-white animate-[equalizer_0.75s_ease-in-out_infinite_0.3s]' : 'bg-[var(--ink-3)] h-[5px]'
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-white animate-[equalizer_1.05s_ease-in-out_infinite_0.1s]' : 'bg-[var(--ink-3)] h-[9px]'
                }`}
              />
            </div>
            <span>{isPlaying ? 'Music On' : 'Music Off'}</span>
          </button>
        </div>

        {/* Track switch options on mobile drawer */}
        <div className="flex items-center gap-2 mt-3">
          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => switchTrack(idx)}
              className={`flex-1 py-1.5 px-2 text-[10px] uppercase font-bold tracking-wider rounded border text-center transition-colors ${
                trackIndex === idx
                  ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                  : 'bg-[var(--paper)] text-[var(--ink-3)] border-[var(--rule)] hover:border-[var(--ink-2)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Nav desktop / header variant
  return (
    <div ref={menuRef} className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center rounded-full bg-[var(--paper)]/90 backdrop-blur-md border border-[var(--ink)]/15 shadow-sm p-1">
        {/* Main Audio Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`group flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 ${
            isPlaying
              ? 'text-[var(--accent)] hover:text-[var(--accent-dark)]'
              : 'text-[var(--ink-3)] hover:text-[var(--ink)]'
          }`}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Turn off background forest music' : 'Turn on background forest music'}
          title={isPlaying ? 'Forest ambience: ON (Click to turn off)' : 'Forest ambience: OFF (Click to turn on)'}
        >
          {/* Animated 4-bar equalizer */}
          <div className="flex items-end gap-[2px] h-[13px] w-[14px]" aria-hidden="true">
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-[var(--accent)] animate-[equalizer_0.8s_ease-in-out_infinite]'
                  : 'bg-[var(--ink-4)] h-[3px] group-hover:bg-[var(--ink)]'
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-[var(--accent)] animate-[equalizer_1.1s_ease-in-out_infinite_0.15s]'
                  : 'bg-[var(--ink-4)] h-[7px] group-hover:bg-[var(--ink)]'
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-[var(--accent)] animate-[equalizer_0.7s_ease-in-out_infinite_0.3s]'
                  : 'bg-[var(--ink-4)] h-[4px] group-hover:bg-[var(--ink)]'
              }`}
            />
            <span
              className={`w-[2px] rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-[var(--accent)] animate-[equalizer_1s_ease-in-out_infinite_0.1s]'
                  : 'bg-[var(--ink-4)] h-[8px] group-hover:bg-[var(--ink)]'
              }`}
            />
          </div>

          <span className="hidden sm:inline font-mono text-[10.5px]">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>
        </button>

        {/* Small dropdown arrow to switch forest ambient tracks */}
        <button
          type="button"
          onClick={() => setShowMenu((v) => !v)}
          className="px-1.5 py-1 text-[var(--ink-3)] hover:text-[var(--ink)] text-[10px] transition-colors"
          aria-label="Select audio track"
          title="Change forest music"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Track Selection Dropdown Popup */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-[var(--paper)]/95 backdrop-blur-lg border border-[var(--ink)]/15 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 border-b border-[var(--rule)] mb-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[var(--ink-4)]">
              Ambient Forest Atmosphere
            </span>
          </div>

          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => switchTrack(idx)}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-[12px] flex items-center justify-between transition-colors ${
                trackIndex === idx
                  ? 'bg-[var(--accent-soft)] text-[var(--accent-dark)] font-bold'
                  : 'text-[var(--ink-2)] hover:bg-[var(--paper-2)]'
              }`}
            >
              <div>
                <p className="leading-tight">{t.label}</p>
                <p className="text-[10px] font-normal text-[var(--ink-3)]">{t.sublabel}</p>
              </div>
              {trackIndex === idx && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}

          {/* Quick Volume Slider */}
          <div className="px-2.5 py-2 mt-1 border-t border-[var(--rule)]">
            <div className="flex items-center justify-between text-[10px] text-[var(--ink-3)] mb-1">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (audioRef.current && isPlaying) {
                  audioRef.current.volume = val;
                }
              }}
              className="w-full h-1 bg-[var(--paper-3)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
              aria-label="Background music volume"
            />
          </div>
        </div>
      )}
    </div>
  );
}
