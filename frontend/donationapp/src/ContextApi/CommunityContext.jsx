import { createContext, useEffect,useState } from "react";
import axios from "axios";

export const communitiesContext=createContext([])

export const CommunitiesContextProvider=({children})=>{
   const [communities,setCommunities]=useState([])
   const [isLogin,setLogin]=useState(false)
   const [isSign,setSignin]=useState(false)
   const getCommunity=async()=>{
        try {
            let token=localStorage.getItem("token")
            let res=await axios.get("https://b44-web-067-project-cowardfunding.onrender.com/community/get-community/",{
                headers:{
                    Authorization:`Bearea ${token}`
                }
            })
            setCommunities(res.data.Communities)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
   }

    useEffect(()=>{
        getCommunity()
        return 
    },[])
    return(
        <communitiesContext.Provider value={{communities,isLogin,isSign,setSignin,setLogin}}>
            {children}
        </communitiesContext.Provider>
    )
}