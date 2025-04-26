import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {Heart,CreditCard,Package} from 'lucide-react'
import Footer from "../components/Footer";
function Home() {
  const navigate=useNavigate()
    const donationCauseCategories = [
        {
          name: "Education",
          description: "Support quality education for underprivileged children and adults. Help build schools, provide books, and sponsor fees."
        },
        {
          name: "Child Welfare",
          description: "Ensure the safety, nutrition, and well-being of children. Fund childcare programs, safety initiatives, and basic needs."
        },
        {
          name: "Orphan Support",
          description: "Assist orphaned children with shelter, food, education, and emotional support through trusted care programs."
        },
        {
          name: "Women Empowerment",
          description: "Empower women through education, skill training, health care, and support against domestic violence."
        },
        {
          name: "Elderly Care",
          description: "Help provide a dignified life to the elderly with medical care, companionship, and support for old age homes."
        },
        {
          name: "Healthcare & Medical Aid",
          description: "Fund treatments, surgeries, and medical camps for those who cannot afford essential healthcare services."
        },
        {
          name: "Animal Welfare",
          description: "Protect stray and injured animals with rescue services, vaccinations, shelter, and adoption programs."
        },
        {
          name: "Environment & Sustainability",
          description: "Contribute to tree plantation, clean water, waste management, and renewable energy efforts for a greener planet."
        },
        {
          name: "Disaster Relief",
          description: "Provide emergency aid, food, shelter, and medical support to those affected by natural disasters or crises."
        },
        {
          name: "Poverty & Hunger",
          description: "Fight hunger and poverty by donating food, clothing, and basic needs to families living below the poverty line."
        },
        {
          name: "Mental Health Support",
          description: "Support access to counseling, therapy, and mental health awareness for individuals in need."
        },
        {
          name: "Rural Development",
          description: "Help improve infrastructure, education, and health services in remote and rural communities."
        },
        {
          name: "Tribal Community Support",
          description: "Assist tribal populations with healthcare, education, clean water, and livelihood training."
        },
        {
          name: "Sanitation & Hygiene",
          description: "Fund toilets, hygiene kits, menstrual awareness, and clean water access in underserved areas."
        },
        {
          name: "Disability Support",
          description: "Provide mobility aids, learning tools, therapy, and inclusive opportunities for people with disabilities."
        },
        {
          name: "Homeless Shelter",
          description: "Offer food, clothing, and a safe place to stay for individuals and families without a home."
        },
        {
          name: "Blood & Organ Donation",
          description: "Encourage and support blood, eye, and organ donation drives to save lives."
        },
        {
          name: "Youth Skill Development",
          description: "Enable youth with technical skills, job training, and career guidance to build a better future."
        },
        {
          name: "Community Development",
          description: "Fund projects that uplift entire communities—like building schools, clinics, or roads."
        },
        {
          name: "Human Rights & Legal Aid",
          description: "Support marginalized communities with legal help, human rights advocacy, and social justice initiatives."
        }
      ];
      
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
            >

            </button>
            <div className="p-2">
                <div className="shadow-2xl bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7rs7cSEIfvS0yq8DJukC_B-zjdeRwG-jUw&s')] bg-cover bg-center h-100 p-2
                ">

                </div>
                <div className="container">
                    <button className="shadow-lg rounded-sm border font-bold text-orange-500 border-orange-500 p-1 m-2 hover:text-red-700 hover:border-red-700">Donate</button>
                    <button className="shadow-lg rounded-sm border font-bold text-orange-500 border-orange-500 p-1 m-2 hover:text-red-700 hover:border-red-700" >Community</button>
                </div>
                <div className="grid grid-cols-3 gap-4 ">
 
                {donationCauseCategories.map((category)=>(
                    <NavLink to={`/communitycategory/${category.name.replace(' ',"%20")}`}>
                        <div className="bg-orange-400 p-4 rounded-lg text-sm ">
                            <h1 className="flex w-full p-1 font-bold gap-2 my-2"> <Heart/>{category.name}</h1>

                            {category.description}
                            
                        </div>
                    </NavLink>
                ))
                }
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;