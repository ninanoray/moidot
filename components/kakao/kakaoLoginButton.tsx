import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";
import KakaoTalk from "./kakaoTalk";

const KakaoLoginButton = ({
  className,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
  return (
    <Button
      className={cn(
        "relative w-full bg-[#FEE500] text-[#000000 85%] [&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    >
      <KakaoTalk className="absolute left-3" />
      <span className="size-3" />
      카카오 로그인
    </Button>
  );
};

export default KakaoLoginButton;
