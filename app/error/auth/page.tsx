import { ErrorFallback } from "@/providers/errorBoundary/ErrorFallback";

export default async function authError({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { error } = await searchParams;
  return <ErrorFallback error={error || ""} />;
}
