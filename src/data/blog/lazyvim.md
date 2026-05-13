---
title: "Getting Started with Neovim and LazyVim: A Beginner's Guide"
description: "Master Neovim and LazyVim with this comprehensive cheat sheet covering modes, navigation, shortcuts, and essential commands."
image: "/blogimage/lazyvim.webp"
tags: ["Neovim", "LazyVim", "IDE", "Developer Tools"]
date: "2026-05-13"
isPublished: true
---

---

# Getting Started with Neovim and LazyVim

Neovim is a modern, hyperextensible Vim-based text editor. LazyVim is a starter config for Neovim that provides a pre-configured, optimized setup. Let's dive into the essential shortcuts!

---

## Basic Modes

```
┌─────────────┬──────────────────┬─────────────────────┐
│ Mode        │ How to Enter     │ Purpose             │
├─────────────┼──────────────────┼─────────────────────┤
│ Normal      │ Esc              │ Navigation & Commands│
│ Insert      │ i                │ Typing              │
│ Visual      │ v                │ Select Text         │
│ Visual Line │ V                │ Select Whole Lines  │
│ Command     │ :                │ Run Commands        │
└─────────────┴──────────────────┴─────────────────────┘
```

---

## Insert Mode

```vim
i    " Cursor se pehle type
a    " Cursor ke baad type
o    " Nayi line neeche
O    " Nayi line upar
Esc  " Normal mode me wapas
```

---

## Navigation

```vim
h     " Left
j     " Down
k     " Up
l     " Right
w     " Next word
b     " Previous word
0     " Line start
$     " Line end
gg    " File start
G     " File end
```

---

## Save & Quit

```vim
:w    " Save
:q    " Quit
:wq   " Save + Quit
:q!   " Force quit
ZZ    " Save & Quit
```

---

## Copy Paste Delete

```vim
yy          " Copy line
p           " Paste
dd          " Delete line
x           " Delete character
u           " Undo
Ctrl + r    " Redo
```

---

## Search

```vim
/text   " Search
n       " Next result
N       " Previous result
```

---

## LazyVim Important Shortcuts

### File Explorer

```vim
Space + e    " File explorer toggle
```

### Find Files (Telescope)

```vim
Space + ff   " Find files
Space + fg   " Live grep search
Space + fr   " Recent files
```

### Buffers / Tabs

```vim
Shift + h    " Previous buffer
Shift + l    " Next buffer
Space + bd   " Close buffer
```

### Terminal

```vim
Space + ft   " Open terminal
```

---

## Window Management

```vim
Ctrl + h     " Left window
Ctrl + l     " Right window
Ctrl + j     " Bottom window
Ctrl + k     " Top window
```

---

## Plugins (LazyVim)

### Mason

```vim
:Mason       " LSP/Formatter installer
```

### Lazy

```vim
:Lazy        " Plugin manager
```

---

## Useful Commands

```vim
:checkhealth    " Problems check
:terminal       " Terminal open
:help           " Help
```

---

## Code Navigation

```vim
gd             " Go to definition
gr             " References
K              " Hover docs
Space + ca     " Code actions
Space + rn     " Rename symbol
```

---

## Most Important Beginner Flow

```bash
# Open file
nvim filename

# Typing
i           " Type karo
Esc         " Normal mode me wapas

# Save
:w

# Quit
:q
```

---

## Must Remember

```
Space       " Leader key
Esc         " Normal mode
i           " Insert mode
:w          " Save
:q          " Quit
```

---

## Recommended Learning Order

1. Navigation
2. Insert mode
3. Save/Quit
4. Copy/Paste/Delete
5. Telescope (Space + ff)
6. File explorer
7. Buffers
8. LSP & Plugins

---

## Bonus Tips

- Panic ho toh `Esc` dabao 😄
- Normal mode me hi zyada kaam hota hai
- Mouse use mat karo initially
- Har cheez keyboard se karne ki habit banao

---

## Practice Daily

Try:
- Open file
- Edit text
- Save
- Search
- Open explorer
- Find file

Daily 20 mins = 1 week me comfortable 😎