"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";
import { getErrorDataByCode } from "./getErrorDataByCode";

export interface ErrorPageProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorPageProps) => {
  const errorData = getErrorDataByCode(error as AxiosError);

  const { logout } = useAuthStore();

  return (
    <div className="size-full flex flex-col justify-evenly items-center">
      <h2>에러가 발생했습니다</h2>
      <p className="whitespace-pre-line text-center">{errorData.message}</p>
      {errorData.requireLogin ? (
        <Button onClick={logout}>로그아웃</Button>
      ) : (
        <Button onClick={resetErrorBoundary}>재시도</Button>
      )}
    </div>
  );
};
