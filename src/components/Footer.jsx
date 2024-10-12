import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons
import LogoDark from "../assets/logo/logo-light.png";
import DiscordIcon from "../assets/Foot-image/discord-icon.png";
import TwitterIcon from "../assets/Foot-image/twitter-icon.png";
import LinkedinIcon from "../assets/Foot-image/linkedin-icon.png";
import SnapchatIcon from "../assets/Foot-image/snapchat-icon.png";
import YoutubeIcon from "../assets/Foot-image/youtube-icon.png";
import LogoCompanyIcon from "../assets/Foot-image/Logo-1.png";

import styles from "../styles";

function Footer() {
  return (
    <footer className="py-24 md:py-16 h-auto bg-primary relative top-24">
      <div
        className={`${styles.wrapper} flex flex-col md:flex-row justify-between items-center`}
      >
        <div className="flex justify-center mb-4 md:mb-0">
          <img className="w-64" src={LogoDark} alt="Logo" />
        </div>
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <ul
            className={`flex space-x-4 md:space-x-4 mt-5 ${styles.mainTransition} rounded-full`}
          >
            <li>
              <Link
                to="https://discord.com/invite/DWpUH7wFxj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 transition-transform transform hover:scale-110"
                  src={DiscordIcon}
                  alt="Discord"
                />
              </Link>
            </li>
            <li>
              <Link
                to="https://x.com/tuwaiqacademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 transition-transform transform hover:scale-110"
                  src={TwitterIcon}
                  alt="Twitter"
                />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.youtube.com/@TuwaiqAcademy_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 transition-transform transform hover:scale-110"
                  src={YoutubeIcon}
                  alt="YouTube"
                />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.snapchat.com/add/tuwaiqacademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 transition-transform transform hover:scale-110"
                  src={SnapchatIcon}
                  alt="Snapchat"
                />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/company/tuwaiqacademy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-6 transition-transform transform hover:scale-110"
                  src={LinkedinIcon}
                  alt="LinkedIn"
                />
              </Link>
            </li>
          </ul>
          <div>
            <p className="text-white block">TuwaiqAcademy</p>
          </div>
        </div>
        <div className="flex justify-center">
          <img className="w-64" src={LogoCompanyIcon} alt="Company Logo" />
        </div>
      </div>

      <div className="flex items-center justify-center text-white mt-8">
        <Link
          className="mr-2"
          to="https://github.com/mohammed-dhabaab/InspireHub/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-6 h-6 text-white" />
        </Link>
        <p className="block mr-2">جميع الحقوق محفوظة لنا 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
