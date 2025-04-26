import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function CreateCommunity() {
    const [title,settitle]=useState("")
    const [description,setdescription]=useState("")
    const [goalAmount,setgoalAmount]=useState(0)
    const [tags,settag]=useState(0)
    const [imageUrl,setimageUrl]=useState(null)
    const [category,setcategory]=useState("")
    const formData = new FormData();
    const navigate=useNavigate()
 
    const handlefile=(e)=>{
        const curfile=e.target.files[0]
        console.log(curfile)
        setimageUrl(curfile)
        
        console.log(curfile)
    }
    const uplodedata=async(e)=>{
        e.preventDefault()
        formData.append("image", imageUrl);
        formData.append('title',title)
        formData.append('description',description)
        formData.append('goalAmount',goalAmount)
        formData.append('tags',tags)
        formData.append('category',category)


        try {
            let token=localStorage.getItem("token")
            if(!token){
                console.log("token not present")
            }
            else{
                let res=await axios.post("http://localhost:8000/community/create-community",formData,
                    {
                    headers:
                    {   "Content-Type": "multipart/form-data",
                        "Authorization":`Bearer ${token}`
                    }
                })
            
                console.log("Profile updated successfully:",res.data);
                alert("Community created  successfully!");
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            alert("Failed to update profile.")
        }
    }
    const donationCauseCategories = [
        "Education",
        "Child Welfare",
        "Orphan Support",
        "Women Empowerment",
        "Elderly Care",
        "Healthcare & Medical Aid",
        "Animal Welfare",
        "Environment & Sustainability",
        "Disaster Relief",
        "Poverty & Hunger",
        "Mental Health Support",
        "Rural Development",
        "Tribal Community Support",
        "Sanitation & Hygiene",
        "Disability Support",
        "Homeless Shelter",
        "Blood & Organ Donation",
        "Youth Skill Development",
        "Community Development",
        "Human Rights & Legal Aid"
      ]
    
    return ( 
        <>
            <Navbar/>
            <form onSubmit={uplodedata} className="flex flex-wrap p-5 shadow-xl  items-center justify-center bg-[#006A71] rounded-lg">
                <h1 className="text-center w-full text-lg font-semibold text-black">Create Community</h1>
                <input onChange={(e)=>settitle(e.target.value)} type="text" name="title" placeholder="Enter title" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <input onChange={(e)=>setdescription(e.target.value)} type="text" name="description" placeholder="Enter discription" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <input onChange={(e)=>setgoalAmount(Number(e.target.value))} type="number" name="goalAmount" placeholder="Enter Goal Amount" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-800"/>
                <input onChange={(e)=>settag((e.target.value).split(" "))} type="text" name="tags" placeholder="Enter tags" className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200 "/>
                <select 
                    class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700"
                    onChange={(e)=>setcategory(e.target.value)}
                >   
                    <option value="">Select Category</option>
                    {
                        donationCauseCategories.map((category)=>(
                            <option value={category}>{category}</option>
                        )
                        )
                    }
                    
                    
                </select>
                <input
                    className="bg-[#9ACBD0] p-2 my-2 w-full font-medium text-gray-900 rounded-lg text-center shadow-lg border-purple-200"
                    type="file"
                    onChange={handlefile}
                />
                <button type="submit" className="self-center p-2 border-purple-800 rounded-4xl font-bold  hover:border-transparent hover:bg-white  active:bg-purple-700 ">Create Community </button>
            </form>
            
        </>
    );
}

export default CreateCommunity;