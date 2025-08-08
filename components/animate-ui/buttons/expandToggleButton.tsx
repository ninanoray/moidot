import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { HTMLMotionProps, motion, Transition } from "motion/react";
import Ripple from "../effects/motion-ripple";

interface ExpandButtonProps extends HTMLMotionProps<"button"> {
  label: string;
  icon: LucideIcon;
  isExpanded?: boolean;
  maxWidth?: string;
  transition?: Transition;
  labelTransition?: Transition;
}

const ExpandToggleButton = ({
  label,
  icon: Icon,
  isExpanded,
  maxWidth = "140px",
  transition = { type: "spring", stiffness: 250, damping: 25 },
  labelTransition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
  },
  className,
  ...props
}: ExpandButtonProps) => {
  return (
    <motion.button
      aria-label="Blacklist"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { width: "32px" },
        hover: {
          width: maxWidth,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 35,
            delay: 0.15,
          },
        },
        tap: { scale: 0.9 },
      }}
      transition={transition}
      animate={{
        width: isExpanded ? maxWidth : "32px",
      }}
      data-expanded={isExpanded}
      className={cn(
        "h-8 rounded-md overflow-hidden whitespace-nowrap transition-colors duration-200 bg-card text-card-foreground data-[expanded='true']:bg-primary data-[expanded='true']:text-primary-foreground cursor-pointer",
        className
      )}
      {...props}
    >
      <Ripple className="p-2 justify-start">
        <div className="w-fit mx-auto flex">
          <motion.div
            className="[&_svg]:size-4 shrink-0"
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.3,
            }}
            animate={
              isExpanded
                ? {
                    rotate: "180deg",
                    translateY: "-2px",
                  }
                : {
                    rotate: "0deg",
                    translateY: "2px",
                  }
            }
          >
            <Icon />
          </motion.div>
          <motion.span
            variants={{
              rest: { opacity: 0, x: 4 },
              hover: { opacity: 1, x: 0, visibility: "visible" },
              tap: { opacity: 1, x: 0, visibility: "visible" },
            }}
            transition={labelTransition}
            animate={
              isExpanded
                ? { opacity: 1, x: 0, visibility: "visible" }
                : { opacity: 0, x: 4 }
            }
            className="invisible mx-1 text-sm"
          >
            {label}
          </motion.span>
        </div>
      </Ripple>
    </motion.button>
  );
};

export default ExpandToggleButton;
