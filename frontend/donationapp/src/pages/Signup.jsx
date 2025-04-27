import { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { communitiesContext } from "../ContextApi/CommunityContext";
function Signup() {
    const navigate=useNavigate()
    const [password,setPassword]=useState("");
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("donor");
    const {setSignin}=useContext(communitiesContext)
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        //console.log(password,email)
        try {
            let res= await axios.post("https://b44-web-067-project-cowardfunding.onrender.com/user/signup/",
                {
                    email,password,name,role
                }
            )
            if(res.status==201){
                console.log("signup Successful ")
                setSignin(true)
                navigate('/login')
            }
            else{
                console.log("error in signup")
            }
        } catch (error) {
            console.log("Something went wrong during login in ")
        }
        
    }
    return ( 
        <>
            <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap p-5 shadow-xl items-center justify-center bg-[#006A71] rounded-lg">
                <h1 className="text-center w-full text-lg font-semibold text-black">Signup</h1>
                <input onChange={(e)=>setName(e.target.value)} type="text" name="name" placeholder="Enter user full name" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" name="userEmail" placeholder="Enter email" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Enter password" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-800"/>
                <select class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700">
                    <option value="">select role</option>
                    <option value="donor">donor</option>
                    <option value="admin">admin</option>
                    <option value="staff">staff</option>
                </select>
                <button type="submit" className="self-center p-2 border-purple-800 rounded-4xl font-bold  hover:border-transparent hover:bg-white  active:bg-purple-700 ">Signup</button>
            </div>
            </form>
        </>
     );
}

export default Signup;