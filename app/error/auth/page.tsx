import { META } from "@/constants/metadata";
import { ErrorFallback } from "@/providers/errorBoundary/ErrorFallback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모이닷",
  description: "모이닷 에러",
  metadataBase: new URL(META.base),
  alternates: {
    canonical: "/",
  },
};

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function authError({ searchParams }: Params) {
  const { error } = await searchParams;
  return <ErrorFallback error={error || ""} />;
}
