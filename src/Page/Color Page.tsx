import React,{useState} from "react";


import { userColorType } from "../Context/ColorTypeContext";
export const ColorPage = () => {
    const { chooseColorType, colorType } = userColorType();
    const [chooseColor, setChooseColor] = useState<string>('#000000');
    const [signUpVisible, setSignUpVisible] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        chooseColorType(chooseColor); // Update context
        console.log("Submitted Color:", chooseColor);
    };

    return (
        <div className="min-h bg-gradient-to-tl from-[#F9F9F9] to-[#201d1d] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Choose Color</h1>
                    <p className="mt-2 text-lg text-gray-600">Please choose your color.</p>
                </div>
                <div className="mt-8 flex-col">
                    <form onSubmit={handleSubmit}>
                        <input type="color" value={chooseColor} onChange={(e) => setChooseColor(e.target.value)} />
                        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                    </form>
                    <p className="mt-4 text-gray-700">Current selected color: <span style={{ color: colorType }}>{colorType}</span></p>
                </div>
            </div>
        </div>
    );
};