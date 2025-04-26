import { NavLink } from "react-router-dom";
import {Home,LogIn,Menu} from 'lucide-react'
import { useContext, useState } from "react";
import { communitiesContext } from "../ContextApi/CommunityContext";
function Navbar() {
    const [isOpen,setIsOpen]=useState(false)
    const {isLogin,isSign}=useContext(communitiesContext)
    return ( 
    <>
        <nav className="flex items-center justify-between shadow-sm rounded-sm p-4 bg-white">
      <div className="font-bold text-xl">Donation</div>
      <div
        className={`flex-col md:flex md:flex-row md:items-center w-full md:w-auto ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <NavLink to="/" className="p-2 font-bold block md:inline-block">
          Home
        </NavLink>

        <NavLink to="/communities" className="p-2 font-bold block md:inline-block">
          Community
        </NavLink>

        <NavLink to="/createcommunity" className="p-2 font-bold block md:inline-block">
          Create Community
        </NavLink>

        <NavLink to="/userprofile" className="p-2 font-bold block md:inline-block">
          Profile
        </NavLink>

        <NavLink to="/communities" className="p-2 font-bold block md:inline-block">
          Donation
        </NavLink>

        {!isLogin && (
          <NavLink to="/login" className="p-2 font-bold block md:inline-block">
            Login
          </NavLink>
        )}

        {!isSign && (
          <NavLink to="/signup" className="p-2 font-bold block md:inline-block">
            Sign
          </NavLink>
        )}
      </div>
      <button
        className="md:hidden text-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
    </nav>
    </>
     );
}

export default Navbar;