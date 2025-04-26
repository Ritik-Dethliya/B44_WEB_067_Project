import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function Community() {
    const {id}=useParams()
    const [community,setCommunity]=useState([])
    const navigate=useNavigate()
    useEffect(async()=>{
        try {
            let token=localStorage.getItem("token")
            let res= await axios.get(`http://localhost:8000/community/get-community/${id}`,{
                headers:{
                    Authorization:`Breaar ${token}`
                }
            })
            console.log(res.data)
            setCommunity(res.data.Community)

        } 
        catch (error) {
            console.log(error)
        }
        
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
            <div className={`h-80 bg-cover bg-center`}
                style={{ backgroundImage: `url(${community.imageUrl})` }}
            >
            </div>

            <div className="font-bold ">
                {community.description}
            </div>

            <button 
                className="shadow-lg rounded-sm border font-bold text-orange-500 border-orange-500 p-1 m-2 hover:text-red-700 hover:border-red-700">
                    <NavLink to={`/donate/${community._id}`}>Donate</NavLink>
            </button>
            
            <div className="grid grid-cols-2 gap-2 ">
                <div className="bg-orange-400 rounded-lg p-3">
                    <h3 className="text-lg font-bold">Goal</h3>
                    {community.goalAmount}Rs
                </div>
                <div className="bg-orange-400 rounded-lg p-3">
                <h3 className="text-lg font-bold">Achived</h3>
                    {community.collectedAmount}Rs
                </div>
            </div>
            <h1 className="w-full text-centre text-4xl font-bold my-2">OUR Donors</h1>
            <div className="grid grid-cols-2 gap-2 ">
                {community.donors && community.donors.map((donor)=>(
                    <div className="p-2 bg-green-400 rounded-sm">
                        {donor.email}
                        <br />
                        {donor.isVerified?"verifeed":"notverfied"}
                    </div>
                ))}
            </div>
        </>
     );
}

export default Community;