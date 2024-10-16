import React from 'react'
import { FaEdit } from 'react-icons/fa'
import styles from '../../styles';

function IdeaCard({ username, title, description, reason, onEdit, buttonText, status, isUserCard }) {

    const setCardColor = (status) => {
        if (status === "Acceptable") return styles.acceptableCard;
        else if (status === "Rejected") return styles.rejectedCard;
        else if (status === "Edited") return styles.editedCard
        else return styles.newCard
    };

    const statusTextColor = (status) => {
        if (status === "Acceptable") return "text-green-700 font-medium";
        else if (status === "Rejected") return "text-yellow-700 font-medium";
        else if (status === "Edited") return "text-blue-700 font-medium"
        else return "text-black font-medium";
    }

    return (
        <div className={`${setCardColor(status)} relative flex flex-col gap-4 p-4 shadow-md rounded-md`}>
            <p className={`${statusTextColor(status)}`}>{status || "New"}</p>
            <div>
                <div className='flex justify-between gap-1'>
                    <h3 className='mb-2 text-xl font-bold'>{title}</h3>
                    <div onClick={onEdit} className='cursor-pointer text-blue-400  hover:text-blue-500'>
                        <FaEdit />
                    </div>
                </div>

                <p className='p-2 break-words'>{description}</p>
                {/* {!editStatus[idea._id] ? (
                    <p className='p-2'>{idea.description}</p>
                ) : (
                    <textarea
                        value={descriptionInput[idea._id] || ""}
                        onChange={(e) => setDescriptionInput(prevState => ({ ...prevState, [idea._id]: e.target.value }))}
                        className='w-full resize-none bg-transparent p-2 border-b border-gray-400 outline-none'
                        placeholder='Idea Description'
                    />
                )}
                {editStatus[idea._id] && (
                    <div className='flex justify-end gap-2'>
                        <button
                            onClick={() => handleEditToggle(idea._id)}
                            className={`${styles.cancelButton}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => editIdea(idea._id)}
                            className={`${styles.confirmButton}`}
                        >
                            Confirm
                        </button>
                    </div>
                )} */}
            </div>


            {reason && (
                <div className='mt-6'>
                    <p className='font-medium text-gray-600 mb-2'>Admin Comment</p>
                    <p className='bg-gray-50 rounded-md p-2 break-words'>{reason}</p>
                </div>
            )}

        </div>
    )
}

export default IdeaCard