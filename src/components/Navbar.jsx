import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import { Link } from "react-router-dom"; 
import styles from "../styles"; 
import Logo from "../assets/logo/logo-light.png"; 
import { IoLogOut } from "react-icons/io5"; 

function Navbar() {
  const location = useLocation(); 
  const [activeLink, setActiveLink] = useState(null); 

  useEffect(() => {
    if (location.pathname === "/admin") {
      setActiveLink("students");
    } else if (location.pathname === "/addAdmin") {
      setActiveLink("addAdmin");
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  return (
    <main className={`py-4 bg-primary`}>
      <div className={`${styles.wrapper} flex justify-between items-center text-white`}>
        <div className="flex-1">
          <img className="w-32 cursor-pointer" src={Logo} alt="Logo" />
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          {(location.pathname === "/admin" || location.pathname === "/addAdmin") && (
            <>
              <Link to={"/admin"}>
                <p
                  className={`hover:text-[#53e3d7] cursor-pointer transition duration-500 ${
                    activeLink === "students" ? "border-b-2 border-[#53e3d7]" : ""
                  }`}
                  onClick={() => setActiveLink("students")}
                >
                  Students
                </p>
              </Link>
              <Link to={"/addAdmin"}>
                <p
                  className={`hover:text-[#53e3d7] cursor-pointer transition duration-500 ${
                    activeLink === "addAdmin" ? "border-b-2 border-[#53e3d7]" : ""
                  }`}
                  onClick={() => setActiveLink("addAdmin")}
                >
                  Add Admin
                </p>
              </Link>
              <Link to={"/"}>
                <IoLogOut className="hover:text-[#53e3d7] cursor-pointer transition duration-500" size={23} />
              </Link>
            </>
          )}

          {location.pathname.startsWith("/studentideas") && (
            <>
              <Link to={"/admin"}>
                <p className="hover:text-[#53e3d7] cursor-pointer transition duration-500">Home</p>
              </Link>
              <Link to={"/addAdmin"}>
                <p className="hover:text-[#53e3d7] cursor-pointer transition duration-500">Add Admin</p>
              </Link>
              <Link to={"/"}>
                <IoLogOut className="hover:text-[#53e3d7] cursor-pointer transition duration-500" size={23} />
              </Link>
            </>
          )}

          {location.pathname === "/home" && (
            <>
              <Link to="/">
                <IoLogOut className="hover:text-[#53e3d7] cursor-pointer transition duration-500" size={23} />
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Navbar;
