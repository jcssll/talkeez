import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode } from "react";

// Subtle 3D tilt that follows the pointer. Disabled for reduced-motion users.
export function Tilt({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - rect.left) / rect.width - 0.5) * max);
        rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * max);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
