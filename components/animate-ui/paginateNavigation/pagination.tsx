import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, Transition } from "motion/react";
import { useRouter } from "next/navigation";
import { RippleButton } from "../buttons/ripple";
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
    <ul
      data-slot="pagination-content"
      className={cn(
        "p-1 flex items-center gap-1 border bg-popover text-popover-foreground rounded-lg shadow-md",
        className
      )}
      {...props}
    >
      <MotionHighlight
        hover
        className="bg-primary rounded-md"
        controlledItems
        transition={highlightTransition}
        enabled={animateOnHover}
      >
        {children}
      </MotionHighlight>
    </ul>
  );
}

function PaginationItem({
  children,
  ...props
}: React.ComponentProps<"li"> & HTMLMotionProps<"li">) {
  return (
    <motion.li tabIndex={-1} whileTap={{ scale: 0.95 }} {...props}>
      <MotionHighlightItem
        data-slot="pagination-item"
        className="rounded-md data-[active=true]:text-primary-foreground focus-within:bg-accent focus-within:text-accent-foreground trans-200"
      >
        <Ripple>{children}</Ripple>
      </MotionHighlightItem>
    </motion.li>
  );
}

type PaginationLinkProps = {
  href?: string;
  isActive?: boolean;
} & React.ComponentProps<"button">;

function PaginationLink({
  href,
  isActive,
  className,
  children,
  onClick,
  ...props
}: {
  isActive?: boolean;
} & PaginationLinkProps) {
  const router = useRouter();
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        "size-9 flex-center data-[active=true]:bg-primary data-[active=true]:text-primary-foreground cursor-pointer outline-0",
        className
      )}
      onClick={href ? () => router.push(href) : onClick}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof RippleButton>) {
  return (
    <RippleButton
      aria-label="Go to previous page"
      variant="ghost"
      className={cn(
        "w-auto gap-1 px-2.5 sm:pl-2.5 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">이전</span>
    </RippleButton>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof RippleButton>) {
  return (
    <RippleButton
      aria-label="Go to next page"
      variant="ghost"
      className={cn(
        "w-auto gap-1 px-2.5 sm:pr-2.5 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">다음</span>
      <ChevronRightIcon />
    </RippleButton>
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
