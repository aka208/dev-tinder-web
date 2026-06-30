import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const requestReviewHandler = (status, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      console.log(res);
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="flex my-10 justify-center">No requests found</h1>;
  return (
    <div className="flex flex-col justify-center my-10 text-center">
      <h1 className="font-bold text-2xl">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, about, age, gender } =
          request.fromUserId;
        return (
          <div className="flex bg-base-300 rounded-2xl w-2/3 justify-left m-4 p-4 mx-auto">
            <div>
              <img alt="" src={photoUrl} className="w-20 h-20 rounded-b-full" />
            </div>
            <div className="mx-10 text-left">
              <p className="font-bold">{firstName + " " + lastName}</p>
              {age && gender && (
                <p>
                  {age}, {gender}
                </p>
              )}
              <p>{about}</p>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => requestReviewHandler("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => requestReviewHandler("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
