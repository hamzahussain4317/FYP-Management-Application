'use client'
import { useContext , createContext , useState  } from "react";

type ContextProps = {
    studentDetails:Student[],
}
const AppDataContext = createContext({hello:"world"});

const AppWrapper = ({children} : {children : React.ReactNode}) =>{
    const [check,setCheck] = useState({hello:"WOrld"});
    return (
        <AppDataContext.Provider value={check}>
            {children}
        </AppDataContext.Provider>
    )
}

export default AppWrapper;


export const useAppWrapper = () => useContext(AppDataContext);