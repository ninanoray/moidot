import { ErrorFallback } from "@/providers/errorBoundary/ErrorFallback";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function authError({ searchParams }: Params) {
  const { error } = await searchParams;
  return <ErrorFallback error={error || ""} />;
}
