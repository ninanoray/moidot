import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, Transition } from "motion/react";
import React from "react";

export type Ripple = {
  id: number;
  x: number;
  y: number;
};

export type RippleDivProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode;
  rippleClassName?: string;
  scale?: number;
  transition?: Transition;
};

const Ripple = ({
  ref,
  children,
  className,
  rippleClassName,
  scale = 10,
  transition = { duration: 0.6, ease: "easeOut" },
  ...props
}: RippleDivProps) => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const divRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => divRef.current as HTMLDivElement);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const button = divRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    []
  );

  return (
    <motion.div
      ref={divRef}
      // onClick={handleClick}
      tabIndex={1}
      onMouseDown={createRipple}
      className={cn(
        "relative size-full overflow-hidden inline-flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>*]:focus-visible:ring-0",
        className
      )}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className={cn(
            "absolute rounded-full size-5 pointer-events-none bg-primary-foreground",
            rippleClassName
          )}
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Ripple;
