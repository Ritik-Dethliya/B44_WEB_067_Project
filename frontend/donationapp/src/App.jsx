import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import DonationPage from './pages/DonationPage'
import DonationCommunity from './pages/DomationCommunity'
import Community from './pages/Community'
import CreateCommunity from './pages/CreateCommunity'
import UpdateProfile from './pages/UpdateProfile'
import Profile from './pages/userProfilePage'
import CommunityCategory from './pages/CommunityByCategories'
import Chat from './components/chat'
function App() {
  

  return (
    <div className="">
      
      <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/updateprofile' element={<UpdateProfile/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/donate/:id' element={<DonationPage/>} />
        <Route path='communities' element={<DonationCommunity/>}/>
        <Route path='/community/:id' element={<Community/>}/>
        <Route path='/createcommunity' element={<CreateCommunity/>}/>
        <Route path='/userprofile' element={<Profile/>}/>
        <Route path='/communitycategory/:category' element={<CommunityCategory/>}/>
        <Route path='/aiChat' element={<Chat/>}/>
      </Routes>
      
    </div>
  )
}

export default App
