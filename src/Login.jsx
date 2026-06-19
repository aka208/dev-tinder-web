import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async () => {
    try {
      const data = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        // to set cookie we need to set withCredentials as true in frontend and cors config credentials as true in backend
        { withCredentials: true },
      );
      console.log("Logged In", data);
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
