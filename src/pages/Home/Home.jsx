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
import { IoIosSearch } from "react-icons/io";
import IdeaCard from "./IdeaCard";

function Home() {
  const [allStudentsIdeas, setAllStudentsIdeas] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [filteredArr, setFiltredArr] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [newIdea, setNewIdea] = useState({
    name: "",
    description: "",
    studentId: "",
    status: "",
    reason: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editIdea, setEditeIdea] = useState(null);
  const [activeTap, setActiveTap] = useState("myIdeas");
  let USER_ID = "";
  const VITE_IDEAS_API = import.meta.env.VITE_IDEAS_API;
  const VITE_USERS_API = import.meta.env.VITE_USERS_API;
  const navigate = useNavigate();
  const USER_LOCAL_STORGE = import.meta.env.VITE_USER_LOCAL_STORGE;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORGE));
    if (!storedUser) {
      navigate("/");
    } else if (storedUser.role === "admin") {
      navigate("/admin");
    }

  }, []);

  USER_ID = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_LOCAL_STORGE)).user.id;
  const USER_Token = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_LOCAL_STORGE)).token;

  //   USER_ID = "670ff9873abe01fbd2812066";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await axios.get(`${VITE_USERS_API}/${USER_ID}`);
        const data = usersResponse.data;
        setUserInfo(data);
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
        const ideasResponse = await axios.get(VITE_IDEAS_API, { headers: { Authorization: `Bearer ${USER_Token}` } });

        // if( ideasResponse.status === 403 || ideasResponse.status === 401){
        //  localStorage.removeItem(USER_LOCAL_STORGE);
        // console.log('herree')
        // navigate("/");
        // }
        const allIdeas = ideasResponse.data;
        const usersResponse = await axios.get(VITE_USERS_API);
        const allUsers = usersResponse.data;

        const allAcceptedIdeas = allIdeas.filter(
          (idea) => idea.status === "Acceptable"
        );

        const acceptedIdeasWithUserInfo = allAcceptedIdeas.map((idea) => {
          return {
            ...idea,
            username:
              allUsers.find((user) => user._id === idea.studentId)?.name ||
              "Unknown User",
            avatar:
              allUsers.find((user) => user._id === idea.studentId)?.avatar ||
              "https://via.placeholder.com/150",
            status: idea.status || "",
          };
        });

        const studentIdeas = allIdeas.filter(
          (idea) => idea.studentId === USER_ID
        );


        const studentIdeasWithUserInfo = studentIdeas.map((idea) => {
          return {
            ...idea,
            username: userInfo.name,
            // avatar: userInfo.avatar,
            status: idea.status || "",
          };
        });

        setAllStudentsIdeas(acceptedIdeasWithUserInfo);
        setIdeas(studentIdeasWithUserInfo);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate("/");
        }
        console.error("Error fetching ideas:", error);
      }
    };
    fetchCurrentUserIdeas();
  }, [userInfo]);



  const addIdea = async () => {
    if (newIdea.name && newIdea.description) {
      const userId = userInfo._id;

      const ideatoAdd = { ...newIdea, studentId: userId };

      try {
        const response = await axios.post(VITE_IDEAS_API, ideatoAdd);
        const updatedUserData = {
          ...userInfo,
          numberOfIdeas: parseInt(userInfo.numberOfIdeas) + 1,
        };
        setUserInfo(updatedUserData);

        setIdeas([...ideas, response.data]);
        setFiltredArr([...filteredArr, response.data]);
        setNewIdea({
          name: "",
          description: "",
          studentId: USER_ID,
          status: "",
          reason: "",
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
        const response = await axios.put(
          `${VITE_IDEAS_API}/${editIdea._id}`,
          editIdea
        );
        setIdeas(
          ideas.map((idea) =>
            idea._id === editIdea._id ? response.data : idea
          )
        );
        setEditeIdea(null);
      } catch (error) {
        console.error("Error updating idea:", error);
      }
    }
  };
  const fitredIdeas =
    activeTap === "AllIdeas"
      ? allStudentsIdeas
      : ideas.filter((idea) => idea.StudentId === userInfo.StudentId);

  useEffect(() => {
    const results = searchForTerm(searchTerm, ideas);
    setFiltredArr(results);
  }, [searchTerm, ideas]);
  const displayedIdeas = searchTerm ? filteredArr : fitredIdeas;

  return (
    <main className={`${styles.outerWrapper} `}>
      <div className={`${styles.wrapper} flex  text-primary`}>
        <h2 className={`${styles.heading2} mb-4`} style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
          👋 Welcome {" "}
          <span className="text-secondary">{userInfo?.name}!</span>
        </h2>
      </div>

      <div className={`${styles.wrapper} flex justify-center`}>
        <div className="text-center ">
          {/* <h3 className={`${styles.heading3} mb-4`}>Ideas</h3> */}
          <div className="w-full ">
            <div className="relative right-0 ">
              <ul className="flex list-none justify-center mb-4 mt-8">
                <li className="mr-4">
                  <button
                    className={`py-2 px-4 rounded-md font-medium ${styles.transition500} ${activeTap === "myIdeas" ? "text-primary bg-slate-100" : ""
                      }`}
                    onClick={() => setActiveTap("myIdeas")}
                  >
                    My Ideas
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 rounded-md font-medium ${styles.transition500} ${activeTap === "AllIdeas" ? "text-primary bg-slate-100" : ""
                      }`}
                    onClick={() => setActiveTap("AllIdeas")}
                  >
                    All Accepted Ideas
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-6 w-fit mx-auto flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-md">
            <input
              onChange={(e) => setSerachTerm(e.target.value)}
              placeholder="search"
              className="w-full outline-none"
            />
            <IoIosSearch
              size={20}
              className="text-secondary-light-color ml-2"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.wrapper} flex justify-between `}>
        {isPopupOpen && (
          <div className="fixed inset-0 flex lg:items-center lg:justify-center md:justify-center sm:justify-center md:items-center sm:items-center max-sm:justify-center max-sm:items-center bg-black bg-opacity-50 z-50">
            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white p-8 rounded shadow-lg relative border-4 border-primary ">
              <button
                className={`absolute top-1 right-1 text-gray-500 hover:text-red-400 ${styles.transition500}`}
                onClick={() => setIsPopupOpen(false)}
              >
                <IoIosClose className="w-10 h-10" />
              </button>
              <h4
                className={`${styles.heading4} mb-3 bg-primary text-white p-2 rounded-md`}
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
                    className={`${styles.paragraph4} ${styles.transition500} text-secondary font-bold border-2 border-solid border-secondary hover:text-white hover:bg-secondary p-2 rounded-full mt-2 w-full`}
                  >
                    Add New Idea
                  </button>
                </div>
                <div className="w-96 max-w-xs md:max-w-md lg:max-w-lg h-auto">
                  <img
                    src={ideasphoto}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.wrapper}`}>
        <div className="">
          <button
            className={`${styles.transition500} text-primary border-2 border-solid border-primary hover:text-white hover:bg-primary px-3 py-2 rounded-full flex flex-wrap gap-2 items-center`}
            onClick={() => setIsPopupOpen(true)}
          >
            <span>Add Idea</span>
            <IoAddCircleOutline className="w-7 h-7" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayedIdeas
            .slice()
            .reverse()
            .map((idea) => (
              <IdeaCard
                key={idea._id}
                idea={idea}
                username={idea.username}
                title={idea.name}
                description={idea.description}
                reason={idea.reason}
                onEdit={() => setEditeIdea(idea)}
                buttonText={<FaRegEdit className="w-5 h-5" />}
                status={idea.status}
                isUserCard={idea.studentId == USER_ID}
              />
              // <div className="" key={idea._id}>
              //   <Card
              //     idea={idea}
              //     username={idea.username}
              //     title={idea.name}
              //     description={idea.description}
              //     reason={idea.reason}
              //     onEdit={() => setEditeIdea(idea)}
              //     buttonText={<FaRegEdit className="w-5 h-5" />}
              //     status={idea.status}
              //     isUserCard={idea.studentId == USER_ID}
              //   />
              // </div>
            ))}
        </div>
        {editIdea && (
          <div className="fixed inset-0 flex lg:items-center lg:justify-center md:justify-center sm:justify-center md:items-center sm:items-center max-sm:justify-center max-sm:items-center bg-black bg-opacity-50 z-50">
            <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full bg-white p-8 rounded shadow-lg relative border-4 border-primary">
              <button
                className={`${styles.transition500} absolute top-2 right-2 text-gray-500 hover:text-red-500`}
                onClick={() => setEditeIdea(null)}
              >
                <IoIosClose className="w-10 h-10" />
              </button>
              <h4
                className={`${styles.heading4} mb-3 mt-3 bg-primary text-white p-2 rounded-md`}
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
                    <label className="fint-bold text-xl">Description</label>
                    <textarea
                      placeholder="Description of the idea (150 letters)"
                      maxLength={"150"}
                      value={editIdea.description}
                      onChange={(e) =>
                        setEditeIdea({
                          ...editIdea,
                          description: e.target.value,
                        })
                      }
                      className={`${styles.input} resize-none`}
                    />
                  </div>
                  <button
                    onClick={updateIdea}
                    className={`${styles.paragraph4} ${styles.transition500} mt-2 text-secondary font-bold border-2 border-solid border-secondary hover:text-white hover:bg-secondary p-2 rounded-full  w-full`}
                  >
                    Update Idea
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
