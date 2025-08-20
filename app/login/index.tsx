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
    <div className="max-w-sm flex-center flex-col gap-2">
      <div>
        <Image
          src="/images/moidot/moidot.png"
          alt="모이닷"
          width={200}
          height={200}
          priority
          className="rounded-full mobile drag-none cursor-pointer"
          onClick={() => window.location.replace("/")}
        />
      </div>
      <div className="md:not-sr-only md:mb-8 sr-only">
        <h3 className="text-center">잇고 모여서, 계속 이어지는 모임</h3>
        <h5 className="text-center italic">
          Connect the Dots, draw the Dules, and gather into the Moim
        </h5>
      </div>
      <LoginForm />
      <span className="bg-background text-muted-foreground relative z-10 px-2">
        혹은
      </span>
      <KakaoLoginButton onClick={kakaoLogin} />
      <div className="mt-4 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default Login;
