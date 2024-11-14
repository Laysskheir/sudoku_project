import * as React from "react";
import clsx from "clsx"; 

const baseButtonStyles =
  "inline-flex items-center h-10 px-4 py-2 justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const primaryButtonStyles = "bg-blue-600 text-white hover:bg-blue-600/90";
const outlineButtonStyles = "border border-input bg-white hover:bg-white hover:text-black ";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant = "primary", className, ...props }, ref) => {
    const Comp = asChild ? "span" : "button";

    const variantStyles = variant === "outline" ? outlineButtonStyles : primaryButtonStyles;

    return (
      <Comp
        className={clsx(baseButtonStyles, variantStyles, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };