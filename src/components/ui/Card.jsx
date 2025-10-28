import React from "react";
import clsx from "clsx";

// Named export
export function Card({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "bg-white/5 rounded-2xl p-4 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

// Default export
export default Card;
