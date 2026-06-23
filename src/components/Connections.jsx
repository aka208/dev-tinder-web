// import React from 'react'

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connectionsFromStore = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsFromStore) return;
  if (connectionsFromStore.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="flex flex-col justify-center my-10 text-center">
      <h1 className="font-bold text-2xl">Connections</h1>
      {connectionsFromStore.map((connection) => {
        const { firstName, lastName, photoUrl, about, age, gender } =
          connection;
        return (
          <div className="flex bg-base-300 rounded-2xl w-1/2 justify-left m-4 p-4 mx-auto">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
