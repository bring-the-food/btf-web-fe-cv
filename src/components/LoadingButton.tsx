import React from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";

type LoadingButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  children: React.ReactNode;
  isLoading: boolean;
};

const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2Icon className="animate-spin mt-1" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
