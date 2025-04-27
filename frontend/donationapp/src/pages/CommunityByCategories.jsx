import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { communitiesContext } from "../ContextApi/CommunityContext";

function CommunityCategory() {
    const {category}=useParams()
    const [communities,setCommunity]=useState([])
    const navigate=useNavigate()
    const getCommunity=async()=>{
        try {
            let token=localStorage.getItem("token")
            let res= await axios.get(`https://b44-web-067-project-cowardfunding.onrender.com/community/get-community/category/${category}`,{
                headers:{
                    Authorization:`Breaar ${token}`
                }
            })
            console.log(res.data)
            setCommunity(res.data.Communities)

        } 
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCommunity()
    },[])
    return ( 
        <>
            <Navbar/>
            <button
              style={{
                backgroundImage:"url('https://static.vecteezy.com/system/resources/thumbnails/006/692/321/small_2x/chatting-message-icon-template-black-color-editable-chatting-message-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '70px',
                width: '70px',
                position:"fixed",
                bottom:"10%",
                right:"0",
                marginTop:"10px"
                }}
                onClick={()=>navigate('/aiChat')}
                className="rounded-full"
            ></button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {communities && communities.map((community)=>(
                    <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-6">
                    <div className="space-y-4">
                        <img src={community.imageUrl} alt="this is a image" />
                        <h2 className="text-2xl font-bold text-gray-800">{community.title}</h2>
                        <p className="text-gray-600">
                        {community.description}
                        </p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                            <NavLink to={`/community/${community._id}`}>More Details</NavLink>
                        </button>
                    </div>
                    </div>
                ))}
                {communities.length<1?
                    <div className="flex justify-center items-center w-full h-80  m-1">
                        <h1 className=" text-3xl text-black font-bold">
                            No Donation Commnunity in This Category
                        </h1>
                    </div>:""
                }        
            </div>

        </>
     );
}

export default CommunityCategory;