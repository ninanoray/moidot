"use client";

import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";
import {
  MotionHighlight,
  MotionHighlightItem,
} from "../effects/motion-highlight";

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  transition?: Transition;
};

function RadioGroup({
  className,
  transition = { type: "spring", stiffness: 350, damping: 30 },
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-2.5", className)}
      {...props}
    >
      <MotionHighlight
        hover
        enabled
        className="bg-card-foreground/20 rounded-md"
        controlledItems
        transition={transition}
      >
        {children}
      </MotionHighlight>
    </RadioGroupPrimitive.Root>
  );
}

type RadioGroupIndicatorProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Indicator
> & {
  transition: Transition;
};

function RadioGroupIndicator({
  className,
  transition,
  ...props
}: RadioGroupIndicatorProps) {
  return (
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <AnimatePresence>
        <motion.div
          key="radio-group-indicator-circle"
          data-slot="radio-group-indicator-circle"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={transition}
        >
          <Circle className="size-3 fill-current text-current" />
        </motion.div>
      </AnimatePresence>
    </RadioGroupPrimitive.Indicator>
  );
}

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> &
  HTMLMotionProps<"button"> & {
    transition?: Transition;
  };

function RadioGroupItem({
  className,
  transition = { type: "spring", stiffness: 200, damping: 16 },
  children,
  ...props
}: RadioGroupItemProps) {
  if (!!children)
    return (
      <MotionHighlightItem className="max-w-full active:scale-95 trans-200 overflow-hidden">
        <RadioGroupPrimitive.Item
          data-slot="radio-group-item"
          className={cn(
            "w-full px-3 py-2 rounded-md cursor-pointer data-[state='checked']:bg-card-foreground/50 data-[state='checked']:text-card",
            className
          )}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Item>
      </MotionHighlightItem>
    );
  else
    return (
      <RadioGroupPrimitive.Item asChild {...props}>
        <motion.button
          data-slot="radio-group-item"
          className={cn(
            "aspect-square size-5 rounded-full flex items-center justify-center border border-input text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          <RadioGroupIndicator
            data-slot="radio-group-item-indicator"
            transition={transition}
          />
        </motion.button>
      </RadioGroupPrimitive.Item>
    );
}

export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
  type RadioGroupProps,
};
