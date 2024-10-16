import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles";

function AdminRegistration() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const upperRegex = /[A-Z]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const USER_LOCAL_STORGE = import.meta.env.VITE_USER_LOCAL_STORGE;
  const VITE_REGISTER_API = import.meta.env.VITE_REGISTER_API;


  const handleSignup = async (e) => {
    e.preventDefault();
    if (fullname.length <= 3) {
      setErrorMessage("Full Name must be more than 3 letters");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Email must be valid");
      return;
    }
    if (password.length <= 4 || !upperRegex.test(password)) {
      setErrorMessage(
        "Password must be more than 4 letters and contain one uppercase letter"
      );
      return;
    }
    setErrorMessage("");
    try {
      const response = await axios.post(VITE_REGISTER_API, {
        name: fullname,
        email: email,
        password: password,
        numberOfIdeas: 0,
        role: "admin",
      });
      console.log(response)
      if (response.status === 201) {
        clear();
        setSuccessMessage(
          `${fullname} have been registerd as a new admin`
        );

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('The email is already being used');
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, fullname]);

  const clear = () => {
    setFullname("");
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORGE));

    if (!storedUser || !storedUser.user) {
      navigate("/");
    } else if (storedUser.user.role !== "admin") {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <div
          className={`w-[37%] h-[78%] bg-[#eeecec] rounded-lg py-4 flex flex-col justify-center items-center 
         max-md:w-[85%] max-md:h-[72%] `}
        >
          <div className="flex flex-col justify-start items-center w-full ">
            <form
              className={`flex flex-col justify-center w-[70%] p-4 max-md:w-[80%]`}
              onSubmit={handleSignup}
            >
              <h1
                className={`${styles.heading3} text-primary text-center mb-4`}
              >
                Add Admin
              </h1>
              {successMessage && (
                <div className="text-green-500 mb-2">{successMessage}</div>
              )}
              <div>
                <label htmlFor="fullname" className="inputLabel">
                  Full Name
                </label>
                <input
                  className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                  id="fullname"
                  type="text"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="my-2 ">
                <label htmlFor="email" className="inputLabel">
                  Email
                </label>
                <input
                  className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="inputLabel">
                  Password
                </label>
                <input
                  className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="pt-5"></div>
              {errorMessage && (
                <div className="text-red-500 mb-2">{errorMessage}</div>
              )}
              <div className="flex justify-center items-center">
                <button
                  className={`${styles.transition500} w-full rounded-full border-2 border-solid border-primary text-primary hover:bg-primary hover:text-white  font-bold py-2 px-4 focus:outline-none`}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistration;
