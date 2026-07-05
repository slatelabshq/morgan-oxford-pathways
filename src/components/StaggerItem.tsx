import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StaggerItemProps = {
  className?: string;
  children: ReactNode;
};

/**
 * StaggerItem — a single card slot inside <StaggerGrid/>. Fades up 16px
 * over 500ms when its parent's stagger sequence reaches it.
 */
export function StaggerItem({ className, children }: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
