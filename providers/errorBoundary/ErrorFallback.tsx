"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getErrorDataByCode } from "./getErrorDataByCode";

export interface ErrorPageProps {
  error: AxiosError | string | null;
  resetErrorBoundary?: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorPageProps) => {
  const router = useRouter();
  const data = getErrorDataByCode(error);

  return (
    <div className="h-screen w-full flex-center flex-col">
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 flex-center flex-col gap-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <h3>오류</h3>
        <h5 className="whitespace-pre-line text-center">
          {data.message}
          <br />
          코드{" "}
          <code className="rounded-sm bg-slate-100 p-1 text-xs">
            {data.code}
          </code>
        </h5>
        {data.requireLogin ? (
          <RippleButton onClick={() => signOut()}>로그아웃</RippleButton>
        ) : (
          <RippleButton
            onClick={
              resetErrorBoundary ? resetErrorBoundary : () => router.push("/")
            }
          >
            재시도
          </RippleButton>
        )}
      </div>
    </div>
  );
};
