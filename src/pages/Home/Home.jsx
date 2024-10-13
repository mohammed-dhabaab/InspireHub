import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";
import { FaRegEdit } from "react-icons/fa";
import ideasphoto from "../../assets/Home/ideaphoto.png";
import ideaedit from "../../assets/Home/editidea.png";

function Home() {
  const [ideas, setIdeas] = useState([]);
  const [filteredArr, setFiltredArr] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
    name: "",
    avatar: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editIdea, setEditeIdea] = useState(null);
  const [activeTap, setActiveTap] = useState("myIdeas");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          "https://670941a3af1a3998baa0ec5c.mockapi.io/users"
        );
        console.log("User response:", userResponse.data);
        if(userResponse.data.length >0){
            const userData = userResponse.data[2]
            console.log(userData);
            
            setUserInfo(userData);
            setNewIdea((prev) => ({ ...prev, name: userData.name ,avatar:userData.avatar }));
        }else{
            console.log("no user data found");
            
        }
       
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(()=>{
    const fetchIdeas = async ()=>{
        if(!userInfo) {
            console.log("User info is not available yet.");
            return ;
        }
        try{
            const response = await axios.get("https://670941a3af1a3998baa0ec5c.mockapi.io/ideas")
            const allideass = response.data
            const StudentId =userInfo.StudentId
console.log(allideass);

            const StudentIdeas = allideass.filter(idea =>
                idea.StudentId === StudentId)
            console.log("Filtered ideas:", StudentIdeas); 
            
            const ideasWithUsernames = StudentIdeas.map(idea =>{
                // const user = userInfo;
                // console.log(user);
                
                return{
                    ...idea,
                    username:userInfo.name,
                    avatar:userInfo.avatar,
                    status:idea.status|| 'default'
                    
                    
                }
            })
            console.log(ideasWithUsernames);

            setIdeas(ideasWithUsernames)
        } catch(error){
            console.error("Error fetching ideas:", error);
        }
    }
    fetchIdeas();
  },[userInfo])

  
  const addIdea = async () => {
    if (newIdea.title && newIdea.description) {
        const userId = userInfo.id

        const ideatoAdd ={...newIdea,userId}
        try{
            const response = await axios.post("https://670941a3af1a3998baa0ec5c.mockapi.io/ideas",ideatoAdd)
            setIdeas([...ideas,response.data]);
      setFiltredArr([...filteredArr ,response.data]);
      setNewIdea({
        title: "",
        description: "",
        name: newIdea.name,
        avatar: newIdea.avatar,
      });
      setIsPopupOpen(false);
        }catch (error) {
            console.error("Error adding idea:", error);
          }
  
    }
  };
  const updateIdea = async () => {
    if (editIdea.title && editIdea.description) {
        try{
            const response = await axios.put(`https://670941a3af1a3998baa0ec5c.mockapi.io/ideas/${editIdea.id}`,editIdea)
            setIdeas(
                ideas.map((idea) => (idea.id === editIdea.id ? response.data : idea))
              );
              setEditeIdea(null);
            }catch (error) {
                console.error("Error updating idea:", error);
              }
        }
     
  };
  const fitredIdeas = activeTap==="AllIdeas"
  ?ideas.filter(idea => idea.status === "Acceptable")
  :ideas.filter(idea =>idea.StudentId === userInfo.StudentId)

  useEffect(()=>{
      const results=searchForTerm(searchTerm,ideas);
      setFiltredArr(results);

  },[searchTerm ,ideas])

  return (
    <main className={`${styles.outerWrapper}`}>
      <div className={`${styles.wrapper} flex justify-center text-primary`}>
        <h2 className={`${styles.heading2}`}>Welcome Student <span className="text-secondary">{userInfo?.name}</span></h2>
      </div>

      <div className={`${styles.wrapper} flex justify-center`}>
        <div className="text-center">
          <h3 className={styles.heading3}>Ideas</h3>
          <div className="w-full">
            <div className="relative right-0">
              <ul className="flex list-none">
                <li className="mr-4">
                  <button
                    className={`py-2 px-4 ${
                      activeTap === "myIdeas" ? "font-bold bg-slate-50" : ""
                    }`}
                    onClick={() => setActiveTap("myIdeas")}
                  >
                    my ideas
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 ${
                      activeTap === "AllIdeas" ? "font-bold bg-slate-50" : ""
                    }`}
                    onClick={() => setActiveTap("AllIdeas")}
                  >
                    All ideas
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.wrapper} mt-2`}>
            <input
              onChange={(e) => setSerachTerm(e.target.value)}
              placeholder="search"
              className={styles.Search}
            />
          </div>
       
        </div>
      </div>
      <div className={`${styles.wrapper} flex justify-between`}>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg relative ">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
              <div className="flex flex-wrap items-center ">
                <div className="mt-4">
                  <h4
                    className={`${styles.heading4} bg-primary text-white p-2`}
                  >
                    Add new idea
                  </h4>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="title idea"
                    value={newIdea.title}
                    onChange={(e) => {
                      setNewIdea({ ...newIdea, title: e.target.value });
                    }}
                    className={`${styles.input} mb-4 `}
                  />
                  <br />
                  <label>description</label>

                  <textarea
                    placeholder="descripation the idea"
                    value={newIdea.description}
                    onChange={(e) =>
                      setNewIdea({ ...newIdea, description: e.target.value })
                    }
                    className={`${styles.input} mb-4`}
                  />
                  <button
                    onClick={addIdea}
                    className={`${styles.paragraph4} bg-secondary p-2 rounded-full mt-2 w-full`}
                  >
                    add new idea
                  </button>
                </div>
                <div className="w-96 h-96">
                  <img src={ideasphoto} className="w-full h-full flip- " />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`${styles.wrapper}`}>
        <button
          className="btn text-white bg-primary p-2 rounded-full"
          onClick={() => setIsPopupOpen(true)}
        >
          New idea +
        </button>
        <div className="flex flex-wrap justify-around gap-1">
          {fitredIdeas.map((idea) => (
            <div
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              key={idea.id}
            >
              <Card
                key={idea.id}
                username={idea.username}
                imgprofile={idea.avatar}
                title={idea.name}
                description={idea.description}
                onEdit={() => setEditeIdea(idea)}
                buttonText={<FaRegEdit className="w-5 h-5" />}
                status={idea.status}
              />
            </div>
          ))}
        </div>
        {editIdea && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setEditeIdea(null)}
              >
                &times;
              </button>
              <div className="flex flex-wrap items-center ">
                <div className="mt-4">
                  <h4
                    className={`${styles.heading4} bg-primary text-white p-2`}
                  >
                    Edit Idea
                  </h4>
                  <label>Title</label>

                  <input
                    type="text"
                    placeholder="عنواف الفكره "
                    value={editIdea.title}
                    onChange={(e) => {
                      setEditeIdea({ ...editIdea, title: e.target.value });
                    }}
                    className={`${styles.input}`}
                  />
                  <br />
                  <label>description</label>
                  <textarea
                    placeholder=",وصف الفكره"
                    value={editIdea.description}
                    onChange={(e) =>
                      setEditeIdea({ ...editIdea, description: e.target.value })
                    }
                    className={`${styles.input}`}
                  />
                  <button
                    onClick={updateIdea}
                    className={`${styles.paragraph4} bg-secondary p-2 rounded-full mt-2 w-full`}
                  >
                    update Idea
                  </button>
                </div>
                <div className="w-96 h-96">
                  <img src={ideaedit} className="w-full h-full flip- " />
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
