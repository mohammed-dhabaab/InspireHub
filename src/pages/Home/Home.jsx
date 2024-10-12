import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";
import { FaRegEdit } from "react-icons/fa";

function Home() {
  const [ideas, setIdeas] = useState([

    {
        id: 1,
        username: "Rana",
        imgprofile: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        title: "فكرة 1",
        description: "وصف الفكرة الأولى.",
      },
      {
        id: 2,
        username: "Rana",
        imgprofile: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        title: "فكرة 2",
        description: "وصف الفكرة الثانية.",
      },
      {
        id: 3,
        username: "Rana",
        imgprofile: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        title: "فكرة 3",
        description: "وصف الفكرة الثالثة.",
      },
      {
        id: 4,
        username: "Rana",
        imgprofile: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
        title: "فكرة 4",
        description: "وصف الفكرة الرابعه.",
      },

  ]);
  const [filteredArr, setFiltredArr] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [newIdea,setNewIdea]=useState({
    title:"",description:"",username:"",imgprofile:""
  })
const [isPopupOpen, setIsPopupOpen]=useState(false)
const [editIdea,setEditeIdea]=useState(null)
const [activeTap , setActiveTap]=useState("myIdeas")
  const addIdea =()=>{
    if(newIdea.title && newIdea.description){
        setIdeas([...ideas,{...newIdea, id:ideas.length +1}])
        setFiltredArr([...filteredArr],{...newIdea,id:ideas.length+1})
        setNewIdea({title:"",description:"",username:"Rana",imgprofile:""})
        setIsPopupOpen(false);

    }

   
  }
  const updateIdea =()=>{
    if(editIdea.title && editIdea.description){
        setIdeas(ideas.map(idea=>
        idea.id === editIdea.id ? editIdea: idea
        ))
        setEditeIdea(null)
    }
}

// useEffect(()=>{
//     const results=searchForTerm(searchTerm,ideas);
//     setFiltredArr(results);

// },[searchTerm ,ideas])


  return (
    <main className={`${styles.outerWrapper} `}>
      <div className={`${styles.wrapper} flex justify-between`}>
        <h2 className={styles.heading2}>Welcome Student Rana</h2>
      </div>
     

      <div className={`${styles.wrapper} flex justify-center`}>
        <div className="text-center">
          <h3 className={styles.heading3}>Ideas</h3>
          <div className="w-full">
            <div className="relative right-0">
              <ul
              className="flex list-none"
           
              >
                <li className="mr-4">
                 
                  
                    <button className={`py-2 px-4 ${activeTap === "myIdeas"?"font-bold bg-slate-50":""}`}
                    onClick={()=>setActiveTap("myIdeas")}

                    >my ideas
                    
                    </button>
                
                </li>
                <li>
                 
                    <button className={`py-2 px-4 ${activeTap === "AllIdeas"?"font-bold bg-slate-50":""}`}
                    onClick={()=>setActiveTap("AllIdeas")}
                    
                    
                    >All ideas</button>

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
          {/* {filteredArr.map((idea) => (
            <div key={idea.id}>
              <h2>{idea.title}</h2>
              <p>{idea.des}</p>
            </div>
          ))} */}
        </div>

        </div>
        <div className={`${styles.wrapper} flex justify-between`}>
        {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

 <div className="bg-white p-4 rounded shadow-lg relative">
 <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsPopupOpen(false)}
            >
                 &times;
                 </button>
    <h3 className={`${styles.heading3}`}>Add new idea</h3>
 <input
 type="text"
 placeholder="عنواف الفكره "
 value={newIdea.title}
 onChange={(e)=>{setNewIdea({...newIdea,title:e.target.value})}}
 className={`${styles.input}`}

 />
 <textarea
 placeholder=",وصف الفكره"
 value={newIdea.description}
 onChange={(e)=>setNewIdea({...newIdea,description:e.target.value})}
 className={`${styles.input}`}

 />
 <button onClick={addIdea}>add new idea</button>
</div>
</div>
        )}
       
      </div>
    <div className={`${styles.wrapper}`}>
    <button className="btn text-white bg-primary p-2 rounded-full" onClick={()=>setIsPopupOpen(true)}>New idea +</button>
<div className="flex flex-wrap justify-around gap-1">
        {ideas.map((idea)=>(
            <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={idea.id}>

                <Card
                key={idea.id}
                username={idea.username}
                imgprofile={idea.imgprofile}
                title={idea.title}
                description={idea.description}
                onEdit={()=>setEditeIdea(idea)}
                buttonText={<FaRegEdit className="w-5 h-5"/>
                }
                />
</div>

        ))}
        </div>
{editIdea &&(
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
<div className="bg-white p-4 rounded shadow-lg relative">
<button 
className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
onClick={()=>setEditeIdea(null)}
>

&times;
</button>
<h3 className={`${styles.heading3}`}>Edit Idea</h3>
 <input
 type="text"
 placeholder="عنواف الفكره "
 value={editIdea.title}
 onChange={(e)=>{setEditeIdea({...editIdea,title:e.target.value})}}
 className={`${styles.input}`}
 />
 <textarea
 placeholder=",وصف الفكره"
 value={editIdea.description}
 onChange={(e)=>setEditeIdea({...editIdea,description:e.target.value})}
 className={`${styles.input}`}

 />
 <button onClick={updateIdea}>update Idea</button>
</div>
</div>

)}
    </div>
    </main>
  );
}

export default Home;
