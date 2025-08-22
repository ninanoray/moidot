import { CustomCategoryCode } from "@/app/dotmap/components/createMydotMarker";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { RotatingText } from "@/components/animate-ui/text/rotating";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PublicHomeHeaderProps {
  scroll: number;
}

const PublicHomeHeader = ({
  scroll: scrollPosition,
}: PublicHomeHeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={cn(
        "w-full px-3 sat sticky top-0 z-50 flex justify-between items-center trans-300 mobile",
        scrollPosition > 0 ? "bg-primary shadow-md" : "bg-transparent"
      )}
    >
      <h1
        onClick={() => router.push("/")}
        className={cn(
          scrollPosition > 0
            ? "text-primary-foreground dark:text-card-foreground"
            : ""
        )}
      >
        MOIDOT
      </h1>
      <div className="flex gap-4 items-center">
        <RotatingText
          text={Object.keys(CustomCategoryCode)}
          className={cn(
            "text-lg font-medium",
            scrollPosition > 0 ? "text-primary-foreground" : ""
          )}
        />
        <RippleButton variant="secondary" className="p-0">
          <a href="/login" className="size-full px-4 py-2 flex-center">
            시작하기
          </a>
        </RippleButton>
      </div>
    </header>
  );
};

export default PublicHomeHeader;
