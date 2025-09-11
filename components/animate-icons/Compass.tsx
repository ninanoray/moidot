"use client";

import { cn } from "@/lib/utils";

interface CompassProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string | undefined;
}

const Compass = ({ className, ...props }: CompassProps) => {
  return (
    <div className="flex-center select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "size-4 fill-none stroke-2 stroke-foreground hover:[&_path]:animate-rotate hover:[&_circle]:animate-draw-circle",
          "group-hover/menu-item:[&_path]:animate-rotate group-hover/menu-item:[&_circle]:animate-draw-circle",
          className
        )}
        {...props}
      >
        <path
          d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
          className="origin-center"
        />
        <circle strokeDasharray={100} cx="12" cy="12" r="10" className="" />
      </svg>
    </div>
  );
};

export { Compass };
