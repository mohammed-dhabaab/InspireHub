import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../styles";
import Logo from "../assets/logo/logo-light.png";
import { IoLogOut } from "react-icons/io5";

function Navbar() {
  const location = useLocation();

  return (
    <main className={`py-4 bg-primary`}>
      <div
        className={`${styles.wrapper} flex justify-between items-center text-white `}
      >
        <div className="flex-1">
          <img className="w-32 cursor-pointer" src={Logo} alt="Logo" />
        </div>

        <div className="flex items-center space-x-4 ml-auto ">
          {location.pathname === "/admin" && (
            <>
              <Link to={"/studentideas"}>
                <p className="hover:text-[#53e3d7] cursor-pointer">Students</p>
              </Link>
              <Link to={"/"}>
                <IoLogOut
                  className="hover:text-[#53e3d7] cursor-pointer"
                  size={23}
                />
              </Link>
            </>
          )}

          {location.pathname === "/studentideas" && (
            <>
              <Link to={"/home"}>
                <p className="hover:text-[#53e3d7] cursor-pointer">Home</p>
              </Link>
              <Link to={"/"}>
                <IoLogOut
                  className="hover:text-[#53e3d7] cursor-pointer"
                  size={23}
                />
              </Link>
            </>
          )}
          {location.pathname === "/home" && (
            <>
              <Link to="/">
                <IoLogOut
                  className="hover:text-[#53e3d7] cursor-pointer"
                  size={23}
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Navbar;
