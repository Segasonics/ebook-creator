import React from "react";

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  icon: Icon,
  className = "",
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
  return (
    <>
      <button
        className={`inline-flex cursor-pointer h-10 rounded-lg items-center justify-center font-medium transition-all duration-75 ease-in-out ${
          variants[variant]
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""} ${
          size === "md" ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs"
        }`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {Icon && <Icon className="w-4 h-4 mr-2" />} {children}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
