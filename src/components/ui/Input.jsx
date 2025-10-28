import React from "react";
import clsx from "clsx";

// Named export
export function Input({ placeholder = "", value, onChange, className = "" }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        "px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full",
        className
      )}
    />
  );
}

// Default export to support `import Input from "..."`
export default Input;
