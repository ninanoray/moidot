import { cn } from "@/lib/utils";
import { RippleButton, RippleButtonProps } from "../animate-ui/buttons/ripple";
import KakaoTalk from "./kakaoTalk";

const KakaoLoginButton = ({ className, ...props }: RippleButtonProps) => {
  return (
    <RippleButton
      variant="outline"
      className={cn(
        "relative w-full border-0 bg-[#FEE500] text-black/85 hover:bg-[#FEE500]/80 hover:text-black/75 [&_svg:not([class*='size-'])]:size-5 hover:[&_svg:not([class*='size-'])]:fill-black/75",
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
