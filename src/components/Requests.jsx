import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URI } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequests } from "../features/requests/requestSlice";


const Requests = () => {
  const requests = useSelector((state) => state.requests);
  console.log(requests)
  const dispatch = useDispatch();

  const reviewRequests = async (status, id) => {
    try {
      const response = await axios.post(
        BASE_URI + "/request/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequests(id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URI + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.fetchConnectionRequests));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-gray-700">
          No Requests Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Connection Requests
      </h1>
      <div className="flex flex-col items-center flex-wrap justify-center gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="flex items-center bg-white shadow-md rounded-lg p-4 w-full max-w-md"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={
                  request.fromUserId.photoUrl ||
                  "https://via.placeholder.com/150"
                }
                alt={
                  request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName
                }
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName}
              </h2>
              <p className="text-sm text-gray-600">
                {request.fromUserId.about}
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => reviewRequests("accepted", request._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => reviewRequests("rejected", request._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
