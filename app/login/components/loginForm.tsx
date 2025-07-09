"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  function gotoHomePage() {
    router.push("/");
  }

  return (
    <form className="flex flex-col gap-6">
      <div className="grid gap-3">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <Button type="submit" className="w-full" onClick={gotoHomePage}>
        로그인
      </Button>
    </form>
  );
}
