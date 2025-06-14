import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";


const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Edit Profile Section */}
        <div className="w-full">
          {user && <EditProfile user={user} />}
        </div>
    </div>
  );
};

export default Profile;
