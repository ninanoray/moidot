import { ErrorFallback } from "@/providers/errorBoundary/ErrorFallback";
import { Metadata } from "next";
import Login from ".";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const metadata: Metadata = {
  title: "모이닷 - 로그인",
  description: "모이닷 시작하기",
};

export default async function login({ searchParams }: Params) {
  const { error } = await searchParams;
  if (!error)
    return (
      <div className="min-h-svh flex-center flex-col gap-6 p-6 md:p-10 bg-background">
        <Login />
      </div>
    );
  else return <ErrorFallback error={error || ""} />;
}
