import { Loader2 } from 'lucide-react';

import {
  Button as ScnButton,
  ButtonProps as ScnButtonProps,
} from '@components/ui/button';

interface ButtonProps extends ScnButtonProps {
  isLoading?: boolean;
}

export const Button = ({
  isLoading,
  children,
  ...buttonProps
}: ButtonProps): JSX.Element => {
  return (
    <ScnButton {...buttonProps}>
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </ScnButton>
  );
};
