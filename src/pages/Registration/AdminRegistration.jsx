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
  const apiUrl = "https://670941a3af1a3998baa0ec5c.mockapi.io/users";
  const navigate = useNavigate();
  const upperRegex = /[A-Z]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignin = async (e) => {
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
      const response = await axios.get(apiUrl);
      const users = response.data;
      const userExists = users.some((ele) => ele.email === email);

      if (!userExists) {
        const newUserResponse = await axios.post(apiUrl, {
          name: fullname,
          email: email,
          password: password,
          numberOfIdeas: [],
          role: "admin",
        });
        clear();
        setSuccessMessage(
          `${newUserResponse.data.name} have been registerd as a new admin`
        );
      } else {
        setErrorMessage("The email is already being used");
      }
    } catch (error) {
      setErrorMessage("Something went wrong, please try again later");
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

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-secondary to-primary">
        <div
          className={`w-[37%] h-[78%] bg-[#eeecec] rounded-lg py-4 flex flex-col justify-center items-center 
         max-md:w-[85%] max-md:h-[85%] `}
        >
          <div className="flex flex-col justify-start items-center w-full h-[90%]">
            <form
              className={`w-[70%] p-4 max-md:w-[80%]`}
              onSubmit={handleSignin}
            >
              <h1
                className={`${styles.heading4} text-primary text-center mb-4`}
              >
                Add an Admin
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
              <div>
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
                  password
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
                  className="w-full rounded-md bg-[#4e3497] hover:bg-secondary-light-color hover:text-[#4e3497] text-white font-bold py-2 px-4 focus:outline-none "
                  type="submit"
                >
                  Sign in
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
