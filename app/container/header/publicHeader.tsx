import { CustomCategoryCode } from "@/app/dotmap/components/createMydotMarker";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { RotatingText } from "@/components/animate-ui/text/rotating";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PublicHeaderProps {
  scrollPosition: number;
}

const PublicHeader = ({ scrollPosition }: PublicHeaderProps) => {
  const router = useRouter();

  return (
    <div className="px-3 flex justify-between items-center">
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
    </div>
  );
};

export default PublicHeader;
