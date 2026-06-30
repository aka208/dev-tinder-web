import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const updateProfileHandler = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center items-center mx-10 gap-4">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div className="my-2">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="label">Age</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="label">Gender</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="label">Photo Url</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="label">About</label>
              <input
                type="text"
                className="input"
                placeholder=""
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="card-actions justify-center my-2">
              <button
                className="btn btn-primary"
                onClick={() => updateProfileHandler()}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
