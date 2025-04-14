import React,{useState,createContext,useContext, ReactNode} from "react";


interface ColorTypeContextType {
  colorType: string;
  chooseColorType: (colorType: string) => void;
}

const ColorTypeContext = createContext<ColorTypeContextType | undefined>(undefined);

export const ColorProvider = ({ children } : {children :ReactNode}) => {

  const [colorType, setColorType] = useState<string>("light");
  const chooseColorType = (colorType: string) => {
    setColorType(colorType);
    console.log("context color",colorType);
  }

  return(
    <ColorTypeContext.Provider value={{colorType, chooseColorType}}>
      {children}
    </ColorTypeContext.Provider>
  )
}

export const userColorType = () => {
  const context = useContext(ColorTypeContext);
  if(!context){
    throw new Error("useColorType must be used within a ColorTypeProvider")
  }
  return context;
}