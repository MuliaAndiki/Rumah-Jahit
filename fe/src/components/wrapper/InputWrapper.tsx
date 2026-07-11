import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/atoms';
import { cn } from '@/utils/classname';

export interface DecoratedInputProps extends React.ComponentProps<typeof Input> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  showPasswordToggle?: boolean;
  error?: string;
}

const DecoratedInput = React.forwardRef<HTMLInputElement, DecoratedInputProps>(
  ({ className, iconLeft, iconRight, showPasswordToggle, type = 'text', error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password' || showPasswordToggle;
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="relative flex w-full items-center">
        {iconLeft && (
          <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
            {iconLeft}
          </div>
        )}

        <Input
          ref={ref}
          type={inputType}
          aria-invalid={Boolean(error)}
          className={cn(
            iconLeft ? 'pl-10' : '',
            iconRight || isPassword ? 'pr-10' : '',
            error ? 'border-destructive ring-destructive/20' : '',
            className
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : iconRight ? (
          <div className="absolute right-3 flex items-center justify-center text-muted-foreground">
            {iconRight}
          </div>
        ) : null}
      </div>
    );
  }
);

DecoratedInput.displayName = 'DecoratedInput';

export { DecoratedInput };
