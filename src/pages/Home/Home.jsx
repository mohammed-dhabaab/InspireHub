// import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "../../styles";
function Home() {
  const [ideas, setIdeas] = useState([

    {
        id: 1,
        username: "Rana",
        imgprofile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        title: "فكرة 1",
        description: "وصف الفكرة الأولى.",
      },
      {
        id: 2,
        username: "Rana",
        imgprofile: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
        title: "فكرة 2",
        description: "وصف الفكرة الثانية.",
      },

  ]);
  const [filteredArr, setFiltredArr] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");

// useEffect(()=>{
//     setFiltredArr(setSerachTerm(searchTerm,ideas))
// },[searchTerm])


  return (
    <main className={`${styles.outerWrapper} `}>
      <div className={`${styles.wrapper} flex justify-between`}>
        <h2 className={styles.heading2}>Welcome Student Rana</h2>
      </div>
      <div className={`${styles.wrapper} flex justify-between`}>
        <div>add</div>
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
    <div className={`${styles.wrapper}flex flex-wrap justify-center mt-4`}>
        {ideas.map((idea)=>(
        
                <Card
                key={idea.id}
                username={idea.username}
                title={idea.title}
                description={idea.description}
                />

            
        ))}

    </div>
    </main>
  );
}

export default Home;
