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
        className={`${styles.wrapper} flex justify-between items-center text-white cursor-pointer`}
      >
        
        <div className="flex-1">
          <img className="w-32" src={Logo} alt="Logo" />
        </div>

     
        <div className="flex items-center space-x-4 ml-auto ">
          {location.pathname === "/admin" && (
            <>
              <Link to={"/studentideas"}>

              <p className="hover:text-[#53e3d7]">Students</p>

              </Link>
              <Link to={"/"}>

              <IoLogOut className="hover:text-[#53e3d7]" size={23} />

              </Link>
            </>
          )}

          {location.pathname === "/studentideas" && (
            <>

            <Link to={"/Home"}>

            <p className="hover:text-[#53e3d7]">Home</p>

            </Link>
              
              <Link to={"/"}>

              <IoLogOut className="hover:text-[#53e3d7]" size={23} />

              </Link>


            </>
          )}

          {location.pathname === "/home" && (
            <>
              
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Navbar;
