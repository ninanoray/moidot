import Login from "./components/login";

export default async function login() {
  return (
    <div className="bg-background min-h-svh flex-center flex-col gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login />
      </div>
    </div>
  );
}
