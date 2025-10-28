import React from "react";
import clsx from "clsx";

export function Button({ children, onClick, variant = "default", size = "md", className = "" }) {
  const base =
    "rounded-full font-medium transition focus:outline-none flex items-center justify-center";

  const variants = {
    default: "bg-green-600 hover:bg-green-700 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}

// If other files import with `import { Button } ...` this works.
// If other files import with `import Button ...` you can also add:
export default Button;
