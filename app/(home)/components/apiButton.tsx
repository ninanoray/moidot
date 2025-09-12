import {
  RippleButton,
  RippleButtonProps,
} from "@/components/animate-ui/buttons/ripple";
import { Loader2 } from "lucide-react";

interface ApiButtonProps extends RippleButtonProps {
  isSuccess: boolean;
  isLoading: boolean;
  error: Error | null;
}
const ApiButton = ({
  isSuccess,
  isLoading,
  error,
  children,
  ...props
}: ApiButtonProps) => {
  if (isSuccess) {
    return <RippleButton {...props}>성공</RippleButton>;
  } else if (isLoading) {
    return (
      <RippleButton {...props}>
        <Loader2 className="animate-rotate repeat-infinite" />
      </RippleButton>
    );
  } else if (error) {
    return <RippleButton {...props}>{error.toString()}</RippleButton>;
  } else return <RippleButton {...props}>{children}</RippleButton>;
};

export default ApiButton;
