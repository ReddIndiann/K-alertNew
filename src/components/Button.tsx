import React from "react";

interface ButtonProps {

    label:string
    onClick: () => void;

}

export const Button :React.FC<ButtonProps> =({label, onClick})=>{
return(
    <button onClick={onClick} className="bg-red-300 p-24">{label}</button>
)

}