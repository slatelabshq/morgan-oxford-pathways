import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type StaggerGridProps = {
  className?: string;
  children: ReactNode;
  /** Delay between children in seconds. Default 0.08. */
  stagger?: number;
  /** Delay before the first child animates in seconds. Default 0.05. */
  delay?: number;
};

/**
 * StaggerGrid — a grid wrapper that fades its <StaggerItem/> children in
 * one-by-one when the grid scrolls into view. Grid layout classes come
 * from the caller so existing spacing is preserved.
 */
export function StaggerGrid({
  className,
  children,
  stagger = 0.08,
  delay = 0.05,
}: StaggerGridProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn(className)} data-reveal-skip="true">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      data-reveal-skip="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
