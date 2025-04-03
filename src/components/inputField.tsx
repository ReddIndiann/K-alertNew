import React from "react";
interface InputFieldProps{

    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
}

export const InputField: React.FC<InputFieldProps> =({id,label,type,placeholder,value,onChange,required})=>{

    

    return(
        <div className="flex-col">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input type={type} className="w=full mt-5" placeholder={placeholder} value={value} onChange={onChange} required={required}/>
        </div>
    )
}