// import React from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, photoUrl, gender, age } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Feed" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && <h2 className="card-title">{gender + " " + age}</h2>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleRequest("ignored");
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleRequest("interested");
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
