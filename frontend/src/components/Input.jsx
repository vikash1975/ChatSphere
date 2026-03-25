import React from "react";

const Input = ({
  label,
  type ,
  placeholder,
  value,
  onChange,
  name,
  error,
  icon,
  className = "",
}) => {
  return (
    <div className="w-full">
      
      {/* Label */}
      {label && (
        <label className="block text-sm mb-1 text-gray-300">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full p-2 rounded-lg bg-transparent border border-gray-500
            focus:outline-none focus:border-cyan-400
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;