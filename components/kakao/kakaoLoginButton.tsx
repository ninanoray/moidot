import { cn } from "@/lib/utils";
import { RippleButton, RippleButtonProps } from "../animate-ui/buttons/ripple";
import KakaoTalk from "./kakaoTalk";

const KakaoLoginButton = ({ className, ...props }: RippleButtonProps) => {
  return (
    <RippleButton
      variant="outline"
      className={cn(
        "relative w-full border-0 bg-kakao text-kakao-foreground dark:bg-kakao/50 hover:bg-kakao/75 dark:hover:bg-kakao/40 [&_svg:not([class*='size-'])]:size-5 focus-visible:ring-kakao/20",
        className
      )}
      {...props}
    >
      <KakaoTalk className="absolute left-3" />
      <span className="size-3" />
      카카오 로그인
    </RippleButton>
  );
};

export default KakaoLoginButton;
