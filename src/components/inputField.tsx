import { label } from "framer-motion/client";
import React from "react";

interface InputFieldProp{
label: string;
placeholder: string;
id: string;
value:string;
onChange: React.ChangeEventHandler<HTMLInputElement>;

type:string;

}

interface InputBtn {
onClick: React.MouseEventHandler<HTMLButtonElement>;
loading?: boolean;
label:string;
}

export const InputField : React.FC<InputFieldProp> =({
    value,placeholder,id,onChange,type,label
})=>{
return(

    <div className="flex-col p-5">

        <label htmlFor={id} className="font-bold text-base">{label}</label>
        <input placeholder={placeholder} value={value} onChange={onChange} type={type} />
    </div>
)


}

export const InputBtn :  React.FC<InputBtn> =({onClick ,label,loading})=>{

    return(
        <button onClick={()=>(onClick) } disabled ={loading}>{label}</button>
    )

}