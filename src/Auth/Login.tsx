import React, {  useState } from "react";
import { InputField } from "../components/inputField";


import { userColorType } from "../Context/ColorTypeContext";
import { color } from "framer-motion";
export const Login = () => {
const {chooseColorType,colorType} = userColorType()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [chooseColor,setChooseColor] = useState<string>('#000000');


    const [ now,setNow] = useState(0)
    const [signUpVisible, setSignUpVisible] = useState(false);

    const handleSubmit =(e: React.FormEvent)=> {
        e.preventDefault();
        console.log(formData , Date.now);
        // Perform login logic here, such as sending a request to the server
        // and handling the response.
    }
    const showNow =() =>{
setNow(Date.UTC(2023, 10, 1, 0, 0, 0, 0));

    }
const setVisiblityy:any =()=>{
setSignUpVisible(!signUpVisible)
    
}
    return (

        <div className="min-h bg-gradient-to-tl from-[#F9F9F9] to-[#201d1d] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
                    <p className="mt-2 text-lg text-gray-600">Please sign in to your account.</p>
                </div>
                <div className="mt-8 flex-col">
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="email"
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    

                    />
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />

                        <button type="submit" className="w-full mt-5 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign In</button>
</form>
<div className="mt-8 text-center">
    <p className="text-sm text-gray-600">Don't have an account? <a className="text-blue-600" href="/signup">Sign Up</a></p>
</div>

<button onClick={setVisiblityy} className="mt-5 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    {signUpVisible ? "Hide Sign Up" : "Show Sign Up"}   </button>



<button onClick={showNow}> Now Time : {now}</button>

                    <div className="mt-4 text-center">
                        {signUpVisible && (<p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a></p>)}
                        
                    </div>

                    <h2>PICK global Color</h2>
                    <input type="color" value={chooseColor} onChange={(e) => setChooseColor(e.target.value)} />
                    <button onClick={() => chooseColorType(chooseColor)} >Set Color</button>
                    <div></div>
                </div>
            </div>

        </div>
    )
}