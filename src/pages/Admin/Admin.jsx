import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FcIdea } from "react-icons/fc";
import { IoPersonRemove } from "react-icons/io5";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";
import DeleteModel from "../../components/DeleteModel";

function Admin() {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentIdToRemove, setStudentIdToRemove] = useState(null);
  const navigate = useNavigate();
  const USER_LOCAL_STORGE = import.meta.env.VITE_USER_LOCAL_STORGE;

  const userApiUrl = import.meta.env.VITE_USERS_API;
  const ideasApiUrl = import.meta.env.VITE_IDEAS_API;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORGE));

    if (!storedUser || !storedUser.user) {
      navigate("/");
    } else if (storedUser.user.role !== "admin") {
      navigate("/home");
    }
  }, []);

  const USER_Token = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_LOCAL_STORGE)).token;


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(userApiUrl, { headers: { Authorization: `Bearer ${USER_Token}` } });
        setStudents(response.data.filter((student) => student.role === "student"));
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/");
        }
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [userApiUrl]);

  // const handleRemove = async (id) => {
  //   try {
  //     await axios.delete(`${userApiUrl}/${id}`, { headers: { Authorization: `Bearer ${USER_Token}` } });

  //     const ideasResponse = await axios.get(ideasApiUrl, { headers: { Authorization: `Bearer ${USER_Token}` } });
  //     const ideas = ideasResponse.data;
  //     const studentIdeas = ideas.filter((idea) => idea.studentId === id);
  //     await Promise.all(
  //       studentIdeas.map(async (idea) => {
  //         await axios.delete(`${ideasApiUrl}/${idea.id}`, { headers: { Authorization: `Bearer ${USER_Token}` } });
  //       })
  //     );

  //     setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
  //   } catch (error) {
  //     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
  //       navigate("/");
  //     }
  //     console.error("Error removing student and ideas:", error);
  //   }
  // };

  const deleteStudent = async (studentId) => {
    try {
      const ideasResponse = await axios.get(ideasApiUrl, { headers: { Authorization: `Bearer ${USER_Token}` } });
      const ideas = ideasResponse.data;
      const studentIdeas = ideas.filter((idea) => idea.studentId === studentId);

      await Promise.all(studentIdeas.map(async (idea) => {
        const response = await axios.delete(`${import.meta.env.VITE_IDEAS_API}/${idea._id}`, { headers: { Authorization: `Bearer ${USER_Token}` } });
        if (response.status !== 200) {
          throw new Error(`Failed to delete idea with ID ${idea._id}`);
        }
      }));

      const response = await axios.delete(`${import.meta.env.VITE_USERS_API}/${studentId}`, { headers: { Authorization: `Bearer ${USER_Token}` } });
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId))
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate("/");
      }
      console.error('Error deleting student and/or associated ideas:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleStudentCardClick = (id) => {
    navigate(`/studentideas/${id}`);
  };

  const openConfirmationDialog = (id) => {
    setStudentIdToRemove(id);
    setIsDialogOpen(true);
  };

  const confirmRemoval = () => {
    if (studentIdToRemove) {
      // handleRemove(studentIdToRemove);
      deleteStudent(studentIdToRemove)
    }
    setIsDialogOpen(false);
    setStudentIdToRemove(null);
  };

  const cancelRemoval = () => {
    setIsDialogOpen(false);
    setStudentIdToRemove(null);
  };

  return (
    <main className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <div className="space-y-8 mb-12">
          <h3
            className={`${styles.heading3} text-center text-blue-900 font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-wide`}
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Student Ideas
          </h3>

          <div className="mb-6 w-fit mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-md">
            <input
              onChange={handleSearchInputChange}
              value={searchInput}
              className="w-full outline-none px-4 py-2"
              type="search"
              placeholder="Search ideas..."
            />
            <IoIosSearch size={20} className="text-secondary-light-color ml-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {students
            .filter((student) => searchForTerm(searchInput, [student]).length > 0)
            .map((student) => (
              <div
                key={student._id}
                onClick={() => handleStudentCardClick(student._id)}
                className="cursor-pointer flex items-center justify-between border-b-4 border-r-4 border-gray-300 rounded-lg px-6 py-4 bg-white hover:bg-blue-50 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gray-100">
                    <PiStudentFill className="text-blue-800 w-8 h-8" />
                  </div>
                  <div>
                    <p className={`${styles.paragraph3} text-blue-800 font-semibold`}>
                      {student.name}
                    </p>
                    <div className="mt-1 flex gap-1 items-center">
                      <FcIdea className="w-6 h-6 -translate-y-1" />
                      <span className={`${styles.paragraph4} text-blue-600`}>
                        {student.ideas.length}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openConfirmationDialog(student._id);
                  }}
                  className=" w-8 h-8 rounded-full flex items-center justify-center transition duration-200"
                >
                  <IoPersonRemove title="Remove Student" className={`cursor-pointer text-red-400 hover:text-red-600 w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] ${styles.transition500}`} />
                </button>
              </div>
            ))}
        </div>

        <DeleteModel
          isOpen={isDialogOpen}
          onConfirm={confirmRemoval}
          onClose={cancelRemoval}
        />
      </div>
    </main>
  );
}

export default Admin;
