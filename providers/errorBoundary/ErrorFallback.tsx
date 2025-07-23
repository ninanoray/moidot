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
      <div className="max-w-sm p-10 flex-center flex-col gap-4 bg-card text-card-foreground rounded-lg border shadow">
        <code className="m-0 p-1 rounded-sm bg-destructive text-destructive-foreground text-xs">
          {data.code}
        </code>
        <h3>오류</h3>
        <h5 className="my-6 whitespace-pre-line text-center">{data.message}</h5>
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
