'use client'
import { useContext , createContext , useState  } from "react";


const AppDataContext = createContext<any>(undefined);

const AppWrapper = ({children} : {children : React.ReactNode}) =>{
    const [userId,setUserId] = useState<number>();
    const [HomeDetails,setHomeDetails]=useState<ApiResponse>();
    return (
        <AppDataContext.Provider value={{userId ,setUserId , HomeDetails,setHomeDetails}}>
            {children}
        </AppDataContext.Provider>
    )
}

export default AppWrapper;


export const useAppWrapper = () => useContext(AppDataContext);