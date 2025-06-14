import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../features/connections/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URI + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connectionData) {
    return
  }
  if (connectionData.length === 0) {
    return <h1>No Connections found..</h1>
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Connections
      </h1>
      <div className="flex flex-col items-center flex-wrap justify-center gap-6">
        {connectionData.map((connection) => (
          <div
            key={connection.id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 w-full max-w-md"
          >
            {/* Left: Photo */}
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={connection.photoUrl}
                alt={connection.firstName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Right: Content */}
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {connection.firstName + connection.lastName}
              </h2>
              <h2 className="text-sm  text-gray-800">{connection.about}</h2>
              <p className="text-sm text-gray-600">{connection.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
