import React from "react";

const InputText = ({
    label,
    id,
    name,
    onChange,
    required,
    placeholder,
    type,
    value,
    readOnly,
    error,
    textError,
}) => {
    return (
        <div className="flex flex-col gap-3 w-full">
            <label htmlFor={id} className="block font-black text-sm">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <input
                id={id}
                className={`px-2 py-3 w-full ring-0 border-gray-400 ${
                    readOnly ? "bg-gray-200" : ""
                }`}
                name={name}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                type={type}
                value={value}
                readOnly={readOnly}
            />
            {error && <span className="text-red-600">{textError}</span>}
        </div>
    );
};

export default InputText;
