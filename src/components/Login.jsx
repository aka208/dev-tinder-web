import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          emailId,
          password,
        },
        // to set cookie we need to set withCredentials as true in frontend and cors config credentials as true in backend
        { withCredentials: true },
      );
      console.log("Logged In", res.data);
      const user = res.data;
      dispatch(addUser(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center my-50">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="my-2">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder=""
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className="my-2">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={() => onLoginClick()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
