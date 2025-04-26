import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure you have axios installed
import {CheckCircle2,XCircle} from 'lucide-react'
import Navbar from "../components/Navbar";

import { NavLink } from "react-router-dom";


function Profile() {
    const [userProfile, setUserProfile] = useState(null); // State to store profile data
    const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch user profile data from API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage or cookies
        //console.log(token)
        const response = await axios.get("http://localhost:8000/user/get-userProfile", {
          headers: {
            Authorization:`brear ${token}`
          },
        });
        setUserProfile(response.data.userProfile); // Set the response data into state
        console.log(response.data)
        localStorage.setItem("ProfilePhoto",response.data.userProfile.profileImage)
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchUserProfile(); // Call the function when component mounts
  }, []);

  // If profile data is still loading, show loading spinner
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // If profile data is not available, show an error message
  if (!userProfile) {
    return <div className="error">Error fetching profile data.</div>;
  }

  return (
    <>
      <Navbar />
        <div className="p-5 max-w-[935px] mx-auto mt-0 font-sans transition-all duration-300 ease-in-out animate-fadeIn shadow-lg rounded-sm">
                <div className="flex flex-col lg:flex-row border-b border-gray-300 mb-0 items-end lg:items-start w-[90%] mx-auto lg:w-full">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center pt-2 w-full lg:w-[30%] mb-4 lg:mb-0">
                    <div className="w-[150px] h-[150px] rounded-full overflow-hidden shadow-md border border-gray-300">
                        <img
                        src={userProfile.profileImage || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        />
                    </div>
                    <NavLink to="/updateprofile/">
                        <button className="mt-2 bg-gray-50 border border-gray-300 text-gray-800 rounded px-3 py-1 text-sm font-semibold hover:bg-gray-300 transition-all duration-200">
                        Edit Profile
                        </button>
                    </NavLink>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 px-6 pt-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center mb-4 justify-center lg:justify-start">
                        <h2 className="text-2xl font-light text-gray-800 m-1">{userProfile.name || ""}</h2>
                        {userProfile.isVerified?<h className="text-green-700"><CheckCircle2/></h>:<h className="text-red-900"><XCircle/></h>}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center lg:justify-start mb-4 text-gray-800 text-sm lg:text-base">
                        <p className="mx-3">
                        <b>{userProfile.totalPosts || 0}</b> posts
                        </p>
                        <p className="mx-3">
                        <b>{userProfile.donations.length || 0}</b> Donations
                        </p>
                        <p className="mx-3">
                        <b>{userProfile.totalFollowing || 0}</b> following
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="text-sm lg:text-base text-gray-800 leading-relaxed">
                        <p className="font-semibold mb-1">{userProfile.email || ""}</p>
                        <p className="mb-1">{userProfile.role || "no skill added"}</p>
                        <p>{userProfile.description || "no description"}</p>
                    </div>
                    </div>
                </div>
        </div>
      </>
  )
}

export default Profile;