// import React, { useEffect, useState } from 'react';
// import styles from "./styles.module.css";
// import { useUser } from '@/context/UserContext';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Loading from '@/components/Loading';
// import { useRouter } from 'next/router';
// import toast from 'react-hot-toast';
// import { server } from '@/config';

// const Lecture = () => {

//   const {user} = useUser();
//   const router = useRouter();

//   const [lectures, setLectures] = useState([]);
//   const [lecture, setLecture] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lecLoading, setLecLoading] = useState(false);
//   const [show, setShow] = useState(false);

//   const [ title, setTitle ] = useState("");
//   const [ description, setDescription ] = useState("");
//   const [ video, setVideo ] = useState("");
//   const [ videoPrev, setVideoPrev ] = useState("");
//   const [ btnLoading, setBtnLoading ] = useState(false);

//   const params = useParams();

//   // if(user && user.role !== "admin" && !user.subscription.includes(params.id)){
//   //   router.push("/");
//   // }

//   useEffect(() => {
//     if (!user) return; // Wait until user data is available
//     if (user.role !== "admin" && (!user.subscription?.includes(params.id))) {
//       router.push("/");
//     }
//   }, [user, params.id, router]);

//   async function fetchLectures() {
//     try{
//       const {data} = await axios.get(`${server}/api/lectures/${params.id}`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         }
//       });

//       setLectures(data.lectures);
//       setLoading(false);
//     }catch(err) {
//       console.log(err);
//       setLoading(false)
//     }
//   }

//   async function fetchLecture(id) {
//     setLecLoading(true);
//     try{
//       const {data} = await axios.get(`${server}/api/lecture/${id}`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         }
//       });

//       setLecture(data.lecture);
//       setLecLoading(false);
//     }catch(err) {
//       console.log(err);
//       setLecLoading(false)
//     }
//   }

//   const submitHandler = async(e) => {
//     setBtnLoading(true);
//     e.preventDefault();

//     const myForm = new FormData(); 

//     myForm.append("title", title);
//     myForm.append("description", description);
//     myForm.append("file", video);

//     try{
//       const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
//         headers:{
//           token: localStorage.getItem("token"),
//         }
//       });

//       toast.success(data.message);

//       setBtnLoading(false);
//       setShow(false);

//       fetchLectures();

//       setTitle("");
//       setDescription("");
//       setVideoPrev("");
//       setVideo("");
//     }catch(err){
//       toast.error(err.response.data.message);
//       setBtnLoading(false);
//     }
//   }

//   const changeVideoHandler = (e) => {
//     const file = e.target.files[0];

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setVideoPrev(reader.result);
//       setVideo(file);
//     }
//   };


//   const deleteLectureHandler = async (id) => {
//     if(confirm("Are you sure you wnat to delete this lecture ?")) {
//       try{
//         const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });

//         toast.success(data.message);
//         fetchLectures();
//       }catch(err) {
//         toast.error(err.response.data.message);
//       }
//     }
//   }

//   useEffect(() => {
//     fetchLectures()
//   }, []);

//   return (
//     <>
//       {
//         loading ? 
//         <Loading/>
//         :
//         <>
//           <div className={styles.lecture_page}>
//             <div className={styles.left}>
//               {
//                 lecLoading ? 
//                 <Loading/>
//                 :
//                 <>
//                   {
//                     lecture.video ? 
//                     <>
//                       <video 
//                         src={`${server}/${lecture.video}`} 
//                         width={"100%"}
//                         controls
//                         disablePictureInPicture
//                         controlsList='nodownload noremoteplayback'
//                         disableRemotePlayback
//                         autoPlay
//                       ></video>
//                       <h1>{lecture.title}</h1>
//                       <h3>{lecture.description}</h3>
//                     </>
//                     :
//                     <h1>Please select a lecture</h1>
//                   }
//                 </>
//               }
//             </div>
//             <div className={styles.right}>
//               {
//                 user && user.role === "admin" && 
//                 <button onClick={() => setShow(!show)} className={styles.btn}>
//                   { show ? "Close" : "Add Lecture"}
//                 </button>
//               }
//               {
//                 show && <div className={styles.lecture_form}>
//                   <h2>Add Lecture</h2>
//                   <form onSubmit={submitHandler}>
//                     <label htmlFor='text'>Title</label>
//                     <input 
//                       type='text' 
//                       required
//                       value={title}
//                       onChange={(e) => {
//                         setTitle(e.target.value)
//                       }}
//                     />

//                     <label htmlFor='text'>Description</label>
//                     <input 
//                       type='text' 
//                       required
//                       value={description}
//                       onChange={(e) => {
//                         setDescription(e.target.value)
//                       }}
//                     />

//                     <input 
//                       type='file' 
//                       placeholder='Choose Video' 
//                       required
//                       onChange={changeVideoHandler}
//                     />

//                     {
//                       videoPrev && <video src={videoPrev} width={300} controls></video>
//                     }

//                     <button disabled={btnLoading} type='submit' className={styles.btn}>
//                       {
//                         btnLoading ? "Please Wait..." : "ADD"
//                       }
//                     </button>
//                   </form>
//                 </div>
//               }

//               {
//                 lectures && lectures.length > 0 ?
//                 lectures.map((e, i) => {
//                   return (
//                     <>
//                       <div onClick={() => {
//                         fetchLecture(e.id)
//                         }} key={i} className={`lecNumber ${lecture._id === e._id && "active"}`}>
//                           {i+1}. {e.title}
//                       </div>
//                       {
//                         user && user.role === "admin" &&
//                         <button onClick={() => deleteLectureHandler(e._id)} className={styles.btn} style={{backgroundColor: "red"}}>Delete {e.title}</button>
//                       }
//                     </>
//                   )
//                 })
//                 :
//                 <p>No lectures yet !</p>
//               }
//             </div>
//           </div>
//         </>
//       }
//     </>
//   )
// }

// export default Lecture

import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import { server } from '@/config';
import { UserLayout } from '@/layout/UserLayout';
import Footer from '@/components/Footer';
import {TiTick} from "react-icons/ti"

const Lecture = () => {

  const { user, loading } = useUser();
  const router = useRouter();

  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [load, setLoad] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState({});

  const { id } = router.query;


  // Check if user is authorized to access the page
useEffect(() => {
  if (!id || loading) return; // Wait until user data and course id are available

  console.log("Authorization Check: ", {
    userRole: user?.role,
    userSubscription: user?.subscription,
    courseId: id,
  });

  if (
    user.role !== "admin" &&
    (!user.subscription || !user.subscription.includes(id))
  ) {
    console.log("Unauthorized: Redirecting to home");
    router.push("/");
  }
}, [id, user, loading, router]);

useEffect(() => {
  if (id) {
    fetchLectures();
    fetchProgress()
  }
}, [id]);  

if (loading) {
  return <Loading />; 
}
  

  // Fetch all lectures
  async function fetchLectures() {
    if (!id) return; // Ensure id is available before making the API call
    try {
      const { data } = await axios.get(`${server}/api/lectures/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      setLectures(data.lectures);
      setLoad(false);
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  // Fetch specific lecture details
  async function fetchLecture(id) {

    if (!id) {
      console.error("Lecture ID is undefined");
      return;
    }

    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
    }
  }

  // Handle form submission for adding a lecture
  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(`${server}/api/course/${id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideoPrev("");
      setVideo("");
    } catch (err) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  };

  // Handle video file change
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  // Handle lecture deletion
  const deleteLectureHandler = async (id) => {
    if (!id) {
      console.error("Lecture ID is undefined");
      return;
    }
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  

  async function fetchProgress () {
    
    try{
      const {data} = await axios.get(`${server}/api/user/progress?course=${id}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      setCompleted(data.courseProgressPercent)
      setCompletedLec(data.completedLectures)
      setLectLength(data.allLectures)
      setProgress(data.progress)

    }catch(err){
      console.log(err);
    }

  }

  const addProgress = async (lectureid) => {
    console.log("lecture completed");
    try{
      const {data} = await axios.post(`${server}/api/user/progress?course=${id}&lectureId=${lectureid}`, {}, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      console.log(data.message);
      fetchProgress()
    }catch(err){
      console.log(err);
    }
  }

// return (
//   <>
//     <UserLayout>
//       {load ? (
//         <Loading />
//       ) : (
//         <>

//           {/* adding progress feature */}

//           <div className={styles.progress}>
//             Lecture completed = {completedLec} out of {lectLength}
//             <br/>

//             <progress value={completed} max={100}></progress>{completed} %
//           </div>

//           {/* ended */}

//           <div className={styles.lecture_page}>
//             {/* Left Side - Video & Lecture Info */}
//             <div className={styles.left}>
//               {lecLoading ? (
//                 <Loading />
//               ) : lecture?.video ? (
//                 <>
//                   <div className={styles.videoContainer}>
//                     <video
//                       src={lecture.video}
//                       width="100%"
//                       height="auto"
//                       controls
//                       disablePictureInPicture
//                       controlsList="nodownload noremoteplayback"
//                       disableRemotePlayback
//                       autoPlay
//                       onEnded={() => {
//                         addProgress(lecture._id)
//                       }}
//                       className={styles.video}
//                     ></video>
//                   </div>
//                   <div className={styles.lectureInfo}>
//                     <h1 className={styles.lectureTitle}>{lecture.title}</h1>
//                     <p className={styles.lectureDesc}>{lecture.description}</p>
//                   </div>
//                 </>
//               ) : (
//                 <h1 className={styles.selectPrompt}>Please select a lecture</h1>
//               )}
//             </div>

//             {/* Right Side - Lecture List and Admin Panel */}
//             <div className={styles.right}>
//               {/* Admin Toggle Button */}
//               {user?.role === "admin" && (
//                 <button onClick={() => setShow(!show)} className={styles.btn}>
//                   {show ? "Close" : "Add Lecture"}
//                 </button>
//               )}

//               {/* Add Lecture Form */}
//               {show && (
//                 <div className={styles.lecture_form}>
//                   <h2>Add Lecture</h2>
//                   <form onSubmit={submitHandler}>
//                     <label htmlFor="title">Title</label>
//                     <input
//                       type="text"
//                       id="title"
//                       required
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                     />

//                     <label htmlFor="description">Description</label>
//                     <input
//                       type="text"
//                       id="description"
//                       required
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                     />

//                     <input
//                       type="file"
//                       accept="video/*"
//                       required
//                       onChange={changeVideoHandler}
//                     />

//                     {videoPrev && (
//                       <video
//                         src={videoPrev}
//                         width="100%"
//                         height="auto"
//                         controls
//                         className={styles.previewVideo}
//                       />
//                     )}

//                     <button type="submit" className={styles.btn} disabled={btnLoading}>
//                       {btnLoading ? "Please Wait..." : "Add"}
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {/* Lecture List */}
//               <div className={styles.lectureList}>
//                 {lectures && lectures.length > 0 ? (
//                   lectures.map((e, i) => (
//                     <div key={e._id} className={styles.lectureItem}>
//                       <div
//                         onClick={() => fetchLecture(e._id)}
//                         className={`${styles.lecNumber} ${
//                           lecture._id === e._id ? styles.active : ""
//                         }`}
//                       >
//                         {i + 1}. {e.title}
//                         {
//                           progress?.completedLectures?.includes(e._id) && 
//                           <span style={{
//                             backgroundColor: "green",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             width: "20px",
//                             height: "20px",
//                             borderRadius: "50%",
//                           }}>
//                             <TiTick color="white" size={12} />
//                           </span>

//                         }
//                       </div>

//                       {/* Delete Button (Admin Only) */}
//                       {user?.role === "admin" && (
//                         <button
//                           onClick={() => deleteLectureHandler(e._id)}
//                           className={styles.deleteBtn}
//                         >
//                           Delete
//                         </button>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <p className={styles.noLectures}>No lectures yet!</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </UserLayout>
//     <Footer />
//   </>
// );
return (
  // <>
  //   <UserLayout>
  //     {load ? (
  //       <Loading />
  //     ) : (
  //       <>
  //         {/* Enhanced progress with pie chart */}
  //         <div className={styles.progressWrapper}>
  //           <div className={styles.progressInfo}>
  //             <h3>Lecture Progress</h3>
  //             <p>{completedLec} out of {lectLength} lectures completed</p>
  //             <p>{completed}% done</p>
  //           </div>
  //           <div className={styles.pieContainer}>
  //             <svg width="100" height="100" viewBox="0 0 36 36" className={styles.circularChart}>
  //               <path
  //                 className={styles.circleBg}
  //                 d="M18 2.0845
  //                    a 15.9155 15.9155 0 0 1 0 31.831
  //                    a 15.9155 15.9155 0 0 1 0 -31.831"
  //                 fill="none"
  //                 stroke="#eee"
  //                 strokeWidth="2"
  //               />
  //               <path
  //                 className={styles.circle}
  //                 strokeDasharray={`${completed}, 100`}
  //                 d="M18 2.0845
  //                    a 15.9155 15.9155 0 0 1 0 31.831
  //                    a 15.9155 15.9155 0 0 1 0 -31.831"
  //                 fill="none"
  //                 stroke="#00acc1"
  //                 strokeWidth="2"
  //               />
  //             </svg>
  //           </div>
  //         </div>

  //         <div className={styles.lecture_page}>
  //           <div className={styles.left}>
  //             {lecLoading ? (
  //               <Loading />
  //             ) : lecture?.video ? (
  //               <>
  //                 <div className={styles.videoContainer}>
  //                   <video
  //                     src={lecture.video}
  //                     width="100%"
  //                     height="auto"
  //                     controls
  //                     disablePictureInPicture
  //                     controlsList="nodownload noremoteplayback"
  //                     disableRemotePlayback
  //                     autoPlay
  //                     onEnded={() => {
  //                       addProgress(lecture._id);
  //                     }}
  //                     className={styles.video}
  //                   ></video>
  //                 </div>
  //                 <div className={styles.lectureInfo}>
  //                   <h1 className={styles.lectureTitle}>{lecture.title}</h1>
  //                   <p className={styles.lectureDesc}>{lecture.description}</p>
  //                 </div>
  //               </>
  //             ) : (
  //               <h1 className={styles.selectPrompt}>Please select a lecture</h1>
  //             )}
  //           </div>

  //           <div className={styles.right}>
  //             {user?.role === "admin" && (
  //               <button onClick={() => setShow(!show)} className={styles.btn}>
  //                 {show ? "Close" : "Add Lecture"}
  //               </button>
  //             )}

  //             {show && (
  //               <div className={styles.lecture_form}>
  //                 <h2>Add Lecture</h2>
  //                 <form onSubmit={submitHandler}>
  //                   <label htmlFor="title">Title</label>
  //                   <input
  //                     type="text"
  //                     id="title"
  //                     required
  //                     value={title}
  //                     onChange={(e) => setTitle(e.target.value)}
  //                   />
  //                   <label htmlFor="description">Description</label>
  //                   <input
  //                     type="text"
  //                     id="description"
  //                     required
  //                     value={description}
  //                     onChange={(e) => setDescription(e.target.value)}
  //                   />
  //                   <input
  //                     type="file"
  //                     accept="video/*"
  //                     required
  //                     onChange={changeVideoHandler}
  //                   />
  //                   {videoPrev && (
  //                     <video
  //                       src={videoPrev}
  //                       width="100%"
  //                       height="auto"
  //                       controls
  //                       className={styles.previewVideo}
  //                     />
  //                   )}
  //                   <button type="submit" className={styles.btn} disabled={btnLoading}>
  //                     {btnLoading ? "Please Wait..." : "Add"}
  //                   </button>
  //                 </form>
  //               </div>
  //             )}

  //             <div className={styles.lectureList}>
  //               {lectures && lectures.length > 0 ? (
  //                 lectures.map((e, i) => (
  //                   <div key={e._id} className={styles.lectureItem}>
  //                     <div
  //                       onClick={() => fetchLecture(e._id)}
  //                       className={`${styles.lecNumber} ${
  //                         lecture._id === e._id ? styles.active : ""
  //                       }`}
  //                     >
  //                       {i + 1}. {e.title}
  //                       {progress?.completedLectures?.includes(e._id) && (
  //                         <span
  //                           style={{
  //                             backgroundColor: "green",
  //                             display: "flex",
  //                             justifyContent: "center",
  //                             alignItems: "center",
  //                             width: "20px",
  //                             height: "20px",
  //                             borderRadius: "50%",
  //                           }}
  //                         >
  //                           <TiTick color="white" size={12} />
  //                         </span>
  //                       )}
  //                     </div>
  //                     {user?.role === "admin" && (
  //                       <button
  //                         onClick={() => deleteLectureHandler(e._id)}
  //                         className={styles.deleteBtn}
  //                       >
  //                         Delete
  //                       </button>
  //                     )}
  //                   </div>
  //                 ))
  //               ) : (
  //                 <p className={styles.noLectures}>No lectures yet!</p>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </UserLayout>
  //   <Footer />
  // </>
  <>
  <UserLayout>
    {load ? (
      <Loading />
    ) : (
      <>
        <div className={styles.progressWrapper}>
          <div className={styles.progressInfo}>
            <h3>📈 Lecture Progress</h3>
            <p>{completedLec} out of {lectLength} lectures completed</p>
            <p>{completed}% done</p>
          </div>
          <div className={styles.pieContainer}>
            <svg width="100" height="100" viewBox="0 0 36 36" className={styles.circularChart}>
              <path
                className={styles.circleBg}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="2"
              />
              <path
                className={styles.circle}
                strokeDasharray={`${completed}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00c853"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        

        <div className={styles.lecture_page}>
          <div className={styles.left}>
            {lecLoading ? (
              <Loading />
            ) : lecture?.video ? (
              <>
                <div className={styles.videoContainer}>
                  <video
                    src={lecture.video}
                    width="100%"
                    height="auto"
                    controls
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback"
                    disableRemotePlayback
                    autoPlay
                    onEnded={() => {
                      addProgress(lecture._id);
                    }}
                    className={styles.video}
                  ></video>
                </div>
                <div className={styles.lectureInfo}>
                  <h1 className={styles.lectureTitle}>{lecture.title}</h1>
                  <p className={styles.lectureDesc}>{lecture.description}</p>
                </div>
              </>
            ) : (
              <h1 className={styles.selectPrompt}>🎯 Please select a lecture</h1>
            )}
          </div>

          <div className={styles.right}>
            {user?.role === "admin" && (
              <button onClick={() => setShow(!show)} className={styles.btn}>
                {show ? "Close" : "➕ Add Lecture"}
              </button>
            )}

            {show && (
              <div className={styles.lecture_form}>
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="video/*"
                    required
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      src={videoPrev}
                      width="100%"
                      height="auto"
                      controls
                      className={styles.previewVideo}
                    />
                  )}
                  <button type="submit" className={styles.btn} disabled={btnLoading}>
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            <div className={styles.lectureList}>
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={e._id} className={styles.lectureItem}>
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`${styles.lecNumber} ${lecture._id === e._id ? styles.active : ""}`}
                    >
                      {i + 1}. {e.title}
                      {progress?.completedLectures?.includes(e._id) && (
                        <span className={styles.tickCircle}>
                          <TiTick color="white" size={12} />
                        </span>
                      )}
                    </div>
                    {user?.role === "admin" && (
                      <button
                        onClick={() => deleteLectureHandler(e._id)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.noLectures}>📭 No lectures yet!</p>
              )}
            </div>
          </div>
        </div>
      </>
    )}
  </UserLayout>
  <Footer />
</>

);

};

export default Lecture; 
