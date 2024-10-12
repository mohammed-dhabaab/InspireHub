import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_USERS_API;
  const ideasApiUrl = import.meta.env.VITE_IDEAS_API;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);

      const ideasResponse = await axios.get(ideasApiUrl);
      const ideas = ideasResponse.data;
      const userIdeas = ideas.filter((idea) => idea.studentId === id);
      await Promise.all(
        userIdeas.map(async (idea) => {
          await axios.delete(`${ideasApiUrl}/${idea.id}`);
        })
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      console.log("User and related ideas deleted successfully");
    } catch (error) {
      console.error("Error deleting user and ideas:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (id) => {
    navigate(`/studentideas/${id}`);
  };

  return (
    <main className={styles.outerWrapper}>
      <div className={styles.wrapper}>
        <div className="space-y-8 mb-12">
          <h3 className={`${styles.heading3} text-center`}>Students Ideas</h3>
          <div className="relative flex justify-center">
           
            
            <BiSearch
              className="absolute lg:left-[56%] md:left-[58%] left-[65%]  top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              className={`${styles.Search} `} 
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              
            />

           
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {users
            .filter((user) => user.role === "student")
            .filter((user) => searchForTerm(searchTerm, [user]).length > 0)
            .map((user) => (
              <div
                key={user.id}
                onClick={() => handleCardClick(user.id)}
                className="cursor-pointer flex items-center justify-between border border-solid border-gray-300 rounded-lg px-6 py-3"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="rounded-full w-9 h-9"
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div>
                    <p className={styles.paragraph3}>{user.name}</p>
                    <p className={styles.paragraph4}>
                      Number of ideas: {user.numberOfIdeas}
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(user.id);
                  }}
                  className="bg-[#f42525] w-8 h-8 rounded-lg"
                ></button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Admin;
