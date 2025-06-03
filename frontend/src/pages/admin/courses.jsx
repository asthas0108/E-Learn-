import { useCourse } from '@/context/CourseContext';
import { useUser } from '@/context/UserContext';
import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import CourseCard from '@/components/CourseCard/CourseCard';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '@/config';
import { UserLayout } from '@/layout/UserLayout';

const categories = [
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Artificial Intelligence",
]

// const AdminCourses = () => {

//     const { user } = useUser();
//     const router = useRouter();

//     // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user && user.role !== "admin") {
//       router.push('/');
//     }
//   }, []);


//     const { courses, fetchCourses } = useCourse();

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");
//     const [price, setPrice] = useState("");
//     const [createdBy, setCreatedBy] = useState("");
//     const [duration, setDuration] = useState("");
//     const [image, setImage] = useState("");
//     const [imagePrev, setImagePrev] = useState("");
//     const [btnLoading, setBtnLoading] = useState(false);

//     useEffect(() => {
//         // if (!loading) {
//           fetchCourses();
//         // }
//       }, []);
    
//     //   if (loading) {
//     //     return <Loading/>; // Show a loading state until the user check is complete
//     //   }

//   return (
//     <AdminLayout>
//         <div className={styles.admin_courses}>
//             <div className={styles.left}>
//                 <h1>All Courses</h1>

//                 <div className={styles.dashboard_content}>
//                     {
//                         courses && courses.length > 0 ?
//                         courses.map((e) => {
//                             return (
//                                 <CourseCard key={e._id} course={e}/>
//                             )
//                         })
//                         :
//                         <p>No Courses Yet !!</p>
//                     }
//                 </div>
//             </div>

//             <div className={styles.right}>
//                 <div className={styles.add_course}>
//                     <div className={styles.course_form}>
//                         <h2>Add Course</h2>
//                         <form>
//                             <label htmlFor='text'>Title</label>
//                             <input 
//                                 type='text' 
//                                 required
//                                 value={title}
//                                 onChange={(e) => {
//                                     setTitle(e.target.value)
//                                 }}
//                             />

//                             <label htmlFor='text'>Description</label>
//                             <input 
//                                 type='text' 
//                                 required
//                                 value={description}
//                                 onChange={(e) => {
//                                     setDescription(e.target.value)
//                                 }}
//                             />

//                             <label htmlFor='text'>Price</label>
//                             <input 
//                                 type='number' 
//                                 required
//                                 value={price}
//                                 onChange={(e) => {
//                                     setPrice(e.target.value)
//                                 }}
//                             />

//                             <label htmlFor='text'>CreatedBy</label>
//                             <input 
//                                 type='text' 
//                                 required
//                                 value={createdBy}
//                                 onChange={(e) => {
//                                     setCreatedBy(e.target.value)
//                                 }}
//                             />

//                             <select value={category} onChange={e => setCategory(e.target.value)}>
//                                 <option value={""}>Select Category</option>
//                                 {
//                                     categories.map((e) => {
//                                         return(
//                                             <option value={e} key={e}>{e}</option>
//                                         )
//                                     })
//                                 }
//                             </select>

//                             <label htmlFor='text'>Duration</label>
//                             <input 
//                                 type='text' 
//                                 required
//                                 value={duration}
//                                 onChange={(e) => {
//                                     setDuration(e.target.value)
//                                 }}
//                             />
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </AdminLayout>
//   )
// }

// export default AdminCourses;

const AdminCourses = () => {
    const { user, loading } = useUser(); // Assuming `useUser` provides a loading state
    const router = useRouter();
  
    const { courses, fetchCourses } = useCourse();
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [duration, setDuration] = useState("");
    const [image, setImage] = useState("");
    const [imagePrev, setImagePrev] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
  
    useEffect(() => {
      if (!loading && user && user.role !== "admin") {
        router.push('/'); 
      }
    }, [loading, user]);
  
    useEffect(() => {
      if (!loading && user && user.role === "admin") {
        fetchCourses(); 
      }
    }, [loading, user]);
  
    if (loading) {
      return <Loading />; 
    }

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePrev(reader.result);
          setImage(file);
        }
      };

    const submitHandler = async(e) => {
        e.preventDefault();
        setBtnLoading(true);

        const myForm = new FormData();
        myForm.append("title", title);
        myForm.append("description", description);
        myForm.append("category", category);
        myForm.append("price", price);
        myForm.append("createdBy", createdBy);
        myForm.append("duration", duration);
        myForm.append("image", image);

        try{
            const {data} = await axios.post(`${server}/api/course/new`, myForm, {
                headers: {
                    token: localStorage.getItem("token"), 
                }
            });

            toast.success(data.message);
            setBtnLoading(false);
            await fetchCourses();

            setTitle("");
            setDescription("");
            setCategory("");
            setCreatedBy("");
            setDuration("");
            setPrice("");
            setImage("");
            setImagePrev("");

        }catch(err){
            toast.error(err.response.data.message);
        }
    }
  
    // return (
    //   <AdminLayout>
    //     <div className={styles.admin_courses}>
    //       <div className={styles.left}>
    //         <h1>All Courses</h1>
    //         <div className={styles.dashboard_content}>
    //           {courses && courses.length > 0 ? (
    //             courses.map((e) => <CourseCard key={e._id} course={e} />)
    //           ) : (
    //             <p>No Courses Yet !!</p>
    //           )}
    //         </div>
    //       </div>
    //       <div className={styles.right}>
    //         <div className={styles.add_course}>
    //           <div className={styles.course_form}>
    //             <h2>Add Course</h2>
    //             <form onSubmit={submitHandler}>
    //               <label htmlFor="text">Title</label>
    //               <input
    //                 type="text"
    //                 required
    //                 value={title}
    //                 onChange={(e) => setTitle(e.target.value)}
    //               />
    //               <label htmlFor="text">Description</label>
    //               <input
    //                 type="text"
    //                 required
    //                 value={description}
    //                 onChange={(e) => setDescription(e.target.value)}
    //               />
    //               <label htmlFor="text">Price</label>
    //               <input
    //                 type="number"
    //                 required
    //                 value={price}
    //                 onChange={(e) => setPrice(e.target.value)}
    //               />
    //               <label htmlFor="text">CreatedBy</label>
    //               <input
    //                 type="text"
    //                 required
    //                 value={createdBy}
    //                 onChange={(e) => setCreatedBy(e.target.value)}
    //               />
    //               <select value={category} onChange={(e) => setCategory(e.target.value)}>
    //                 <option value={""}>Select Category</option>
    //                 {categories.map((e) => (
    //                   <option value={e} key={e}>
    //                     {e}
    //                   </option>
    //                 ))}
    //               </select>
    //               <label htmlFor="text">Duration</label>
    //               <input
    //                 type="text"
    //                 required
    //                 value={duration}
    //                 onChange={(e) => setDuration(e.target.value)}
    //               />

    //               <input type='file' required onChange={changeImageHandler}/>
    //               {
    //                 imagePrev && <img src={imagePrev} width={300}/>
    //               }
    //               <button type='submit' disabled={btnLoading} className={styles.btn}>
    //                 {
    //                     btnLoading ? "Please Wait..." : "Add"
    //                 }
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </AdminLayout>
    // );
  
  return (
  <UserLayout>
    <AdminLayout>
    <div className={styles.admin_courses}>
      {/* Left side: Course list */}
      <div className={styles.left}>
        <h1 className={styles.heading}>All Courses</h1>
        <div className={styles.dashboard_content}>
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className={styles.no_courses}>No Courses Yet!!</p>
          )}
        </div>
      </div>

      {/* Right side: Add course form */}
      <div className={styles.right}>
        <div className={styles.course_form}>
          <h2>Add New Course</h2>
          <form onSubmit={submitHandler}>
            <label>Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Created By</label>
            <input
              type="text"
              required
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            />
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            <label>Duration</label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <label>Course Poster</label>
            <input type="file" required onChange={changeImageHandler} />

            {imagePrev && (
              <img
                src={imagePrev}
                alt="Preview"
                className={styles.image_preview}
              />
            )}

            <button type="submit" disabled={btnLoading} className={styles.btn}>
              {btnLoading ? "Please Wait..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
  </UserLayout>
);

  };
  
  export default AdminCourses;
  