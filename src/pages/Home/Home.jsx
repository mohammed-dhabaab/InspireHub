import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";
import { FaRegEdit } from "react-icons/fa";
import ideasphoto from "../../assets/Home/ideaphoto.png";
import ideaedit from "../../assets/Home/editidea.png";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {IoIosSearch} from "react-icons/io"

function Home() {
  const [allStudentsIdeas, setAllStudentsIdeas] = useState([])
  const [ideas, setIdeas] = useState([]);
  const [filteredArr, setFiltredArr] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [newIdea, setNewIdea] = useState({
    name: "",
    description: "",
    studentId: "",
    avatar: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editIdea, setEditeIdea] = useState(null);
  const [activeTap, setActiveTap] = useState("myIdeas");
  let USER_ID = "";
  const VITE_IDEAS_API = import.meta.env.VITE_IDEAS_API
  const VITE_USERS_API = import.meta.env.VITE_USERS_API
  const navigate = useNavigate();
  const USER_LOCAL_STORGE = import.meta.env.VITE_USER_LOCAL_STORGE;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORGE));
    if (!storedUser) {
      navigate("/"); 
    } else if (storedUser.role === "admin") {
      navigate("/admin"); 
    } else{
    }
  }, [navigate]);

  USER_ID =JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_LOCAL_STORGE)).id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await axios.get(`${VITE_USERS_API}/${USER_ID}`);
        const data = usersResponse.data
        setUserInfo(data)
       

      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
 
    
    
  }, []);
 
  useEffect(() => {
    const fetchCurrentUserIdeas = async () => {
      if (!userInfo) {
        return;
      }
      try {
        const ideasResponse = await axios.get(VITE_IDEAS_API)
        const allIdeas = ideasResponse.data
        const usersResponse = await axios.get(VITE_USERS_API)
        const allUsers = usersResponse.data

        const allAcceptedIdeas = allIdeas.filter(idea => idea.status === "Acceptable")

        const acceptedIdeasWithUserInfo = allAcceptedIdeas.map(idea => {
          return {
            ...idea,
            username: allUsers.find(user => user.id === idea.studentId)?.name || "Unknown User",
            avatar: allUsers.find(user => user.id === idea.studentId)?.avatar || "https://via.placeholder.com/150",
            status: idea.status || ""
          }
        })

        const studentIdeas = allIdeas.filter(idea => idea.studentId === USER_ID)

console.log(studentIdeas);


        const studentIdeasWithUserInfo = studentIdeas.map(idea => {
          return {
            ...idea,
            username: userInfo.name,
            avatar: userInfo.avatar,
            status: idea.status || ""
          }
        })
        console.log("##3#############");
        
console.log(studentIdeasWithUserInfo);
console.log("########################");


        setAllStudentsIdeas(acceptedIdeasWithUserInfo)
        setIdeas(studentIdeasWithUserInfo)
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    }
    fetchCurrentUserIdeas();
  }, [userInfo])


  const addIdea = async () => {
    if (newIdea.name && newIdea.description) {
      const userId = userInfo.id
      console.log(userInfo);
      const ideatoAdd = { ...newIdea, studentId: userId }


      try {
        const response = await axios.post(VITE_IDEAS_API, ideatoAdd)
        const updatedUserData = { ...userInfo, numberOfIdeas: userInfo.numberOfIdeas + 1 }
        const updateResponse = await axios.put(`${VITE_USERS_API}/${userId}`, updatedUserData)
        console.log(updateResponse);
        setUserInfo(updateResponse.data);

        setIdeas([...ideas, response.data]);
        setFiltredArr([...filteredArr, response.data]);
        setNewIdea({
          name: "",
          description: "",
          studentId: USER_ID,
          avatar: newIdea.avatar,
        });

        setIsPopupOpen(false);
      } catch (error) {
        console.error("Error adding idea:", error);
      }

    }
  };
  const updateIdea = async () => {
    if (editIdea.name && editIdea.description) {
      try {
        const response = await axios.put(`${VITE_IDEAS_API}/${editIdea.id}`, editIdea)
        setIdeas(
          ideas.map((idea) => (idea.id === editIdea.id ? response.data : idea))
        );
        setEditeIdea(null);
      } catch (error) {
        console.error("Error updating idea:", error);
      }
    }

  };
  const fitredIdeas = activeTap === "AllIdeas"
    ? allStudentsIdeas
    : ideas.filter(idea => idea.StudentId === userInfo.StudentId)

  useEffect(() => {
    const results = searchForTerm(searchTerm, ideas);
    setFiltredArr(results);

  }, [searchTerm, ideas])
  const displayedIdeas = searchTerm ? filteredArr : fitredIdeas;
  
 
  return (
    <main className={`${styles.outerWrapper} `}>
      <div className={`${styles.wrapper} flex justify-center text-primary`}>
        <h2 className={`${styles.heading2} mb-4`}>Welcome Student <span className="text-secondary">{userInfo?.name}</span></h2>
      </div>

      <div className={`${styles.wrapper} flex justify-center`}>
        <div className="text-center ">
          <h3 className={`${styles.heading3} mb-4`}>Ideas</h3>
          <div className="w-full ">
            <div className="relative right-0 ">
              <ul className="flex list-none justify-center">
                <li className="mr-4">
                  <button
                    className={`py-2 px-4 ${activeTap === "myIdeas" ? "font-bold bg-slate-50" : ""
                      }`}
                    onClick={() => setActiveTap("myIdeas")}
                  >
                    My Ideas
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 ${activeTap === "AllIdeas" ? "font-bold bg-slate-50" : ""
                      }`}
                    onClick={() => setActiveTap("AllIdeas")}
                  >
                    All Ideas
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className='mb-6 w-fit mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2'>
          <input
              onChange={(e) => setSerachTerm(e.target.value)}
              placeholder="search"

                        className='w-full outline-none'
            />
                                <IoIosSearch size={20} className='text-secondary-light-color ml-2' />

          </div>

        </div>
      </div>
      <div className={`${styles.wrapper} flex justify-between `}>
        {isPopupOpen && (
          <div className="fixed inset-0 flex lg:items-center lg:justify-center md:justify-center sm:justify-center md:items-center sm:items-center max-sm:justify-center max-sm:items-center bg-black bg-opacity-50 z-50">
            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white p-8 rounded shadow-lg relative border-4 border-primary ">
              <button
                className={`absolute top-1 right-1 text-gray-500 hover:text-gray-800 ${styles.transition500}`}
                onClick={() => setIsPopupOpen(false)}
              >
                <IoIosClose className="w-10 h-10" />
              </button>
              <h4
                    className={`${styles.heading4} bg-primary text-white p-2 rounded-md`}
                  >
                    Add New Idea
                  </h4>
              <div className="flex flex-col lg:flex-row lg:items-center md:items-center sm:items-center max-sm:items-center">
                
                <div className=" flex flex-col  flex-wrap w-full lg:w-2/3 md:w-2/3 sm:w-2/3 max-sm:w-2/3 ">
                
                  <div>

                    <label className="fint-bold text-xl">Title</label>
                    <input
                      type="text"
                      maxLength={30}
                      placeholder="Title Idea"
                      value={newIdea.name}
                      onChange={(e) => {
                        setNewIdea({ ...newIdea, name: e.target.value });
                      }}
                      className={`${styles.input} `}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="fint-bold text-xl">Description</label>

                    <textarea
                      placeholder="Description of the idea (150 letters)"
                      maxLength={"150"}
                      value={newIdea.description}
                      onChange={(e) =>
                        setNewIdea({ ...newIdea, description: e.target.value })
                      }
                      className={`${styles.input} resize-none`}
                    />
                  </div>
                  <button
                    onClick={addIdea}
                    className={`${styles.paragraph4} bg-secondary p-2 rounded-full mt-2 w-full`}
                  >
                    Add New Idea
                  </button>
                </div>
                <div className="w-96 max-w-xs md:max-w-md lg:max-w-lg h-auto">
                  <img src={ideasphoto} className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.wrapper}`}>
        <div className="">
          <button
            className="btn text-white bg-primary p-2 rounded-full flex flex-wrap gap-2 items-center"
            onClick={() => setIsPopupOpen(true)}
          >
            <span>New idea</span><IoAddCircleOutline className="w-7 h-7" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-3 lg:gap-7 max-sm:justify-items-center md:justify-items-center">
          {displayedIdeas.slice().reverse().map((idea) => (
            <div
              className=""
              key={idea.id}
            >
              <Card
                idea={idea}
                key={idea.id}
                username={idea.username}
                imgprofile={idea.avatar}
                title={idea.name}
                description={idea.description}
                reason={idea.reason}
                onEdit={() => setEditeIdea(idea)}
                buttonText={<FaRegEdit className="w-5 h-5" />}
                status={idea.status}
                isUserCard={idea.studentId == USER_ID}
              />
            </div>
          ))}
        </div>
        {editIdea && (
          <div className="fixed inset-0 flex lg:items-center lg:justify-center md:justify-center sm:justify-center md:items-center sm:items-center max-sm:justify-center max-sm:items-center bg-black bg-opacity-50 z-50">
            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white p-8 rounded shadow-lg relative border-4 border-primary">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setEditeIdea(null)}
              >
                                <IoIosClose className="w-10 h-10" />
              </button>
              <h4
                    className={`${styles.heading4} bg-primary text-white p-2 rounded-md`}
                  >
                    Edit Idea
                  </h4>
              <div className="flex flex-col lg:flex-row lg:items-center md:items-center sm:items-center max-sm:items-center">
                <div className="flex flex-col  flex-wrap w-full lg:w-2/3 md:w-2/3 sm:w-2/3 max-sm:w-2/3 ">
              
                  <div>
                    <label className="fint-bold text-xl">Title</label>

                    <input
                      type="text"
                        placeholder="Title Idea"
                      value={editIdea.name}
                      maxLength={30}
                      onChange={(e) => {
                        setEditeIdea({ ...editIdea, name: e.target.value });
                      }}
                      className={`${styles.input}`}
                    />
                  </div>
                  <br />
                  <div>
                    <label className="fint-bold text-xl">description</label>
                    <textarea
                         placeholder="Description of the idea (150 letters)"
                         maxLength={"150"}
                      value={editIdea.description}
                      onChange={(e) =>
                        setEditeIdea({ ...editIdea, description: e.target.value })
                      }
                      className={`${styles.input} resize-none`}
                    />
                  </div>
                  <button
                    onClick={updateIdea}
                    className={`${styles.paragraph4} bg-secondary p-2 rounded-full  w-full`}
                  >
                    update Idea
                  </button>
                </div>
                <div className="w-96 max-w-xs md:max-w-md lg:max-w-lg h-auto">
                  <img src={ideaedit} className="w-full h-auto object-cover " />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
