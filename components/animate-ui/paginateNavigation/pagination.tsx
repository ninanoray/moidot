import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, Transition } from "motion/react";
import Link from "next/link";
import {
  MotionHighlight,
  MotionHighlightItem,
} from "../effects/motion-highlight";
import Ripple from "../effects/motion-ripple";

type PaginationContextType = {
  highlightTransition: Transition;
  animateOnHover: boolean;
};

const PaginationContext = React.createContext<
  PaginationContextType | undefined
>(undefined);

const usePagination = (): PaginationContextType => {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a Pagination");
  }
  return context;
};

type PaginationProps = React.ComponentProps<"nav"> & {
  transition?: Transition;
  animateOnHover?: boolean;
};

function Pagination({
  className,
  transition = { type: "spring", stiffness: 350, damping: 35 },
  animateOnHover = true,
  ...props
}: PaginationProps) {
  return (
    <PaginationContext.Provider
      value={{ highlightTransition: transition, animateOnHover }}
    >
      <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    </PaginationContext.Provider>
  );
}

type PaginationContentProps = React.ComponentProps<"ul"> &
  HTMLMotionProps<"ul"> & {
    transition?: Transition;
  };

function PaginationContent({
  children,
  className,
  transition = { duration: 0.2 },
  ...props
}: PaginationContentProps) {
  const { highlightTransition, animateOnHover } = usePagination();

  return (
    <motion.ul
      data-slot="pagination-content"
      key="pagination-content"
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] flex gap-1 rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={transition}
      style={{ willChange: "opacity, transform" }}
      {...props}
    >
      <MotionHighlight
        hover
        className="rounded-sm"
        controlledItems
        transition={highlightTransition}
        enabled={animateOnHover}
      >
        {children}
      </MotionHighlight>
    </motion.ul>
  );
}

function PaginationItem({ children, ...props }: React.ComponentProps<"li">) {
  return (
    <MotionHighlightItem>
      <motion.div
        data-slot="dropdown-menu-sub-trigger"
        whileTap={{ scale: 0.95 }}
        className="[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground cursor-default select-none outline-none"
      >
        <li data-slot="pagination-item" {...props}>
          <Ripple>{children}</Ripple>
        </li>
      </motion.div>
    </MotionHighlightItem>
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link> & {
    inset?: boolean;
    disabled?: boolean;
  };

function PaginationLink({
  className,
  isActive,
  children,
  ...props
}: {
  isActive?: boolean;
} & PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "size-9 flex-center data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "w-auto gap-1 px-2.5 sm:pl-2.5",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">이전</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "w-auto gap-1 px-2.5 sm:pr-2.5",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">다음</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
