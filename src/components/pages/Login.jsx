import axios from "axios";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import config from "../../config/config";
import { isAuthenticated, setToken } from "../../utilities/auth";

const Login = () => {
  document.title = `Login | PUCShop`;
  // const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const isDataValid = () => {
    let result = true;
    let tempErrors = {};
    const formData = { ...data };
    if (!formData.email) {
      tempErrors.email = "Email is required";
      result = false;
    } else {
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Invalid email address";
        result = false;
      } else {
        tempErrors.email = "";
      }
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
      result = false;
    } else {
      tempErrors.password = "";
    }
    setErrors({ ...tempErrors });
    return result;
  };
  const submitForm = () => {
    if (isDataValid()) {
      // console.log("success");
      axios
        .post(`${config.SERVER_URL}/api/user`, data)
        .then((res) => {
          // console.log(res.data.data);
          if (setToken(res.data.data)) {
            // navigate("/");
            // window.location.reload();
            window.location.href = "./";
          } else {
            setErrors({ response: "Invalid email or password!" });
          }
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          setErrors({ response: error.response.data.message });
        });
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col space-y-4 mx-auto w-[22rem] md:w-96  p-5 rounded-md bg-white/80 backdrop-blur-lg shadow-lg">
          <div className="flex justify-center">
            <h1 className="font-medium text-xl">ACCOUNT LOGIN</h1>
          </div>
          <div>
            <div className="flex justify-center">
              {errors.response && (
                <p className="text-red-500 p-1">{errors.response}</p>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="username@mail.com"
                />
                <p className="text-sm font-medium text-red-500">
                  {errors.email}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="password"
                />
                <p className="text-sm font-medium text-red-500">
                  {errors.password}
                </p>
                <a
                  className="text-sm font-medium text-blue-500 hover:text-indigo-500"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                onClick={submitForm}
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500  to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
};

export default Login;
