import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URI } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux'
import { addUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user)
  const fetchUser = async() => {
    try {
      const response = await axios.get(BASE_URI + "/profile/view",{
        withCredentials:true
      });
      dispatch(addUser(response.data.user))
    } catch (error) {
      if(error.status === 401) {
        navigate("/login")
      }
      console.log("error",error)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchUser()
    } 
  },[])
  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Body