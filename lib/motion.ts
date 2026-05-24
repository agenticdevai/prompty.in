import type { Variants, Easing } from "motion/react";

export const spring = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 24 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 18 },
};

export const duration = {
  fast: 0.12,
  normal: 0.22,
  slow: 0.38,
};

export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: "easeOut" as Easing } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" as Easing } },
};

export const staggerChildren = {
  animate: { transition: { staggerChildren: 0.04 } },
};

export const cardItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: "easeOut" as Easing } },
};