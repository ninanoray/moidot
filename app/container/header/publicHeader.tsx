import { CustomCategoryCode } from "@/app/dotmap/components/createMydotMarker";
import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { RotatingText } from "@/components/animate-ui/text/rotating";
import ThemeSwitch from "@/components/theme/themeSwitch";
import { cn } from "@/lib/utils";
import { useLayoutContainer } from "../layoutContainerProvider";
import Logo from "./logo";

const PublicHeader = () => {
  const { scrollY } = useLayoutContainer();

  return (
    <div className="px-3 flex justify-between items-center">
      <Logo />
      <div className="flex gap-4 items-center">
        <RotatingText
          text={Object.keys(CustomCategoryCode)}
          className={cn(
            "w-18 text-end text-lg font-medium",
            scrollY > 0 ? "text-primary-foreground" : ""
          )}
        />
        <RippleButton variant="secondary" className="p-0">
          <a href="/login" className="size-full px-4 py-2 flex-center">
            시작하기
          </a>
        </RippleButton>
        <ThemeSwitch className="hidden md:flex" />
      </div>
    </div>
  );
};

export default PublicHeader;
