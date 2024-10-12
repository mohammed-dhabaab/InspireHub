import styles from "../styles"
function Card({username , imgprofile ,title, description ,onEdit ,buttonText}) {
  return (
    <div className={`${styles.outerWrapper}`}>
<div
  className="relative rounded-lg -skew-x-6 -translate-y-2 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500
   w-72 h-44 p-2 bg-neutral-50 card-compact hover:bg-base-200 transition-all duration-200 [box-shadow:12px_12px_0px_0px_rgba(144,211,214,0.5)] hover:[box-shadow:4px_4px_0px_0px_rgba(144,211,214,0.5)] "
>
  <figure className="w-full h-full">
    <div
      alt="change to a img tag"
      className="bg-neutral-50 text-neutral-50 min-h-full rounded-lg border border-opacity-5"
    ></div>
  </figure >
  <div className="absolute text-neutral-800 bottom-4 left-0 px-4">
    <figure className="flex flex-wrap mb-7 ">
        <div className="flex items-center gap-2">
    <img className="w-10 h-10 rounded-full" src={`${imgprofile}`} alt="Rounded avatar"/>
    <p className={`${styles.paragraph4}`}>{username}</p>
    </div>
    <button onClick={onEdit} className=" text-black hover:text-green-600 hover: px-2 py-9 rounded ml-28 ">{buttonText}</button>
    </figure>

    <span className="font-bold">{title}</span>
    <p className="text-sm opacity-60 line-clamp-2">
        {description}
    
    </p>
  </div>
</div>

</div>
  )
}

export default Card