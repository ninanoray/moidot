"use client";

import { cn } from "@/lib/utils";

interface AudioWaveformProps extends React.SVGAttributes<SVGSVGElement> {
  isHover?: boolean;
  className?: string | undefined;
}

const AudioWaveform = ({
  isHover,
  className,
  ...props
}: AudioWaveformProps) => {
  return (
    <div className="flex-center select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "size-4 fill-none stroke-2 stroke-sidebar-foreground hover:[&_path]:animate-erase-draw",
          "group-hover/menu-item:[&_path]:animate-erase-draw",
          className
        )}
        {...props}
      >
        <path
          strokeDasharray={100}
          d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"
        />
      </svg>
    </div>
  );
};

export { AudioWaveform };
