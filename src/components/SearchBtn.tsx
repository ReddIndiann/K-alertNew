import React from "react"
import { SearchBtnProps } from "../types"


export const SeacrhBtn: React.FC<SearchBtnProps> =({
    value,
    onChange,
    placeholder,
    type,
    onClick,
    disabled = false,
    label,
    loading = false,
    id
})=>{

    return(
        <div className="flex-col">
      <label htmlFor={id} className="">{label}</label>
            <input type={type} className="w=full mt-5" placeholder={placeholder} value={value} onChange={onChange} disabled={disabled}/>
            <button id={id} onClick={onClick} disabled={disabled} className="bg-blue-500 text-white px-4 py-2 rounded mt-2" >{loading ? "Loading..." : "Search"}</button>
        </div>
    )
}
