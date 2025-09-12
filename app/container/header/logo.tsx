import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLayoutContainer } from "../layoutContainerProvider";

const Logo = () => {
  const { scrollY } = useLayoutContainer();
  const router = useRouter();

  return (
    <h1
      onClick={() => router.push("/")}
      className={cn(
        "cursor-pointer",
        scrollY > 0 ? "text-primary-foreground dark:text-card-foreground" : ""
      )}
    >
      MOIDOT
    </h1>
  );
};

export default Logo;
