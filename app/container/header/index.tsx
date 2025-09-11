import { cn } from "@/lib/utils";
import PublicHeader from "./publicHeader";

interface HeaderProps {
  scroll: number;
}

const Header = ({ scroll: scrollPosition }: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full sat sticky top-0 z-50 trans-300 mobile",
        scrollPosition > 0 ? "bg-primary shadow-md" : "bg-transparent"
      )}
    >
      <PublicHeader scrollPosition={scrollPosition} />
    </header>
  );
};

export default Header;
