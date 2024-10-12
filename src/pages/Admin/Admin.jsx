import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://670941a3af1a3998baa0ec5c.mockapi.io/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://670941a3af1a3998baa0ec5c.mockapi.io/users/${id}`
      );
      setUsers((prevUser) => prevUser.filter((user) => user.id !== id));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const handleCardClick = (id) => {
    navigate(`/studentideas/${id}`); 
  };

  return (
    <main className={`${styles.outerWrapper}`}>
      <div className={`${styles.wrapper}`}>
        <div className="space-y-8 mb-12">
          <h3 className={`${styles.heading3} text-center`}>Students Ideas</h3>
          <input
            type="text"
            className={`${styles.Search} flex justify-center`}
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
                    <p className={`${styles.paragraph3}`}>{user.name}</p>
                    <p className={`${styles.paragraph4}`}>
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
