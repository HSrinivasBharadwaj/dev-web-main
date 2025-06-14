import React from "react";
import { BASE_URI } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/feed/feedSlice";

const UserCard = ({user}) => {
    console.log("user",user)
    const dispatch = useDispatch();
    const {firstName,lastName,about,photoUrl,_id} = user
    const handleSendRequest = async(status,id) => {
      try {
        const response = await axios.post(BASE_URI + "/request/sendConnectionRequest/" + status + "/" + id, {},{
          withCredentials: true
        })
        dispatch(removeUser(id))
      } catch (error) {
          console.log("error",error)
      }
    }
  return (
    <div className="card w-96 my-10 shadow-sm flex justify-center items-center mx-auto bg-white text-black">
      <figure className="px-10 pt-10">
        <img
          src={photoUrl}
          alt="PhotoUrl"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>
          
        </p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => handleSendRequest("interested",_id)}>Interested</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
