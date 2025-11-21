import React from "react";

const SelectField = ({ icon: Icon, label, name, options, ...props }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            <Icon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <select
          id={name}
          name={name}
          {...props}
          className={`w-full h-11 px-3 py-2 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 block sm:text-sm placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-wide ${
            Icon ? "pl-10" : ""
          }`}
        >
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;
