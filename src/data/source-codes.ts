export const customKeyboardSourceCode = `"use client";

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

// Authentic Apple Magic Keyboard Scissor-Switch Sound Player
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
};

function getPitchForKey(code?: string): number {
  if (!code) return 1.0;
  if (KEY_PITCH_MAP[code]) return KEY_PITCH_MAP[code];
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash << 5) - hash + code.charCodeAt(i);
  }
  return 0.94 + (Math.abs(hash) % 15) * 0.01;
}

function playMacScissorSound(type: "down" | "up" = "down", code?: string) {
  try {
    const ctx = getMacAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    const isDown = type === "down";
    const basePitch = getPitchForKey(code);
    const finalPitch = isDown ? basePitch : basePitch * 1.15;

    if (macSoundBuffer) {
      const source = ctx.createBufferSource();
      source.buffer = macSoundBuffer;
      source.playbackRate.setValueAtTime(finalPitch, now);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(isDown ? 1.0 : 0.5, now);
      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(now, 0, isDown ? 0.075 : 0.045);
      return;
    }
  } catch {
    // Ignore audio errors
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
};

export function CustomKeyboard({
  className,
  enableSound = true,
  showPreview = true,
  theme = "auto",
  ...props
}: CustomKeyboardProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [displayLabel, setDisplayLabel] = useState<string | null>(null);
  const [capsLocked, setCapsLocked] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const triggerKey = useCallback(
    (code: string) => {
      setActiveKeys((prev) => new Set(prev).add(code));
      if (code === "CapsLock") setCapsLocked((prev) => !prev);

      let label = KEY_DISPLAY_MAP[code];
      if (!label) {
        if (code.startsWith("Key")) label = code.replace("Key", "").toLowerCase();
        else if (code.startsWith("Digit")) label = code.replace("Digit", "");
      }

      if (label && label !== "space") {
        setDisplayLabel(label);
        setAnimKey((prev) => prev + 1);
      }

      if (enableSound) playMacScissorSound("down", code);
    },
    [enableSound]
  );

  const releaseKey = useCallback(
    (code: string) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
      if (enableSound) playMacScissorSound("up", code);
    },
    [enableSound]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      triggerKey(e.code);
    };
    const handleKeyUp = (e: KeyboardEvent) => releaseKey(e.code);
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
        soundEnabled: enableSound,
        lastPressedKey: null,
        displayLabel,
        capsLocked,
        theme,
      }}
    >
      <div className={cn("flex flex-col items-center select-none w-full max-w-5xl gap-4", className)} {...props}>
        {showPreview && (
          <div className="relative flex h-12 w-full items-center justify-center">
            <AnimatePresence mode="popLayout">
              {displayLabel && (
                <motion.div
                  key={animKey}
                  initial={{ opacity: 0, scale: 0.6, y: 8 }}
                  animate={{ opacity: 1, scale: activeKeys.size > 0 ? 0.95 : 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -8 }}
                  className="font-mono text-3xl font-medium text-neutral-600 dark:text-neutral-300"
                >
                  {displayLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="mx-auto w-fit flex items-center justify-center">
          <div className={cn("h-full w-fit rounded-[10px] p-1 shadow-xl", isDarkTheme ? "bg-[#161618] ring-1 ring-white/10" : "bg-neutral-200 ring-1 ring-black/5")}>
            <Row>
              <Key keyCode="Escape" className="w-10">esc</Key>
              <Key keyCode="F1"><IconBrightnessDown className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F2"><IconBrightnessUp className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F3"><IconLayoutGrid className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F4"><IconSearch className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F5"><IconMicrophone className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F6"><IconMoon className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F7"><IconPlayerTrackPrev className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F8"><IconPlayerPlay className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F9"><IconPlayerTrackNext className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F10"><IconVolume3 className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F11"><IconVolume2 className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="F12"><IconVolume className="h-[6px] w-[6px]" /></Key>
              <Key keyCode="Power"><IconLock className="h-[6px] w-[6px]" /></Key>
            </Row>
            <Row>
              <Key keyCode="Backquote">\`</Key>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num, i) => (
                <Key key={num} keyCode={\`Digit\${num}\`}>{num}</Key>
              ))}
              <Key keyCode="Minus">-</Key>
              <Key keyCode="Equal">=</Key>
              <Key keyCode="Backspace" className="w-10">delete</Key>
            </Row>
            <Row>
              <Key keyCode="Tab" className="w-10">tab</Key>
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
                <Key key={letter} keyCode={\`Key\${letter}\`}>{letter}</Key>
              ))}
              <Key keyCode="BracketLeft">[</Key>
              <Key keyCode="BracketRight">]</Key>
              <Key keyCode="Backslash">\\\\</Key>
            </Row>
            <Row>
              <Key keyCode="CapsLock" className="w-[2.8rem]" hasLed>caps lock</Key>
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
                <Key key={letter} keyCode={\`Key\${letter}\`}>{letter}</Key>
              ))}
              <Key keyCode="Semicolon">;</Key>
              <Key keyCode="Quote">'</Key>
              <Key keyCode="Enter" className="w-[2.85rem]">return</Key>
            </Row>
            <Row>
              <Key keyCode="ShiftLeft" className="w-[3.65rem]">shift</Key>
              {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
                <Key key={letter} keyCode={\`Key\${letter}\`}>{letter}</Key>
              ))}
              <Key keyCode="Comma">,</Key>
              <Key keyCode="Period">.</Key>
              <Key keyCode="Slash">/</Key>
              <Key keyCode="ShiftRight" className="w-[3.65rem]">shift</Key>
            </Row>
            <Row>
              <Key keyCode="Fn">fn</Key>
              <Key keyCode="ControlLeft">control</Key>
              <Key keyCode="AltLeft">option</Key>
              <Key keyCode="MetaLeft" className="w-8">command</Key>
              <Key keyCode="Space" className="w-[8.2rem]" />
              <Key keyCode="MetaRight" className="w-8">command</Key>
              <Key keyCode="AltRight">option</Key>
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

const Key = ({ className, children, keyCode, hasLed }: { className?: string; children?: React.ReactNode; keyCode?: string; hasLed?: boolean }) => {
  const { triggerKey, releaseKey, activeKeys, capsLocked, theme } = useKeyboard();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;
  const isCapsActive = keyCode === "CapsLock" && capsLocked;
  const isDarkTheme = theme === "dark";

  return (
    <div className="relative rounded-[4px] p-[0.5px]">
      <button
        type="button"
        onMouseDown={() => keyCode && triggerKey(keyCode)}
        onMouseUp={() => keyCode && isPressed && releaseKey(keyCode)}
        className={cn(
          "relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] text-[5px] font-sans transition-transform duration-75 active:scale-[0.98]",
          isDarkTheme ? "bg-[#28282c] text-white" : "bg-gray-100 text-neutral-700",
          isPressed && "scale-[0.98] opacity-80",
          className
        )}
      >
        {hasLed && (
          <div className={cn("absolute left-[2px] top-[2px] h-[2.5px] w-[2.5px] rounded-full z-10", isCapsActive ? "bg-emerald-400 shadow-[0_0_3px_#10b981]" : "bg-white/20")} />
        )}
        {children}
      </button>
    </div>
  );
};

export default CustomKeyboard;
`;

export const keychronKeyboardSourceCode = `"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

export type KeyboardThemeName = "classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet";

export interface KeyboardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: KeyboardThemeName;
  enableSound?: boolean;
  enableHaptics?: boolean;
  showPreview?: boolean;
}

interface KeyboardContextType {
  activeKeys: Set<string>;
  triggerKey: (code: string) => void;
  releaseKey: (code: string) => void;
  theme: KeyboardThemeName;
}

const KeyboardContext = createContext<KeyboardContextType | null>(null);

const useKeyboard = () => {
  const ctx = useContext(KeyboardContext);
  if (!ctx) throw new Error("useKeyboard must be used within Keyboard");
  return ctx;
};

export function Keyboard({
  theme = "classic",
  enableSound = true,
  enableHaptics = true,
  showPreview = true,
  className,
  ...props
}: KeyboardProps) {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const triggerKey = useCallback((code: string) => {
    setActiveKeys((prev) => new Set(prev).add(code));
  }, []);

  const releaseKey = useCallback((code: string) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      triggerKey(e.code);
    };
    const handleKeyUp = (e: KeyboardEvent) => releaseKey(e.code);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerKey, releaseKey]);

  return (
    <KeyboardContext.Provider value={{ activeKeys, triggerKey, releaseKey, theme }}>
      <div className={cn("flex flex-col items-center select-none w-full max-w-5xl gap-4", className)} {...props}>
        <div className="mx-auto w-fit p-2 bg-[#1c1c1f] rounded-[16px] border border-neutral-800 shadow-2xl">
          <div className="flex flex-col gap-1">
            {/* Function Row */}
            <div className="flex gap-1">
              <Key keyCode="Escape" themeColor="accent">esc</Key>
              {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].map((f) => (
                <Key key={f} keyCode={f}>{f}</Key>
              ))}
              <Key keyCode="Delete">del</Key>
            </div>
            {/* Number Row */}
            <div className="flex gap-1">
              <Key keyCode="Backquote">\`</Key>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((n) => (
                <Key key={n} keyCode={\`Digit\${n}\`}>{n}</Key>
              ))}
              <Key keyCode="Minus">-</Key>
              <Key keyCode="Equal">=</Key>
              <Key keyCode="Backspace" className="w-12" themeColor="accent">←</Key>
            </div>
            {/* QWERTY Row */}
            <div className="flex gap-1">
              <Key keyCode="Tab" className="w-12">tab</Key>
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((l) => (
                <Key key={l} keyCode={\`Key\${l}\`}>{l}</Key>
              ))}
              <Key keyCode="BracketLeft">[</Key>
              <Key keyCode="BracketRight">]</Key>
              <Key keyCode="Backslash" className="w-10">\\\\</Key>
            </div>
            {/* Home Row */}
            <div className="flex gap-1">
              <Key keyCode="CapsLock" className="w-14">caps lock</Key>
              {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((l) => (
                <Key key={l} keyCode={\`Key\${l}\`}>{l}</Key>
              ))}
              <Key keyCode="Semicolon">;</Key>
              <Key keyCode="Quote">'</Key>
              <Key keyCode="Enter" className="w-14" themeColor="accent">return</Key>
            </div>
            {/* Bottom Row */}
            <div className="flex gap-1">
              <Key keyCode="ShiftLeft" className="w-16">shift</Key>
              {["Z", "X", "C", "V", "B", "N", "M"].map((l) => (
                <Key key={l} keyCode={\`Key\${l}\`}>{l}</Key>
              ))}
              <Key keyCode="Comma">,</Key>
              <Key keyCode="Period">.</Key>
              <Key keyCode="Slash">/</Key>
              <Key keyCode="ShiftRight" className="w-16">shift</Key>
            </div>
            {/* Modifier Row */}
            <div className="flex gap-1">
              <Key keyCode="ControlLeft" className="w-10">ctrl</Key>
              <Key keyCode="AltLeft" className="w-10">opt</Key>
              <Key keyCode="MetaLeft" className="w-10">cmd</Key>
              <Key keyCode="Space" className="w-64" />
              <Key keyCode="MetaRight" className="w-10">cmd</Key>
              <Key keyCode="Fn" className="w-10">fn</Key>
              <Key keyCode="ControlRight" className="w-10">ctrl</Key>
            </div>
          </div>
        </div>
      </div>
    </KeyboardContext.Provider>
  );
}

const Key = ({ className, children, keyCode, themeColor = "default" }: { className?: string; children?: React.ReactNode; keyCode?: string; themeColor?: "default" | "accent" }) => {
  const { triggerKey, releaseKey, activeKeys } = useKeyboard();
  const isPressed = keyCode ? activeKeys.has(keyCode) : false;

  return (
    <button
      type="button"
      onMouseDown={() => keyCode && triggerKey(keyCode)}
      onMouseUp={() => keyCode && isPressed && releaseKey(keyCode)}
      className={cn(
        "h-8 min-w-8 flex items-center justify-center rounded-md text-xs font-semibold shadow-md transition-all active:scale-95",
        themeColor === "accent" ? "bg-orange-500 text-white" : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
        isPressed && "scale-95 bg-neutral-900",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Keyboard;
`;
