"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconPlayerPlay,
  IconLayoutGrid,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
  IconLock,
} from "@tabler/icons-react";

// Types
export interface CustomKeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableSound?: boolean;
  showPreview?: boolean;
  theme?: "light" | "dark" | "auto";
}

interface KeyboardContextType {
  activeKeys: Set<string>;
  triggerKey: (code: string) => void;
  releaseKey: (code: string) => void;
  soundEnabled: boolean;
  lastPressedKey: string | null;
  displayLabel: string | null;
  capsLocked: boolean;
  theme: "light" | "dark" | "auto";
}

const KeyboardContext = createContext<KeyboardContextType | null>(null);

const useKeyboard = () => {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboard must be used within CustomKeyboard");
  return ctx;
};

// Authentic Apple Magic Keyboard Scissor-Switch Sound Player (using mackeysound.ogg)
let macAudioCtx: AudioContext | null = null;
let macSoundBuffer: AudioBuffer | null = null;
let cachedNoiseBuffer: AudioBuffer | null = null;

function getMacAudioContext() {
  if (typeof window === "undefined") return null;
  if (!macAudioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      macAudioCtx = new AudioCtxClass();
      const sampleRate = macAudioCtx.sampleRate;
      const bufferSize = Math.floor(sampleRate * 0.015);
      cachedNoiseBuffer = macAudioCtx.createBuffer(1, bufferSize, sampleRate);
      const data = cachedNoiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }
    }
  }
  if (macAudioCtx && macAudioCtx.state === "suspended") {
    void macAudioCtx.resume();
  }
  return macAudioCtx;
}

// Preload user's mackeysound.ogg
if (typeof window !== "undefined") {
  const loadMacSound = async () => {
    try {
      const ctx = getMacAudioContext();
      if (!ctx) return;
      const res = await fetch("/sounds/mackeysound.ogg");
      if (!res.ok) return;
      const arrayBuf = await res.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(arrayBuf);
      macSoundBuffer = audioBuf;
    } catch {
      // Keep UI interactive if fetch fails
    }
  };
  void loadMacSound();
}

const KEY_PITCH_MAP: Record<string, number> = {
  Space: 0.78,
  Enter: 0.85,
  Backspace: 0.88,
  Tab: 0.90,
  ShiftLeft: 0.86,
  ShiftRight: 0.86,
  CapsLock: 0.88,
  Escape: 1.22,
  F1: 1.15,
  F2: 1.16,
  F3: 1.17,
  F4: 1.18,
  F5: 1.19,
  F6: 1.20,
  F7: 1.21,
  F8: 1.22,
  F9: 1.23,
  F10: 1.24,
  F11: 1.25,
  F12: 1.26,
};

const SOUND_DEFINES_DOWN: Record<string, [number, number]> = {
  Escape: [9069, 115],
  F1: [2754, 104],
  F2: [3155, 99],
  F3: [3545, 103],
  F4: [3913, 100],
  F5: [4305, 96],
  F6: [4666, 103],
  F7: [5034, 110],
  F8: [5433, 103],
  F9: [7795, 109],
  F10: [6146, 105],
  F11: [7322, 97],
  F12: [7699, 98],
  Backquote: [9069, 115],
  Digit1: [2280, 109],
  Digit2: [9444, 102],
  Digit3: [9833, 103],
  Digit4: [10185, 107],
  Digit5: [10551, 108],
  Digit6: [10899, 107],
  Digit7: [11282, 99],
  Digit8: [11623, 103],
  Digit9: [11976, 110],
  Digit0: [12337, 108],
  Minus: [12667, 107],
  Equal: [13058, 105],
  Backspace: [13765, 101],
  Tab: [15916, 97],
  KeyQ: [16284, 83],
  KeyW: [16637, 97],
  KeyE: [16964, 105],
  KeyR: [17275, 102],
  KeyT: [17613, 108],
  KeyY: [17957, 95],
  KeyU: [18301, 105],
  KeyI: [18643, 110],
  KeyO: [18994, 98],
  KeyP: [19331, 108],
  BracketLeft: [19671, 94],
  BracketRight: [20020, 96],
  Backslash: [20387, 97],
  CapsLock: [22560, 100],
  KeyA: [22869, 109],
  KeyS: [23237, 98],
  KeyD: [23586, 103],
  KeyF: [23898, 98],
  KeyG: [24237, 102],
  KeyH: [24550, 106],
  KeyJ: [24917, 103],
  KeyK: [25274, 102],
  KeyL: [25625, 101],
  Semicolon: [25989, 100],
  Quote: [26335, 99],
  Enter: [26703, 100],
  ShiftLeft: [28109, 99],
  KeyZ: [28550, 92],
  KeyX: [28855, 101],
  KeyC: [29557, 112],
  KeyV: [29557, 112],
  KeyB: [29909, 98],
  KeyN: [30252, 112],
  KeyM: [30605, 101],
  Comma: [30965, 117],
  Period: [31315, 97],
  Slash: [31659, 96],
  ShiftRight: [28109, 99],
  ArrowUp: [32429, 96],
  ControlLeft: [8036, 92],
  AltLeft: [34551, 96],
  MetaLeft: [34551, 96],
  Space: [33857, 100],
  MetaRight: [34181, 97],
  ControlRight: [8036, 92],
  ArrowLeft: [36907, 90],
  ArrowDown: [37267, 94],
  ArrowRight: [37586, 88],
  AltRight: [35878, 90],
};

const SOUND_DEFINES_UP: Record<string, [number, number]> = {
  Escape: [9184, 94],
  F1: [2858, 85],
  F2: [3254, 81],
  F3: [3648, 84],
  F4: [4013, 83],
  F5: [4401, 78],
  F6: [4769, 84],
  F7: [5144, 90],
  F8: [5536, 84],
  F9: [7904, 89],
  F10: [6251, 86],
  F11: [7419, 80],
  F12: [7797, 80],
  Backquote: [9184, 94],
  Digit1: [2389, 90],
  Digit2: [9546, 83],
  Digit3: [9936, 84],
  Digit4: [10292, 87],
  Digit5: [10659, 88],
  Digit6: [11006, 87],
  Digit7: [11381, 81],
  Digit8: [11726, 85],
  Digit9: [12086, 90],
  Digit0: [12445, 89],
  Minus: [12774, 87],
  Equal: [13163, 86],
  Backspace: [13866, 83],
  Tab: [16013, 79],
  KeyQ: [16367, 67],
  KeyW: [16734, 79],
  KeyE: [17069, 85],
  KeyR: [17377, 83],
  KeyT: [17721, 88],
  KeyY: [18052, 78],
  KeyU: [18406, 85],
  KeyI: [18753, 90],
  KeyO: [19092, 80],
  KeyP: [19439, 89],
  BracketLeft: [19765, 77],
  BracketRight: [20116, 79],
  Backslash: [20484, 79],
  CapsLock: [22660, 81],
  KeyA: [22978, 89],
  KeyS: [23317, 80],
  KeyD: [23689, 84],
  KeyF: [23979, 81],
  KeyG: [24339, 83],
  KeyH: [24656, 86],
  KeyJ: [25020, 85],
  KeyK: [25376, 83],
  KeyL: [25726, 82],
  Semicolon: [26089, 82],
  Quote: [26434, 81],
  Enter: [26803, 81],
  ShiftLeft: [28208, 81],
  KeyZ: [28642, 75],
  KeyX: [28956, 83],
  KeyC: [29669, 92],
  KeyV: [29669, 92],
  KeyB: [30007, 81],
  KeyN: [30364, 91],
  KeyM: [30706, 83],
  Comma: [31082, 95],
  Period: [31412, 79],
  Slash: [31755, 79],
  ShiftRight: [28208, 81],
  ArrowUp: [32525, 78],
  ControlLeft: [8128, 76],
  AltLeft: [34647, 79],
  MetaLeft: [34647, 79],
  Space: [33957, 82],
  MetaRight: [34278, 80],
  ControlRight: [8128, 76],
  ArrowLeft: [36997, 73],
  ArrowDown: [37361, 76],
  ArrowRight: [37674, 72],
  AltRight: [35968, 74],
};

function getPitchForKey(code?: string): number {
  if (!code) return 1.0;
  if (KEY_PITCH_MAP[code]) return KEY_PITCH_MAP[code];

  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i);
  }
  const offset = 0.94 + (Math.abs(hash) % 15) * 0.01;
  return offset;
}

function playMacScissorSound(type: "down" | "up" = "down", code?: string) {
  try {
    const ctx = getMacAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const now = ctx.currentTime;
    const isDown = type === "down";
    const basePitch = getPitchForKey(code);
    const finalPitch = isDown ? basePitch : basePitch * 1.15;

    // Play user's authentic mackeysound.ogg with unique per-key pitch & slice offset
    if (macSoundBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = macSoundBuffer;

      source.playbackRate.setValueAtTime(finalPitch, now);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(isDown ? 1.0 : 0.5, now);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      const soundDef = code
        ? isDown
          ? SOUND_DEFINES_DOWN[code]
          : SOUND_DEFINES_UP[code]
        : null;

      if (soundDef) {
        const [startMs, durationMs] = soundDef;
        source.start(now, startMs / 1000, durationMs / 1000);
      } else {
        const sliceDuration = isDown ? 0.075 : 0.045;
        source.start(now, 0, sliceDuration);
      }
      return;
    }

    // High quality synth fallback if buffer isn't ready
    if (!cachedNoiseBuffer) return;

    const noise = ctx.createBufferSource();
    noise.buffer = cachedNoiseBuffer;
    noise.playbackRate.setValueAtTime(finalPitch, now);

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime((isDown ? 2600 : 3400) * basePitch, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(isDown ? 0.75 : 0.38, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime((isDown ? 240 : 300) * basePitch, now);
    osc.frequency.exponentialRampToValueAtTime((isDown ? 85 : 120) * basePitch, now + 0.02);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(isDown ? 0.65 : 0.32, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.022);
  } catch {
    // Ignore audio policy errors
  }
}

const KEY_DISPLAY_MAP: Record<string, string> = {
  Escape: "esc",
  Backspace: "delete",
  Tab: "tab",
  Enter: "return",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  ControlLeft: "control",
  AltLeft: "option",
  AltRight: "option",
  MetaLeft: "command",
  MetaRight: "command",
  Space: "space",
  CapsLock: "caps lock",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Backquote: "`",
  Minus: "-",
  Equal: "=",
  BracketLeft: "[",
  BracketRight: "]",
  Backslash: "\\",
  Semicolon: ";",
  Quote: "'",
  Comma: ",",
  Period: ".",
  Slash: "/",
};

export function CustomKeyboard({
  className,
  enableSound = true,
  showPreview = true,
  theme = "auto",
  ...props
}: CustomKeyboardProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [displayLabel, setDisplayLabel] = useState<string | null>(null);
  const soundEnabled = enableSound;
  const [capsLocked, setCapsLocked] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const triggerKey = useCallback(
    (code: string) => {
      setActiveKeys((prev) => new Set(prev).add(code));
      setLastPressedKey(code);

      if (code === "CapsLock") {
        setCapsLocked((prev) => !prev);
      }

      let label = KEY_DISPLAY_MAP[code];
      if (!label) {
        if (code.startsWith("Key")) label = code.replace("Key", "").toLowerCase();
        else if (code.startsWith("Digit")) label = code.replace("Digit", "");
        else if (code.startsWith("F") && code.length <= 3) label = code.toLowerCase();
      }

      if (label && label !== "space") {
        setDisplayLabel(label);
        setAnimKey((prev) => prev + 1);
      }

      if (soundEnabled) {
        playMacScissorSound("down", code);
      }
    },
    [soundEnabled]
  );

  const releaseKey = useCallback(
    (code: string) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
      if (soundEnabled) {
        playMacScissorSound("up", code);
      }
    },
    [soundEnabled]
  );

  // Unlock Web Audio Context on user gesture
  useEffect(() => {
    const unlockAudio = () => {
      getMacAudioContext();
    };
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // Global physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      triggerKey(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      releaseKey(e.code);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerKey, releaseKey]);

  const isDarkTheme = theme === "dark";

  return (
    <KeyboardContext.Provider
      value={{
        activeKeys,
        triggerKey,
        releaseKey,
        soundEnabled,
        lastPressedKey,
        displayLabel,
        capsLocked,
        theme,
      }}
    >
      <div className={cn("flex flex-col items-center select-none w-full max-w-5xl gap-4", className)} {...props}>
        {/* Floating Keystroke Text Badge */}
        {showPreview && (
          <div className="relative flex h-12 w-full items-center justify-center">
            <AnimatePresence mode="popLayout">
              {displayLabel && (
                <motion.div
                  key={animKey}
                  layout
                  initial={{ opacity: 0, scale: 0.6, y: 8 }}
                  animate={{
                    opacity: 1,
                    scale: activeKeys.size > 0 ? 0.95 : 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                  }}
                  className="absolute flex items-center justify-center font-mono text-3xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300"
                >
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(6px)" }}
                    animate={{ opacity: 0.85, filter: "blur(0px)" }}
                    transition={{ duration: 0.06 }}
                  >
                    {displayLabel}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Keyboard Chassis with Light (Silver) & Dark (Space Black) Theme Support */}
        <div className="mx-auto w-fit flex items-center justify-center">
          <div
            className={cn(
              "h-full w-fit rounded-[10px] p-1 shadow-xl",
              isDarkTheme
                ? "bg-[#161618] ring-1 ring-white/10 shadow-2xl"
                : "bg-neutral-200 ring-1 ring-black/5 dark:bg-[#161618] dark:ring-white/10"
            )}
          >
            {/* Function Row */}
            <Row>
              <Key
                keyCode="Escape"
                containerClassName="rounded-tl-lg"
                className="w-10 rounded-tl-md"
                childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
              >
                <span>esc</span>
              </Key>
              <Key keyCode="F1">
                <IconBrightnessDown className="h-[6px] w-[6px]" />
                <span className="mt-1">F1</span>
              </Key>
              <Key keyCode="F2">
                <IconBrightnessUp className="h-[6px] w-[6px]" />
                <span className="mt-1">F2</span>
              </Key>
              <Key keyCode="F3">
                <IconLayoutGrid className="h-[6px] w-[6px]" />
                <span className="mt-1">F3</span>
              </Key>
              <Key keyCode="F4">
                <IconSearch className="h-[6px] w-[6px]" />
                <span className="mt-1">F4</span>
              </Key>
              <Key keyCode="F5">
                <IconMicrophone className="h-[6px] w-[6px]" />
                <span className="mt-1">F5</span>
              </Key>
              <Key keyCode="F6">
                <IconMoon className="h-[6px] w-[6px]" />
                <span className="mt-1">F6</span>
              </Key>
              <Key keyCode="F7">
                <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
                <span className="mt-1">F7</span>
              </Key>
              <Key keyCode="F8">
                <IconPlayerPlay className="h-[6px] w-[6px]" />
                <span className="mt-1">F8</span>
              </Key>
              <Key keyCode="F9">
                <IconPlayerTrackNext className="h-[6px] w-[6px]" />
                <span className="mt-1">F9</span>
              </Key>
              <Key keyCode="F10">
                <IconVolume3 className="h-[6px] w-[6px]" />
                <span className="mt-1">F10</span>
              </Key>
              <Key keyCode="F11">
                <IconVolume2 className="h-[6px] w-[6px]" />
                <span className="mt-1">F11</span>
              </Key>
              <Key keyCode="F12">
                <IconVolume className="h-[6px] w-[6px]" />
                <span className="mt-1">F12</span>
              </Key>
              <Key containerClassName="rounded-tr-lg" className="rounded-tr-md" keyCode="Power">
                <IconLock className="h-[6px] w-[6px]" />
              </Key>
            </Row>

            {/* Number Row */}
            <Row>
              <Key keyCode="Backquote">
                <span>~</span>
                <span>`</span>
              </Key>
              <Key keyCode="Digit1">
                <span>!</span>
                <span>1</span>
              </Key>
              <Key keyCode="Digit2">
                <span>@</span>
                <span>2</span>
              </Key>
              <Key keyCode="Digit3">
                <span>#</span>
                <span>3</span>
              </Key>
              <Key keyCode="Digit4">
                <span>$</span>
                <span>4</span>
              </Key>
              <Key keyCode="Digit5">
                <span>%</span>
                <span>5</span>
              </Key>
              <Key keyCode="Digit6">
                <span>^</span>
                <span>6</span>
              </Key>
              <Key keyCode="Digit7">
                <span>&</span>
                <span>7</span>
              </Key>
              <Key keyCode="Digit8">
                <span>*</span>
                <span>8</span>
              </Key>
              <Key keyCode="Digit9">
                <span>(</span>
                <span>9</span>
              </Key>
              <Key keyCode="Digit0">
                <span>)</span>
                <span>0</span>
              </Key>
              <Key keyCode="Minus">
                <span>—</span>
                <span>_</span>
              </Key>
              <Key keyCode="Equal">
                <span>+</span>
                <span>=</span>
              </Key>
              <Key
                keyCode="Backspace"
                className="w-10"
                childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
              >
                <span>delete</span>
              </Key>
            </Row>

            {/* QWERTY Row */}
            <Row>
              <Key
                keyCode="Tab"
                className="w-10"
                childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
              >
                <span>tab</span>
              </Key>
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
                <Key key={letter} keyCode={`Key${letter}`}>
                  {letter}
                </Key>
              ))}
              <Key keyCode="BracketLeft">
                <span>{`{`}</span>
                <span>{`[`}</span>
              </Key>
              <Key keyCode="BracketRight">
                <span>{`} `}</span>
                <span>{`]`}</span>
              </Key>
              <Key keyCode="Backslash">
                <span>{`|`}</span>
                <span>{`\\`}</span>
              </Key>
            </Row>

            {/* Home Row */}
            <Row>
              <Key
                keyCode="CapsLock"
                className="w-[2.8rem]"
                childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
                hasLed
              >
                <span>caps lock</span>
              </Key>
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
                <Key key={letter} keyCode={`Key${letter}`}>
                  {letter}
                </Key>
              ))}
              <Key keyCode="Semicolon">
                <span>:</span>
                <span>;</span>
              </Key>
              <Key keyCode="Quote">
                <span>{`"`}</span>
                <span>{`'`}</span>
              </Key>
              <Key
                keyCode="Enter"
                className="w-[2.85rem]"
                childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
              >
                <span>return</span>
              </Key>
            </Row>

            {/* Bottom Letter Row */}
            <Row>
              <Key
                keyCode="ShiftLeft"
                className="w-[3.65rem]"
                childrenClassName="items-start justify-end pb-[2px] pl-[4px]"
              >
                <span>shift</span>
              </Key>
              {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
                <Key key={letter} keyCode={`Key${letter}`}>
                  {letter}
                </Key>
              ))}
              <Key keyCode="Comma">
                <span>{`<`}</span>
                <span>,</span>
              </Key>
              <Key keyCode="Period">
                <span>{`>`}</span>
                <span>.</span>
              </Key>
              <Key keyCode="Slash">
                <span>?</span>
                <span>/</span>
              </Key>
              <Key
                keyCode="ShiftRight"
                className="w-[3.65rem]"
                childrenClassName="items-end justify-end pr-[4px] pb-[2px]"
              >
                <span>shift</span>
              </Key>
            </Row>

            {/* Modifier Row */}
            <Row>
              <ModifierKey
                keyCode="Fn"
                containerClassName="rounded-bl-lg"
                className="rounded-bl-md"
              >
                <span>fn</span>
                <IconWorld className="h-[6px] w-[6px]" />
              </ModifierKey>
              <ModifierKey keyCode="ControlLeft">
                <IconChevronUp className="h-[6px] w-[6px]" />
                <span>control</span>
              </ModifierKey>
              <ModifierKey keyCode="AltLeft">
                <OptionKey className="h-[6px] w-[6px]" />
                <span>option</span>
              </ModifierKey>
              <ModifierKey keyCode="MetaLeft" className="w-8">
                <IconCommand className="h-[6px] w-[6px]" />
                <span>command</span>
              </ModifierKey>
              <Key keyCode="Space" className="w-[8.2rem]" />
              <ModifierKey keyCode="MetaRight" className="w-8">
                <IconCommand className="h-[6px] w-[6px]" />
                <span>command</span>
              </ModifierKey>
              <ModifierKey keyCode="AltRight">
                <OptionKey className="h-[6px] w-[6px]" />
                <span>option</span>
              </ModifierKey>
              {/* Arrow Keys */}
              <div className="flex h-6 w-fit items-center justify-end rounded-[4px] gap-[2px]">
                <Key keyCode="ArrowLeft" containerClassName="!p-0" className="h-6 w-6">
                  <IconCaretLeftFilled className="h-[6px] w-[6px]" />
                </Key>
                <div className="flex flex-col h-6 justify-between gap-[2px] py-[0.5px]">
                  <Key keyCode="ArrowUp" containerClassName="!p-0" className="h-[10px] w-6 !rounded-[2.5px]">
                    <IconCaretUpFilled className="h-[6px] w-[6px]" />
                  </Key>
                  <Key keyCode="ArrowDown" containerClassName="!p-0" className="h-[10px] w-6 !rounded-[2.5px]">
                    <IconCaretDownFilled className="h-[6px] w-[6px]" />
                  </Key>
                </div>
                <Key
                  keyCode="ArrowRight"
                  containerClassName="rounded-br-lg !p-0"
                  className="h-6 w-6 rounded-br-md"
                >
                  <IconCaretRightFilled className="h-[6px] w-[6px]" />
                </Key>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </KeyboardContext.Provider>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
);

const Key = ({
  className,
  childrenClassName,
  containerClassName,
  children,
  keyCode,
  hasLed,
}: {
  className?: string;
  childrenClassName?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
  hasLed?: boolean;
}) => {
  const { triggerKey, releaseKey, activeKeys, capsLocked, theme } = useKeyboard();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;
  const isCapsActive = keyCode === "CapsLock" && capsLocked;
  const isDarkTheme = theme === "dark";

  const handleMouseDown = () => {
    if (keyCode) triggerKey(keyCode);
  };

  const handleMouseUp = () => {
    if (keyCode && isPressed) releaseKey(keyCode);
  };

  const handleMouseLeave = () => {
    if (keyCode && isPressed) releaseKey(keyCode);
  };

  return (
    <div className={cn("relative rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        type="button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] transition-transform duration-75 active:scale-[0.98]",
          // Light vs Dark Theme keycap styles
          isDarkTheme
            ? "bg-[#28282c] text-white shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.08)_inset]"
            : "bg-gray-100 text-neutral-700 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25),0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_0px_0px_rgba(255,255,255,1)_inset] dark:bg-[#28282c] dark:text-white dark:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.08)_inset]",
          // Active press animation
          isPressed &&
            (isDarkTheme
              ? "scale-[0.98] bg-[#1e1e20] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.04)_inset]"
              : "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25),0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_0px_0px_rgba(255,255,255,0.5)] dark:bg-[#1e1e20]"),
          className
        )}
      >
        {hasLed && (
          <div
            className={cn(
              "absolute left-[2px] top-[2px] h-[2.5px] w-[2.5px] rounded-full z-10 pointer-events-none transition-colors",
              isCapsActive ? "bg-emerald-400 shadow-[0_0_3px_#10b981]" : (isDarkTheme ? "bg-white/20" : "bg-neutral-900/20 dark:bg-white/20")
            )}
          />
        )}
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center text-[5px] font-sans",
            isDarkTheme ? "text-white" : "text-neutral-700 dark:text-white",
            childrenClassName
          )}
        >
          {children}
        </div>
      </button>
    </div>
  );
};

const ModifierKey = ({
  className,
  containerClassName,
  children,
  keyCode,
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  keyCode?: string;
}) => {
  const { triggerKey, releaseKey, activeKeys, theme } = useKeyboard();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;
  const isDarkTheme = theme === "dark";

  const handleMouseDown = () => {
    if (keyCode) triggerKey(keyCode);
  };

  const handleMouseUp = () => {
    if (keyCode && isPressed) releaseKey(keyCode);
  };

  const handleMouseLeave = () => {
    if (keyCode && isPressed) releaseKey(keyCode);
  };

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        type="button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] transition-transform duration-75 active:scale-[0.98]",
          // Light vs Dark Theme keycap styles
          isDarkTheme
            ? "bg-[#28282c] text-white shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.08)_inset]"
            : "bg-gray-100 text-neutral-700 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25),0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_0px_0px_rgba(255,255,255,1)_inset] dark:bg-[#28282c] dark:text-white dark:shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.08)_inset]",
          // Active press animation
          isPressed &&
            (isDarkTheme
              ? "scale-[0.98] bg-[#1e1e20] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.8),0px_1px_1px_0px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(255,255,255,0.04)_inset]"
              : "scale-[0.98] bg-gray-100/80 shadow-[0px_0px_1px_0px_rgba(0,0,0,0.25),0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_0px_0px_rgba(255,255,255,0.5)] dark:bg-[#1e1e20]"),
          className
        )}
      >
        <div className={cn(
          "flex h-full w-full flex-col items-start justify-between p-1 text-[5px] font-sans",
          isDarkTheme ? "text-white" : "text-neutral-700 dark:text-white"
        )}>
          {children}
        </div>
      </button>
    </div>
  );
};

const OptionKey = ({ className }: { className?: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
      />
    </svg>
  );
};

export default CustomKeyboard;
