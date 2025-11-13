import React from "react";

const InputField = ({ icon: Icon, label, name, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Icon && (
            <Icon className="w-5 h-5 text-gray-500" aria-hidden="true" />
          )}
          <input
            id={name}
            name={name}
            {...props}
            className={`w-full h-11 px-3 py-2 pl-10 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-violet-500 focus:border-violet-500 block sm:text-sm
               placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-wide
                bg-gray-50 focus:bg-white ${Icon ? "pr-12" : ""}`.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
