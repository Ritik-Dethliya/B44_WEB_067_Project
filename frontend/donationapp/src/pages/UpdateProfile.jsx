import { useState } from "react";

import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function UpdateProfile() {
    const navigate=useNavigate()
    
    const [loading,setLoading]=useState(true)

    const [userProfile, setUserProfile] = useState({
        skills: "",
        userBio: "",
    });
    const profileImage=localStorage.getItem("ProfilePhoto")
    const [image, setImage] = useState(null); // Add state to store selected image

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the selected image file
        console.log(image)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to send both the profile data and image
        const formData = new FormData();
        formData.append("skills", userProfile.skills);
        formData.append("description", userProfile.userBio);
        if (image) {
            formData.append("image", image); // Append the selected image
        }

        try {
            const token = localStorage.getItem("token"); // Get token from local storage (adjust as needed)
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.post("http://localhost:8000/profile/upload/uufr", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization":`breare ${token}`, // Send the token in the Authorization header
                },
            });

            console.log("Profile updated successfully:", response.data);
            alert("Profile updated successfully!");
            
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    
    return (
        <>
        <Navbar/>
        <div className="flex flex-wrap  justify-center items-center p-2 ">
            <div className="profile-card flex flex-wrap gap-2 bg-black rounded-lg items-center justify-center p-2 lg:w-120 md:w-100 ">
                <h2 className="w-full text-centre text-white font-bold text-xl">Edit Profile</h2>

                {/* Profile Image Placeholder */}
                <div className=" flex profile-image w-full rounded-sm items-center justify-center text-center ">
                    {image ?
                    <img src={URL.createObjectURL(image)} alt="" className="w-80 h-60 rounded-sm object-fill lg:w-100 lg:h-80"/>:
                    <img src={profileImage} className="w-60 h-60 rounded-sm object-fill lg:w-100 lg:h-80"/>
                    }
                </div>

                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center items-center w-full">
                    <input
                        className="p-2 w-full my-1 rounded-sm font-bold text-xl shadow-sm text-black bg-white"
                        type="text"
                        name="skills"
                        id="skills"
                        placeholder="Enter Your Skills"
                        value={userProfile.skills}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-full p-2 my-1 rounded-sm font-bold text-xl shadow-sm text-black bg-white"
                        name="userBio"
                        id="userBio"
                        placeholder="Enter Bio"
                        maxLength={150}
                        value={userProfile.userBio}
                        onChange={handleChange}
                    />

                    {/* Input to select image */}
                    <input
                        className="w-full my-1 rounded-sm font-bold text-xl !text-center shadow-sm text-black bg-white"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <button
                     type="submit"
                      className="w-full my-1 rounded-sm font-bold text-xl shadow-sm text-white bg-blue-500"
                     >Update Profile</button>
                </form>
            </div>
        </div>
    </>
    );
}

export default UpdateProfile;
