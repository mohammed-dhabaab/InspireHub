import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { PuffLoader } from 'react-spinners';
import searchForTerm from '../../utils/searchForTerm';
import { IoPersonRemove } from "react-icons/io5";
import { FcIdea } from "react-icons/fc";
import { PiStudentFill } from "react-icons/pi";

function StudentIdeas() {
    const { studentId } = useParams();
    const navigate = useNavigate()
    const [student, setStudent] = useState({})
    const [searchTerm, setSearchTerm] = useState("");
    const [studentIdeas, setStudentIdeas] = useState([]);
    const [filteredStudentIdeas, setFilteredStudentIdeas] = useState([]);
    const [showRejectionInputs, setShowReasonInputs] = useState({});
    const [reasonMessage, setReasonMessage] = useState("");
    const [ideaStatus, setIdeaStatus] = useState("");
    const [showCardSpinner, setShowCardSpinner] = useState({});

    const [editStatus, setEditStatus] = useState({});
    const [nameInput, setNameInput] = useState({});
    const [descriptionInput, setDescriptionInput] = useState({});
    const USER_LOCAL_STORGE = import.meta.env.VITE_USER_LOCAL_STORGE;

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORGE));
        if (!storedUser) {
          navigate("/");
        } else if (storedUser.role === "student") {
          navigate("/home");
        }
        
      }, []);


    const getStudentIdeas = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_IDEAS_API}`);
            const targetedStudentIdeas = response.data.filter(idea => idea.studentId === studentId);
            setStudentIdeas(targetedStudentIdeas);
            setFilteredStudentIdeas(targetedStudentIdeas);
        } catch (error) {
            console.error(error);
        }
    };

    const getStudent = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_USERS_API}/${studentId}`)
            const data = response.data
            setStudent(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudent()
        getStudentIdeas()
    }, [studentId])

    const deleteStudent = async () => {
        try {
            await Promise.all(studentIdeas.map(async (idea) => {
                const response = await axios.delete(`${import.meta.env.VITE_IDEAS_API}/${idea.id}`);
                if (response.status !== 200) {
                    throw new Error(`Failed to delete idea with ID ${idea.id}`);
                }
            }));

            const response = await axios.delete(`${import.meta.env.VITE_USERS_API}/${studentId}`);
            if (response.status === 200) {
                navigate("/admin");
            }
        } catch (error) {
            console.error('Error deleting student and/or associated ideas:', error);
        }
    };

    useEffect(() => {
        setFilteredStudentIdeas(searchForTerm(searchTerm, studentIdeas));
    }, [searchTerm, studentIdeas]);

    const setCardColor = (status) => {
        if (status === "Acceptable") return styles.acceptableCard;
        else if (status === "Rejected") return styles.rejectedCard;
        else if (status === "Edited") return styles.editedCard
        else return styles.newCard
    };

    const changeIdeaStatus = async (ideaId, status) => {
        try {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: true }));

            const ideaIndex = studentIdeas.findIndex(idea => idea.id === ideaId);
            if (ideaIndex !== -1) {
                const updatedIdea = {
                    ...studentIdeas[ideaIndex],
                    reason: reasonMessage,
                    status: ideaStatus
                };

                const newStudentIdeas = [
                    ...studentIdeas.slice(0, ideaIndex),
                    updatedIdea,
                    ...studentIdeas.slice(ideaIndex + 1)
                ];

                setStudentIdeas(newStudentIdeas);
                setFilteredStudentIdeas(newStudentIdeas);
                await axios.put(`${import.meta.env.VITE_IDEAS_API}/${ideaId}`, updatedIdea);
                toggleReasonInput(ideaId);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: false }));
        }
    };

    const editIdea = async (ideaId) => {
        try {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: true }));

            const ideaIndex = studentIdeas.findIndex(idea => idea.id === ideaId);
            if (ideaIndex !== -1) {

                const updatedIdea = {
                    ...studentIdeas[ideaIndex],
                    name: nameInput[ideaId],
                    description: descriptionInput[ideaId],
                    status: "Edited"
                };

                const newStudentIdeas = [
                    ...studentIdeas.slice(0, ideaIndex),
                    updatedIdea,
                    ...studentIdeas.slice(ideaIndex + 1)
                ];

                setStudentIdeas(newStudentIdeas);
                setFilteredStudentIdeas(newStudentIdeas);
                await axios.put(`${import.meta.env.VITE_IDEAS_API}/${ideaId}`, updatedIdea);

                setEditStatus(prevState => ({ ...prevState, [ideaId]: false }));
            }
        } catch (error) {
            console.error('Error updating idea:', error);
        } finally {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: false }));
        }
    };

    const toggleReasonInput = (ideaId) => {
        setShowReasonInputs(prevState => ({
            ...prevState,
            [ideaId]: !prevState[ideaId]
        }));
    };

    const deleteIdea = async (ideaId) => {
        try {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: true }));
            const response = await axios.delete(`${import.meta.env.VITE_IDEAS_API}/${ideaId}`);
            if (response.status === 200) {
                setStudentIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== ideaId));
                setFilteredStudentIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== ideaId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowCardSpinner(prevState => ({ ...prevState, [ideaId]: false }));
        }
    };

    const handleEditToggle = (ideaId) => {
        setEditStatus(prevState => ({
            ...prevState,
            [ideaId]: !prevState[ideaId]
        }));
        if (editStatus[ideaId]) {
            setNameInput(prevState => ({ ...prevState, [ideaId]: "" }));
            setDescriptionInput(prevState => ({ ...prevState, [ideaId]: "" }));
        } else {
            const ideaToEdit = studentIdeas.find(idea => idea.id === ideaId);
            setNameInput(prevState => ({ ...prevState, [ideaId]: ideaToEdit.name }));
            setDescriptionInput(prevState => ({ ...prevState, [ideaId]: ideaToEdit.description }));
        }
    };

    const statusTextColor = (status) => {
        if (status === "Acceptable") return "text-green-700 font-medium";
        else if (status === "Rejected") return "text-yellow-700 font-medium";
        else if (status === "Edited") return "text-blue-700 font-medium"
        else return "text-black font-medium";
    }

    return (
        <main className={`${styles.outerWrapper}`}>
            <div className={`${styles.wrapper} px-4`}>
                <div className='mb-10 flex justify-between items-center gap-1 '>
                    <div className='flex items-center gap-2'>
                        <div className='bg-gray-100 rounded-full p-3'>
                            <PiStudentFill className='w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px]' />
                        </div>
                        <h1 className={`${styles.heading2}`}>{student.name}</h1>
                    </div>
                    <IoPersonRemove onClick={deleteStudent} className={`cursor-pointer text-red-400 hover:text-red-600 w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] ${styles.transition500}`} />
                </div>
                <div className='mb-6 w-fit mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2'>
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full outline-none'
                        type="search"
                        placeholder='Search ideas...'
                    />
                    <IoIosSearch size={20} className='text-secondary-light-color ml-2' />
                </div>


                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {filteredStudentIdeas.length > 0 ? (
                        filteredStudentIdeas.map((idea) => (
                            <div key={idea.id} className={`${setCardColor(idea.status)} relative flex flex-col gap-4 p-4 shadow-md rounded-md`}>
                                <p className={`${statusTextColor(idea.status)}`}>{idea.status || "New"}</p>
                                <div>
                                    <div className='flex justify-between gap-1'>
                                        {!editStatus[idea.id] ? (
                                            <h3 className='mb-2 text-xl font-bold'>{idea.name}</h3>
                                        ) : (
                                            <input
                                                value={nameInput[idea.id] || ""}
                                                onChange={(e) => setNameInput(prevState => ({ ...prevState, [idea.id]: e.target.value }))}
                                                className='w-full mb-2 text-xl font-bold bg-transparent border-b border-gray-400 outline-none'
                                                placeholder='Idea Name'
                                            />
                                        )}
                                        <div onClick={() => handleEditToggle(idea.id)} className='cursor-pointer text-blue-400  hover:text-blue-500'>
                                            <FaEdit />
                                        </div>
                                    </div>
                                    {!editStatus[idea.id] ? (
                                        <p className='p-2'>{idea.description}</p>
                                    ) : (
                                        <textarea
                                            value={descriptionInput[idea.id] || ""}
                                            onChange={(e) => setDescriptionInput(prevState => ({ ...prevState, [idea.id]: e.target.value }))}
                                            className='w-full resize-none bg-transparent p-2 border-b border-gray-400 outline-none'
                                            placeholder='Idea Description'
                                        />
                                    )}
                                    {editStatus[idea.id] && (
                                        <div className='flex justify-end gap-2'>
                                            <button
                                                onClick={() => handleEditToggle(idea.id)}
                                                className={`${styles.cancelButton}`}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => editIdea(idea.id)}
                                                className={`${styles.confirmButton}`}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    )}
                                </div>


                                {idea.reason && (
                                    <div className='mt-6'>
                                        <p className='font-medium text-gray-600 mb-2'>Admin Comment</p>
                                        <p className='bg-gray-50 rounded-md p-2'>{idea.reason}</p>
                                    </div>
                                )}

                                {showRejectionInputs[idea.id] && (
                                    <div className='flex-grow gap-2 flex flex-col justify-end items-end'>
                                        <textarea
                                            value={reasonMessage}
                                            onChange={(e) => setReasonMessage(e.target.value)}
                                            className='w-full shadow-md resize-none px-2 py-1 rounded-md bg-slate-50 opacity-80 border border-gray-200 outline-none placeholder:text-gray-400'
                                            maxLength={80}
                                            rows={3}
                                            placeholder={`Comment`}
                                        />
                                        <div className='flex gap-2 justify-end'>
                                            <button
                                                onClick={() => toggleReasonInput(idea.id)}
                                                className={`${styles.cancelButton}`}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => changeIdeaStatus(idea.id, "Acceptable")}
                                                className={`${styles.confirmButton}`}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!showRejectionInputs[idea.id] && (
                                    <div className='mt-4 flex-grow flex justify-end items-end gap-4'>
                                        {idea.status === "Rejected" && (
                                            <button
                                                onClick={() => deleteIdea(idea.id)}
                                                className={`${styles.deleteButton}`}
                                            >
                                                Delete
                                                {showCardSpinner[idea.id] && <PuffLoader size={10} color="#fff" />}
                                            </button>
                                        )}
                                        {idea.status !== "Rejected" && (
                                            <button
                                                onClick={() => {
                                                    toggleReasonInput(idea.id);
                                                    setIdeaStatus("Rejected");
                                                }}
                                                className={`${styles.rejectButton} `}
                                            >
                                                Reject
                                            </button>
                                        )}
                                        {idea.status !== "Acceptable" && (
                                            <button
                                                onClick={() => {
                                                    toggleReasonInput(idea.id);
                                                    setIdeaStatus("Acceptable");
                                                }}
                                                className={`${styles.acceptButton}`}
                                            >
                                                Accept
                                            </button>
                                        )}

                                        {showCardSpinner[idea.id] && (
                                            <div>
                                                <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                                                    <PuffLoader size={10} color="#fff" />
                                                </div>
                                                <div className='absolute w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-md bg-gray-500 opacity-20'></div>
                                            </div>
                                        )}
                                    </div>
                                )}


                            </div>
                        ))
                    ) : (
                        <div className='w-full flex justify-center text-center '>
                            <p className='w-full text-center flex gap-2 items-center justify-center'><FcIdea className='-translate-y-1' size={24} /> No Ideas Found</p>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}

export default StudentIdeas;