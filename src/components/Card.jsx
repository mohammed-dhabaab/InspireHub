import styles from "../styles"
import defaultUserPc from "../assets/register/defaultUserPc.png"
import { FaUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";

function Card({ idea, username, imgprofile, title, description, reason, onEdit, buttonText, status, isUserCard }) {
  useEffect(() => {
    console.log(idea)
  })
  const statusStyles = {
    Acceptable: {
      //   background: "bg-green-200",
      boxShadow: "[box-shadow:12px_12px_0px_0px_rgba(187,247,133,0.5)]",
      hoverBoxShadow: "hover:[box-shadow:4px_4px_0px_0px_rgba(144,211,214,0.5)]"
    },
    Rejected: {
      //   background: "bg-red-50",
      boxShadow: "[box-shadow:12px_12px_0px_0px_rgba(250,204,21,0.5)]",
      hoverBoxShadow: "hover:[box-shadow:4px_4px_0px_0px_rgba(255,0,0,0.5)]"
    },
    Edited: {
      //   background: "bg-blue-200",
      boxShadow: "[box-shadow:12px_12px_0px_0px_rgba(125,211,252,0.5)]",
      hoverBoxShadow: "hover:[box-shadow:4px_4px_0px_0px_rgba(255,255,0,0.5)]"
    },
    default: {
      //   background: "bg-gray-50",
      boxShadow: "[box-shadow:12px_12px_0px_0px_rgba(240,240,240,0.5)]",
      hoverBoxShadow: "hover:[box-shadow:4px_4px_0px_0px_rgba(0,0,0,0.5)]"
    },
  };
  const { boxShadow, hoverBoxShadow } = statusStyles[status] || statusStyles.default
  return (
    <div className={`${styles.outerWrapper}`}>
      <div
        className={`relative rounded-lg -skew-x-6 -translate-y-2 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500
     w-80 h-56 p-2 bg-neutral-50 card-compact hover:bg-base-200 transition-all duration-200 ${boxShadow} ${hoverBoxShadow} `}
      >
        <figure className="w-full h-full ">
          <div
            alt="change to a img tag"
            className="bg-neutral-50 text-neutral-50 min-h-full rounded-lg border border-opacity-5"
          ></div>
        </figure >
        <div className="absolute text-neutral-800 bottom-4 left-0 px-4 flex flex-col w-full h-full">
          <figure className="flex flex-wrap justify-between">
            <div className={`text-neutral-800 px-4 ${isUserCard ? 'pt-4':'pt-8'} flex items-center `}>
              <img className="w-10 h-10 rounded-full" src={`${defaultUserPc}`} alt="Rounded avatar" />
              <p className={`${styles.paragraph4}`}>{username}</p>
            </div>
            {isUserCard ?
              (
                <button onClick={onEdit} className=" text-black hover:text-green-600 hover: px-2 py-9 rounded  ">{buttonText}</button>

              )
              : null}
            {/* <button onClick={onEdit} className=" text-black hover:text-green-600 hover: px-2 py-9 rounded  ">{buttonText}</button> */}
          </figure>

          <span className="font-bold break-words">{title}</span>
          <p className="text-sm opacity-60 line-clamp-6 overflow-hidden break-words">
            {description}

          </p>
          {reason && (
            <p className="text-sm line-clamp-2">
              <span className="font-bold text-lg">Reasone:</span>
              <br />
              {reason}

            </p>
          )}

        </div>
      </div>

    </div>

  )
}

export default Card