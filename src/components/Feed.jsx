import React,{useEffect} from 'react';
import axios from 'axios';
import { BASE_URI } from '../utils/constants';
import UserCard from './UserCard';
import { useDispatch,useSelector } from 'react-redux';
import { addUser } from '../features/feed/feedSlice';

const Feed = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.feed);
    const fetchFeed = async() => {
        try {
            const response = await axios.get(BASE_URI + "/user/feed", {withCredentials:true});
            dispatch(addUser(response.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchFeed()
    },[])
    if (!user || user.length === 0) {
        return <p className='text-center'>No more users are available</p>
    }
  return (
    <div>
        {user && <UserCard user={user[0]}/>}
        
    </div>
  )
}

export default Feed