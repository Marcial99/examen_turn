import React from "react";

const InputText = ({
    label,
    id,
    name,
    onChange,
    required,
    placeholder,
    type,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={id} className="block font-black text-sm">
                {label} {required && <span className="text-red-600">*</span>}
            </label>
            <input
                id={id}
                className="px-2 py-3 w-full ring-0 border-gray-400"
                name={name}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                type={type}
            />
        </div>
    );
};

export default InputText;
