"use client";

import KakaoLoginButton from "@/components/kakao/kakaoLoginButton";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { LoginForm } from "./components/loginForm";

const Login = () => {
  async function kakaoLogin() {
    await signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="max-w-sm flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/images/moidot/moidot.png"
          alt="moidot"
          width={200}
          height={200}
          priority
          className="rounded-full mobile drag-none"
        />
        <h3 className="text-center">잇고 모여서, 계속 이어지는 모임</h3>
        <h5 className="mb-4 italic">
          Connect the Dots, draw the Dules, and gather into the Moim
        </h5>
      </div>
      <LoginForm />
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          혹은
        </span>
      </div>
      <KakaoLoginButton onClick={kakaoLogin} />
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default Login;
