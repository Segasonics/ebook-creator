import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  loading = false,
  children,
  icon: Icon,
  className = "",
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
    secondary: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
    ghost: "bg-transparent text-violet-500 border border-violet-500",
    danger: "bg-red-500 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-lg",
    md: "px-6 py-3 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-xl",
  };
  const isBusy = isLoading || loading;
  const isDisabled = disabled || isBusy;

  return (
    <button
      className={`inline-flex h-10 rounded-lg items-center justify-center font-medium transition-all duration-75 ease-in-out ${
        variants[variant]
      } ${sizes[size] ?? sizes.md} ${
        isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={isDisabled}
      aria-busy={isBusy}
      aria-disabled={isDisabled}
      {...props}
    >
      {isBusy ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Loading...</span>
        </span>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />} {children}
        </>
      )}
    </button>
  );
};

export default Button;
