import { ErrorFallback } from "@/providers/errorBoundary/ErrorFallback";
import Login from ".";

interface Params {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function login({ searchParams }: Params) {
  const { error } = await searchParams;
  if (!error)
    return (
      <div className="bg-background min-h-svh flex-center flex-col gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Login />
        </div>
      </div>
    );
  else return <ErrorFallback error={error || ""} />;
}
