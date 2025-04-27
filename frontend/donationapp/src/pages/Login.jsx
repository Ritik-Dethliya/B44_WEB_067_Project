import { useState,useContext } from "react";
import axios from 'axios'
import { communitiesContext } from "../ContextApi/CommunityContext";
import { useNavigate } from "react-router-dom";
function Login() {
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const {setLogin,setSignin}=useContext(communitiesContext)
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        //console.log(password,email)
        try {
            let res= await axios.post("https://b44-web-067-project-cowardfunding.onrender.com/user/login/",
                {
                    email,password
                }
            )
            let {token}=res.data
            console.log(res.data)
            if(token){
                localStorage.setItem("token",token)
                console.log(res.data)
                setLogin(true)
                setSignin(true)
                navigate("/")
            }
            else{
                console.log("token not present")
            }
        } catch (error) {
            console.log(error)
            console.log("Something went wrong during login in ")
        }
        
    }
    return ( 
        <>
            <form onSubmit={handleSubmit} className="flex flex-wrap p-5 shadow-xl  items-center justify-center bg-[#006A71] rounded-lg">
                <h1 className="text-center w-full text-lg font-semibold text-black">Login</h1>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" name="userEmail" placeholder="Enter email" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <input onChange={(e)=>setPassword(e.target.value)} type="text" name="password" placeholder="Enter password" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-800"/>
                
                <button type="submit" className="self-center p-2 border-purple-800 rounded-4xl font-bold  hover:border-transparent hover:bg-white  active:bg-purple-700 ">Login</button>
            </form>
        </>
     );
}

export default Login;