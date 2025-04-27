import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
function DonationPage() {
    const navigate=useNavigate()
    const {id}=useParams()
    const [donateCommunity,setdonateCommunity]=useState([])
    const [message,setMessage]=useState("")
    const [amount,setAmount]=useState(0)
    let token=localStorage.getItem("token")

    const getCommunity=async()=>{
      try {
                  let token=localStorage.getItem("token")
                  let res= await axios.get(`http://localhost:8000/community/get-community/${id}`,{
                      headers:{
                          Authorization:`Breaar ${token}`
                      }
                  })
                  console.log(res.data)
                  setdonateCommunity(res.data.Community)
      
              } 
              catch (error) {
                  console.log(error)
              }
    }
    useEffect(()=>{
      getCommunity()
    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log("send request")
        try{
            let res=await axios.post(`https://b44-web-067-project-cowardfunding.onrender.com/donation/add-donation/${id}`,{
                message,
                amount,
                transactionId:Math.random(),
                paymentMethod:"upi",
                status:"completed"
            },
            {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, 
                },
              }
            )
            console.log(res.data)
            if(res.status==201){
              alert(`Congratulation You help ${donateCommunity.title}`)
            }
        }
        catch(error){
            alert("Something went Wrong ")
            console.log("error in donation",error)
        }
        navigate('/')
    }
    return ( 
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="max-w-md w-full shadow-2xl p-6 rounded-2xl bg-white">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">{donateCommunity.title}</h1>
          <p className="text-gray-600 text-center">
          </p>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Donar Message</label>
            <input
                onChange={(e)=>setMessage(e.target.value)}
              id="msg"
              placeholder={`Enter your Message To ${donateCommunity.title}..`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Donation Amount</label>
            <input
                onChange={(e)=>setAmount(Number(e.target.value))}
              id="amount"
              type="number"
              placeholder="Enter amount in ₹"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
            Donate Now
          </button>
        </div>
      </div>
    </div>
        </>
    );
}

export default DonationPage;