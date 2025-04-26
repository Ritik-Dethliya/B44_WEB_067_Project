import { LogIn, Home, User, Settings,Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {useState} from 'react'

const Aside = () => {
    const [Open,setOpen]=useState(true)
  return (
    Open ?
    <aside className="absolute  bg-white w-64 h-screen p-4 shadow-lg">
        <Menu onClick={()=>setOpen(!Open)}/>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <Home className="w-5 h-5" />
          Home
        </NavLink>

        <NavLink
          to="/login"
          className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <LogIn className="w-5 h-5" />
          Login
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <User className="w-5 h-5" />
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 p-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>
    </aside>:""
  );
};

export default Aside;
