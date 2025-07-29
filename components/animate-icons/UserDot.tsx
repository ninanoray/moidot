import { cn } from "@/lib/utils";

interface UserDotProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string | undefined;
}

const UserDot = ({ className, ...props }: UserDotProps) => {
  return (
    <div className="flex-center select-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className={cn(
          "size-4 fill-none stroke-2 stroke-sidebar-foreground hover:[&_circle]:animate-user-dot",
          "group-hover/menu-item:[&_circle]:animate-user-dot",
          className
        )}
        {...props}
      >
        <circle cx="12" cy="8" r="4" />
        <ellipse cx="12" cy="18" rx="8" ry="2.5" />
      </svg>
    </div>
  );
};

export default UserDot;
