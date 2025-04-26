import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { communitiesContext } from "../ContextApi/CommunityContext";

function DonationCommunity() {
    const {communities}=useContext(communitiesContext)
    const navigate=useNavigate()
    //console.log(communities)
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
                {communities.map((community)=>(
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
            </div>

        </>
     );
}

export default DonationCommunity;