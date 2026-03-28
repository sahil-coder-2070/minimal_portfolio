---
title: "Animating Components in React with Framer Motion"
description: "Learn how to bring your React components to life using Framer Motion."
image: "/blogimage/motion.jpg"
tags: ["React", "Framer Motion"]
date: "2026-01-20"
isPublished: true
---

---

# Animating Components in React with Framer Motion

Framer Motion is a powerful animation library for React that makes creating smooth, interactive animations a breeze. Whether you're building a simple hover effect or complex page transitions, Framer Motion provides an intuitive API that integrates seamlessly with React's component model. In this comprehensive guide, we'll explore everything from basic animations to advanced techniques, complete with practical examples and best practices.

## Why Choose Framer Motion?

Before diving into the code, let's understand what makes Framer Motion stand out:

- **Declarative API**: Animations are defined using props, making them easy to reason about and maintain.
- **Performance Optimized**: Uses hardware acceleration and efficient rendering techniques.
- **Gesture Support**: Built-in support for drag, hover, tap, and other interactions.
- **Layout Animations**: Automatically animates layout changes when components are added, removed, or reordered.
- **Server-Side Rendering Compatible**: Works great with Next.js and other SSR frameworks.

## Getting Started: Installation and Setup

### Installing Framer Motion

First, let's install Framer Motion in your React project. You can use npm, yarn, or any other package manager:

```bash
npm install motion
```

Or with yarn:

```bash
yarn add motion
```

### Basic Import

Once installed, import the `motion` component from motion:

```jsx
import { motion } from "motion/react";
```

The `motion` component is the core of Framer Motion. It's a wrapper that adds animation capabilities to any HTML or SVG element.

## Basic Animations: The Fundamentals

### Simple Fade In Animation

Let's start with a basic fade-in animation. We'll animate a div from opacity 0 to 1:

```jsx
import { motion } from "motion/react";

function FadeInComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Hello, Framer Motion!
    </motion.div>
  );
}
```

Here's what each prop does:

- `initial`: Defines the starting state of the animation
- `animate`: Defines the ending state of the animation
- `transition`: Controls the timing and easing of the animation

### Animating Multiple Properties

You can animate multiple CSS properties simultaneously:

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  Multi-property animation
</motion.div>
```

### Using Variants for Reusable Animations

Variants allow you to define animation states once and reuse them across components:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

function AnimatedContainer() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      Content here
    </motion.div>
  );
}
```

## Advanced Animation Techniques

### Staggered Animations

Staggered animations create a cascading effect where child elements animate in sequence:

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function StaggeredList() {
  return (
    <motion.ul variants={containerVariants} initial="hidden" animate="visible">
      {[1, 2, 3, 4, 5].map((item) => (
        <motion.li key={item} variants={itemVariants}>
          Item {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Keyframe Animations

For more complex animations, use keyframes to define intermediate steps:

```jsx
<motion.div
  animate={{
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 180, 180, 0],
    borderRadius: ["0%", "0%", "50%", "50%", "0%"],
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.2, 0.5, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 1,
  }}
>
  Keyframe animation
</motion.div>
```

### Layout Animations

Framer Motion can automatically animate layout changes:

```jsx
function LayoutAnimation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        width: isExpanded ? 300 : 100,
        height: isExpanded ? 200 : 100,
        backgroundColor: "lightblue",
      }}
    >
      Click to {isExpanded ? "shrink" : "expand"}
    </motion.div>
  );
}
```

## Gesture-Based Animations

### Hover Animations

Add interactive hover effects:

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Hover me!
</motion.button>
```

### Drag Interactions

Enable drag functionality with physics-based animations:

```jsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  whileDrag={{ scale: 1.2 }}
  style={{
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: "50%",
  }}
/>
```

### Pan Gestures

Detect pan gestures for custom interactions:

```jsx
function PanComponent() {
  const [x, setX] = useState(0);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      style={{ x }}
      onPan={(event, info) => {
        setX(info.point.x);
      }}
    >
      Pan me horizontally
    </motion.div>
  );
}
```

## Page Transitions and Route Animations

### Basic Page Transition

Create smooth transitions between pages:

```jsx
// In your router component
const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
```

### Using AnimatePresence for Exit Animations

`AnimatePresence` enables exit animations when components unmount:

```jsx
import { AnimatePresence } from "motion/react";

function AnimatedList({ items }) {
  return (
    <AnimatePresence>
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {item.content}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
```

## Advanced Techniques

### Using Motion Values

Motion values provide reactive animation state:

```jsx
import { useMotionValue, useTransform } from "motion/react";

function MotionValueExample() {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "#00ffc8"],
  );

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      style={{ x, background }}
    >
      Drag me to change color
    </motion.div>
  );
}
```

### Scroll-Based Animations

Create animations that respond to scroll position:

```jsx
import { useScroll, useTransform } from "motion/react";

function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <motion.div style={{ scale }}>
      <h1>Scroll to scale me!</h1>
    </motion.div>
  );
}
```

### Custom Easing Functions

Define your own easing curves for unique animation feels:

```jsx
const customEase = [0.68, -0.55, 0.265, 1.55];

<motion.div
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1, ease: customEase }}
>
  Custom easing
</motion.div>;
```

## Performance Optimization

### Using `useMemo` for Variants

Memoize variants to prevent unnecessary re-renders:

```jsx
const containerVariants = useMemo(
  () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }),
  [],
);
```

### Reducing Motion for Accessibility

Respect users' motion preferences:

```jsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

<motion.div animate={prefersReducedMotion ? {} : { x: 100 }}>
  Content
</motion.div>;
```

## Real-World Examples

### Animated Modal

```jsx
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Animated Card Grid

```jsx
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedCardGrid({ cards }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Loading Spinner

```jsx
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{
        width: 50,
        height: 50,
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
      }}
    />
  );
}
```

## Best Practices and Tips

### 1. Keep Animations Subtle

Avoid over-animating. Subtle animations enhance UX without being distracting.

### 2. Use Consistent Timing

Establish a timing system for your animations to create a cohesive feel.

### 3. Test on Different Devices

Ensure animations perform well on mobile devices and lower-end hardware.

### 4. Consider Accessibility

Always check that animations don't cause motion sickness or interfere with screen readers.

### 5. Use Layout Animations Wisely

Layout animations are powerful but can be expensive. Use them judiciously.

### 6. Leverage Variants for Maintainability

Variants make your code more readable and maintainable, especially in larger projects.

## Common Pitfalls to Avoid

### 1. Animating Layout Properties Incorrectly

Don't animate properties like `display` or `position` directly. Use opacity and transforms instead.

### 2. Forgetting to Handle Exit Animations

Always use `AnimatePresence` when components can unmount to enable exit animations.

### 3. Overusing Complex Keyframes

Simple transitions are often more effective than complex multi-step animations.

### 4. Ignoring Performance

Avoid animating too many elements simultaneously, especially on mobile devices.

## Conclusion

Framer Motion is an incredibly powerful tool for creating engaging, interactive React applications. From simple fade-ins to complex gesture-based interactions, it provides the tools you need to bring your UI to life. Remember to start simple, focus on performance, and always consider your users' accessibility needs.

The key to mastering Framer Motion is practice and experimentation. Start with the basic concepts we've covered here, then explore the official documentation for more advanced features. Happy animating!

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Framer Motion Examples](https://www.framer.com/motion/examples/)
- [React Animation Libraries Comparison](https://www.framer.com/blog/posts/react-animation-libraries/)

---

This guide covers the fundamentals and advanced techniques of using Framer Motion in React applications. Whether you're building a portfolio site, an e-commerce platform, or a complex web application, Framer Motion can help you create smooth, engaging user experiences that delight your users.
