import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { cn } from "@/lib/utils";

interface PublicHomeHeaderProps {
  scroll: number;
}

const PublicHomeHeader = ({
  scroll: scrollPosition,
}: PublicHomeHeaderProps) => {
  return (
    <header
      className={cn(
        "w-full px-3 sat sticky top-0 z-50 flex justify-between items-center trans-300",
        scrollPosition > 0 ? "bg-primary shadow-md" : "bg-transparent"
      )}
    >
      <h1
        className={cn(
          scrollPosition > 0
            ? "text-primary-foreground dark:text-card-foreground"
            : ""
        )}
      >
        MOIDOT
      </h1>
      <RippleButton variant="secondary">
        <a href="/login">시작하기</a>
      </RippleButton>
    </header>
  );
};

export default PublicHomeHeader;
