import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { useLayoutContainer } from "../layoutContainerProvider";
import AuthHeader from "./authHeader";
import PublicHeader from "./publicHeader";

interface HeaderProps {
  className?: string | undefined;
  session: Session | null;
}

const Header = ({ className, session }: HeaderProps) => {
  const { scrollY } = useLayoutContainer();

  return (
    <header
      className={cn(
        "w-full sat sticky top-0 z-50 trans-300 mobile",
        scrollY > 0 ? "bg-primary shadow-md" : "bg-transparent",
        className
      )}
    >
      {!!session ? <AuthHeader /> : <PublicHeader />}
    </header>
  );
};

export default Header;
