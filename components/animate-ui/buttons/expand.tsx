import { cn } from "@/lib/utils";
import { ArrowDownToLine } from "lucide-react";
import { HTMLMotionProps, motion, Transition, Variants } from "motion/react";
import Ripple from "../effects/motion-ripple";

interface ExpandButtonProps extends HTMLMotionProps<"button"> {
  label: string;
  variants?: Variants;
  transition?: Transition;
  labelVariants?: Variants;
  labelTransition?: Transition;
}

const ExpandButton = ({
  label,
  variants = {
    rest: { maxWidth: "40px" },
    hover: {
      maxWidth: "140px",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 35,
        delay: 0.15,
      },
    },
    tap: { scale: 0.95 },
  },
  transition = { type: "spring", stiffness: 250, damping: 25 },
  labelVariants = {
    rest: { opacity: 0, x: 4 },
    hover: { opacity: 1, x: 0, visibility: "visible" },
    tap: { opacity: 1, x: 0, visibility: "visible" },
  },
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
      variants={variants}
      transition={transition}
      className={cn(
        "h-10 rounded-lg bg-primary text-primary-foreground overflow-hidden whitespace-nowrap",
        className
      )}
      {...props}
    >
      <Ripple className="p-2 flex justify-start items-center">
        <ArrowDownToLine size={20} className="shrink-0 ml-0.5" />
        <motion.span
          variants={labelVariants}
          transition={labelTransition}
          className="invisible mx-1 text-sm"
        >
          {label}
        </motion.span>
      </Ripple>
    </motion.button>
  );
};

export default ExpandButton;
