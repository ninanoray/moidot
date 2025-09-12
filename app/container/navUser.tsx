"use client";

import { Bell, LogOut, User2 } from "lucide-react";

import ThemeSwitch from "@/components/theme/themeSwitch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/animate-ui/radix/dropdown-menu";

export function NavUser({ children }: { children?: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {children || (
          <Avatar className="size-8 rounded-full">
            <AvatarImage
              src={user?.image}
              alt={`모이닷 ${user?.name} 프로필`}
            />
            <AvatarFallback className="rounded-lg">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-full">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name} 님</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
            <ThemeSwitch className="w-fit md:hidden" />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-1 py-1.5 text-xs">
          <h6 className="font-normal">참여 중인 모임: 2개</h6>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bell />
            알림
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User2 />
            마이페이지
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
        >
          <LogOut />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
