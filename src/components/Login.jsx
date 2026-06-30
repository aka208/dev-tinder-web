import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = async () => {
    setLoginForm(!loginForm);
  };

  const signUpClickHandler = async () => {
    try {
      const requestBody = { firstName, lastName, emailId, password };
      const res = await axios.post(`${BASE_URL}/signup`, requestBody, {
        withCredentials: true,
      });
      console.log(res);
      navigate("/login");
      setLoginForm(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      return navigate("/");
    } catch (err) {
      setError("Error while validating user!");
      console.log("Error", err);
    }
  };
  return (
    <div className="flex justify-center items-center my-50">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {loginForm ? "Login" : "Sign Up"}
          </h2>
          {!loginForm && (
            <>
              <div className="my-2">
                <label className="label">First Name</label>
                <input
                  type="email"
                  className="input"
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label className="label">Last Name</label>
                <input
                  type="email"
                  className="input"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
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
          <p className="text-red-500">{error}</p>
          <div className="card-actions m-auto my-2">
            <button
              className="btn btn-primary"
              onClick={() =>
                loginForm ? onLoginClick() : signUpClickHandler()
              }
            >
              {loginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div
            className="cursor-pointer m-auto hover:underline my-2"
            onClick={() => clickHandler()}
          >
            {loginForm ? "New User? Sign Up" : "Existing User Sign In"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
