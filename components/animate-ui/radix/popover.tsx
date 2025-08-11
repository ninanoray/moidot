"use client";

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

type PopoverContextType = {
  isOpen: boolean;
};

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined
);

const usePopover = (): PopoverContextType => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a Popover");
  }
  return context;
};

type Side = "top" | "bottom" | "left" | "right";

const getInitialPosition = (side: Side, translate) => {
  switch (side) {
    case "top":
      return { y: translate };
    case "bottom":
      return { y: -translate };
    case "left":
      return { x: translate };
    case "right":
      return { x: -translate };
  }
};

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

function Popover({ children, ...props }: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false
  );

  React.useEffect(() => {
    if (props?.open !== undefined) setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props]
  );

  return (
    <PopoverContext.Provider value={{ isOpen }}>
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> &
  HTMLMotionProps<"div"> & {
    transition?: Transition;
    translateOffset?: number;
  };

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  translateOffset = 50,
  transition = { type: "spring", stiffness: 300, damping: 25 },
  children,
  ...props
}: PopoverContentProps) {
  const { isOpen } = usePopover();
  const initialPosition = getInitialPosition(side, translateOffset);

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPrimitive.Portal forceMount data-slot="popover-portal">
          <PopoverPrimitive.Content
            forceMount
            align={align}
            side={side}
            sideOffset={sideOffset}
            className="z-50 focus:outline-none"
            {...props}
          >
            <motion.div
              key="popover-content"
              data-slot="popover-content"
              initial={{ opacity: 0, scale: 0.5, ...initialPosition }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, ...initialPosition }}
              transition={transition}
              className={cn(
                "w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none",
                className
              )}
              {...props}
            >
              {children}
            </motion.div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>;

function PopoverAnchor({ ...props }: PopoverAnchorProps) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  usePopover,
  type PopoverAnchorProps,
  type PopoverContentProps,
  type PopoverContextType,
  type PopoverProps,
  type PopoverTriggerProps,
};
