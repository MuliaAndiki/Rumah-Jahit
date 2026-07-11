import * as React from "react";

interface AuthFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}

const AuthField: React.FC<AuthFieldProps> = ({
  label,
  htmlFor,
  error,
  children,
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={htmlFor}
        className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
};

export default AuthField;
