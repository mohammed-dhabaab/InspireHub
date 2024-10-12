import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "../../styles";
import searchForTerm from "../../utils/searchForTerm";
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
 
 />
 <textarea
 placeholder=",وصف الفكره"
 value={newIdea.description}
 onChange={(e)=>setNewIdea({...newIdea,description:e.target.value})}
 
 />
 <button onClick={addIdea}>add new idea</button>
</div>
</div>
        )}
       
      </div>

      <div className={`${styles.wrapper} flex justify-center`}>
        <div className="text-center">
          <h3 className={styles.heading3}>Ideas</h3>
          <div className="w-full">
            <div className="relative right-0">
              <ul
                className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
                data-tabs="tabs"
                role="list"
              >
                <li className="z-30 flex-auto text-center">
                  <a
                    className="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit"
                    data-tab-target=""
                    role="tab"
                    aria-selected="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4 mr-1.5 text-slate-500"
                    >
                      <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z"></path>
                      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z"></path>
                      <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z"></path>
                    </svg>
                    <span className="ml-1">my ideas</span>
                  </a>
                </li>
                <li className="z-30 flex-auto text-center">
                  <a
                    className="z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600 bg-inherit"
                    data-tab-target=""
                    role="tab"
                    aria-selected="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4 mr-1.5 text-slate-500"
                    >
                      <path d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
                    </svg>
                    <span className="ml-1">All ideas</span>
                  </a>
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

    <div className={`${styles.wrapper}`}>
    <button className="btn text-white bg-green-500" onClick={()=>setIsPopupOpen(true)}>New idea +</button>
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
                buttonText="Edit"
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
 
 />
 <textarea
 placeholder=",وصف الفكره"
 value={editIdea.description}
 onChange={(e)=>setEditeIdea({...editIdea,description:e.target.value})}
 
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
