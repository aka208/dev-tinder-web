// import React from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feeds) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feeds) return;
  if (feeds.length === 0)
    return <h1 className="flex justify-center my-10">No new users</h1>;
  return (
    <div className="flex justify-center my-10">
      {feeds && <UserCard user={feeds[0]} />}
    </div>
  );
};

export default Feed;
