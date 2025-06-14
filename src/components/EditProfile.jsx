import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const saveProfile = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.patch(BASE_URI + "/profile/edit", {
            firstName,
            lastName,
            about,
            photoUrl
        },{withCredentials:true})
        dispatch(addUser(response.data.data))
    } catch (error) {
        console.log("error",error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Edit Profile Form */}
        <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Edit Profile
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <input
                type="text"
                id="about"
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                name="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-4 py-2 mt-1 border text-black border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <button
                onClick={saveProfile}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Edit Profile
              </button>
            </div>
          </form>
        </div>

        {/* User Card */}
        <div className="w-full max-w-sm">
          {user && <UserCard user={{ firstName, lastName, about, photoUrl }} />}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
