import React, {  useState } from "react";
import { InputField } from "../components/inputField";
export const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit =(e: React.FormEvent)=> {
        e.preventDefault();
        console.log(formData);
        // Perform login logic here, such as sending a request to the server
        // and handling the response.
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
                        required={true}

                    />
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={true} />

                        <button type="submit" className="w-full mt-5 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Sign In</button>
</form>

                    <div></div>
                </div>
            </div>

        </div>
    )
}