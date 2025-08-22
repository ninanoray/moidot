import { RippleButton } from "@/components/animate-ui/buttons/ripple";

const PublicHomeHeader = () => {
  return (
    <header className="w-full px-3 sat sticky top-0 z-50 flex justify-between items-center bg-primary shadow-md">
      <h1 className="text-primary-foreground dark:text-card-foreground">
        MOIDOT
      </h1>
      <RippleButton variant="secondary">
        <a href="/login">시작하기</a>
      </RippleButton>
    </header>
  );
};

export default PublicHomeHeader;
