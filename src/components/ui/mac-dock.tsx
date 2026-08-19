"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Pin,
  Home,
  SquareTerminal,
  ScanLine,
  Workflow,
  Twitter,
  Github,
  X as CloseIcon,
} from "lucide-react";

export interface DockAppItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function MacDock() {
  const [hoveredId, setHoveredId] = useState<string | null>("terminal");

  const dockItems: DockAppItem[] = [
    {
      id: "pin",
      label: "Pin",
      icon: <Pin className="w-4.5 h-4.5" />,
    },
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4.5 h-4.5" />,
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <SquareTerminal className="w-4.5 h-4.5" />,
    },
    {
      id: "scan",
      label: "Components",
      icon: <ScanLine className="w-4.5 h-4.5" />,
    },
    {
      id: "workflow",
      label: "Workflows",
      icon: <Workflow className="w-4.5 h-4.5" />,
    },
    {
      id: "x",
      label: "X App",
      icon: <Twitter className="w-4.5 h-4.5" />,
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="w-4.5 h-4.5" />,
    },
  ];

  return (
    <div
      className="relative flex items-center justify-center select-none"
      onMouseLeave={() => setHoveredId(null)}
    >
      {/* Off-white / Dark Dock Bar Container */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 bg-white/80 dark:bg-[#121214] backdrop-blur-2xl rounded-full border border-black/10 dark:border-zinc-800 shadow-[0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform-gpu">
        {dockItems.map((item) => {
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredId(item.id)}
            >
              {/* Fast Motion Preview Window Popup */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{
                      duration: 0.15,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-[calc(100%+24px)] z-50 origin-bottom flex flex-col items-center pointer-events-auto transform-gpu"
                  >
                    {/* Outer window frame */}
                    <div className="w-[280px] sm:w-[320px] bg-white dark:bg-zinc-800 border border-black/10 dark:border-zinc-700/80 p-2 pt-1.5 pb-2 rounded-xl shadow-2xl backdrop-blur-md">
                      {/* Window Header */}
                      <div className="flex items-center justify-between px-2 py-0.5 mb-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs tracking-tight truncate max-w-[240px]">
                          {item.label}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoveredId(null);
                          }}
                          className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors text-xs font-semibold"
                        >
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Balanced height preview screen */}
                      <div className="w-full h-[150px] sm:h-[170px] bg-[#141416] border border-white/10 rounded-lg flex items-center justify-center shadow-inner">
                        <span className="text-white font-semibold text-sm tracking-wide">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Clean Scale-in-Place Button */}
              <motion.button
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="w-10 h-10 rounded-full bg-neutral-200/50 border border-black/5 hover:bg-neutral-300/80 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-sm transform-gpu focus:outline-none transition-colors"
              >
                {item.icon}
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MacDock;
