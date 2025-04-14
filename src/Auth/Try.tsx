import React from "react";
import { Button } from "../components/Button";




const friend =[
    {name:"John", age: 25},
    {name:"Jane", age: 30},
    {name:"Doe", age: 35}
]


const enermies =[
    { id: 1,name:"John", age: 25},
    {id: 1, name:"Jane", age: 30},
    {id: 1, name:"Doe", age: 35}
]



export const Try =()=>{
const [count, setCount] = React.useState(0);
const [isVisible, setIsVisible] = React.useState(false);




const decreaseCount = () => {
    setCount(count-1)
}
const divideCount =()=>{

    setCount(count/2)
}
return(
    <div className="max-h bg-gradient-to-tl from-[#F9F9F9] to-[#201d1d] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

<Button label="iNCREASE" onClick={()=>{setCount(count + 1)}}/>
    <Button label="Derease" onClick={decreaseCount}/>
    <Button label="Multiply" onClick={()=>setCount(count*2)}/>
    <Button label="Divide" onClick={divideCount}/>
        <button className="bg-orange-400">{count}</button>
        { friend.map((friend,index)=>(
         <li key={index} className="bg-green-200">

            <div className="">Name: {friend.name}</div>
            <div className="">Age: {friend.age}</div>
         </li>
        ))}

        {
            enermies.map((enermies)=>(

                <li key={enermies.id} className="bg-red-200">

                    <div className="">Name: {enermies.name}</div>
                    <div className="">Age: {enermies.age}</div>
                    <button className="bg-blue-400" onClick={()=>setIsVisible(!isVisible)}>Show</button>
                </li>
            ))
        }
    </div>
)
}