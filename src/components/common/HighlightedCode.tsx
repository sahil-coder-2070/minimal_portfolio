'use client';

import React from 'react';

interface HighlightedCodeProps {
  code: string;
  isDark?: boolean;
  className?: string;
}

export function tokenizeLine(line: string, isDark: boolean = true) {
  const tokens = line.split(
    /(".*?"|'.*?'|`.*?`|\b(?:use client|import|export|function|return|const|let|var|type|interface|default|from|extends|null|undefined|true|false|as|typeof)\b|\b(?:React|HTMLAttributes|HTMLDivElement|Set|KeyboardEvent|AudioContext|AudioBuffer|CustomKeyboardProps|CustomKeyboard|Keyboard|Spotify|SpotifyIcon|Motion|AnimatePresence|useState|useRef|useEffect|useSpotify|ClassValue|CdDisc|SoundBars|CARD|DISC_SIZE|DISC_COLLAPSED|DISC_SCALE_COLLAPSED|SPRING|FADE)\b)/g
  );

  return tokens.map((token, index) => {
    if (!token) return null;
    
    // Strings (emerald green)
    if (/^(".*?"|'.*?'|`.*?`)$/.test(token)) {
      return (
        <span key={index} className={isDark ? "text-emerald-300 font-normal" : "text-emerald-600 font-normal"}>
          {token}
        </span>
      );
    }
    
    // Keywords (purple)
    if (
      /^\b(use client|import|export|function|return|const|let|var|type|interface|default|from|extends|null|undefined|true|false|as|typeof)\b$/.test(
        token
      )
    ) {
      return (
        <span key={index} className={isDark ? "text-purple-400 font-medium" : "text-purple-600 font-medium"}>
          {token}
        </span>
      );
    }

    // Hooks / React / Components / Types (sky blue / cyan)
    if (
      /^\b(React|HTMLAttributes|HTMLDivElement|Set|KeyboardEvent|AudioContext|AudioBuffer|CustomKeyboardProps|CustomKeyboard|Keyboard|Spotify|SpotifyIcon|Motion|AnimatePresence|useState|useRef|useEffect|useSpotify|ClassValue|CdDisc|SoundBars|CARD|DISC_SIZE|DISC_COLLAPSED|DISC_SCALE_COLLAPSED|SPRING|FADE)\b$/.test(
        token
      )
    ) {
      return (
        <span key={index} className={isDark ? "text-sky-300 font-medium" : "text-sky-600 font-medium"}>
          {token}
        </span>
      );
    }

    return <span key={index}>{token}</span>;
  });
}

export default function HighlightedCode({
  code,
  isDark = true,
  className = '',
}: HighlightedCodeProps) {
  const lines = code.split('\n');

  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isComment = trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
        if (isComment) {
          return (
            <div key={i} className="text-neutral-500 italic">
              {line}
            </div>
          );
        }
        return (
          <div key={i} className="whitespace-pre">
            {tokenizeLine(line, isDark)}
          </div>
        );
      })}
    </div>
  );
}
