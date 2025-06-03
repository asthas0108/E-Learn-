import React from 'react';
import styles from "./styles.module.css";
import { server } from '@/config';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCourse } from '@/context/CourseContext';

const CourseCard = ({course}) => {

  const { user, isAuth } = useUser();

  const router = useRouter();

  const {fetchCourses} = useCourse();

  const deleteHandler = async (id) => {
    if(confirm("Are you sure you want to delete this course ?")){
      try{
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          }
        }); 
  
        toast.success(data.message);
        fetchCourses();
      }catch(err) {
        toast.error(err.response.data.message);
      }
    }
  }

  // return (
  //   <div className={styles.course_card}>
  //       <img src={`${server}/${course.image}`} className={styles.course_image}/>

  //       <h3>{course.title}</h3>
  //       <p>Instructor - {course.createdBy}</p>

  //       <p>Duration - {course.duration} weeks</p>
  //       <p>Price - ₹{course.price}</p>
        
  //       {
  //         isAuth ? 
  //         <>

  //           { user && user.role !== "admin" ? 
  //             (
  //               <>
  //                 {
  //                   user.subscription.includes(course._id) ? 
  //                   (
  //                     <button onClick={() => {
  //                       router.push(`/courseStudy/${course._id}`)
  //                     }} className={styles.btn}>Study</button>
  //                   )
  //                   :
  //                   (
  //                     <button onClick={() => {
  //                       router.push(`/courseDescription/${course._id}`)
  //                     }} className={styles.btn}>Get Started</button>
  //                   )
  //                 }
  //               </>
  //             )
  //             :
  //             (
  //               <button onClick={() => {
  //                 router.push(`/courseStudy/${course._id}`)
  //               }} className={styles.btn}>Study</button>
  //             )
  //           }
  //         </>
  //         :
  //         <button onClick={() => {
  //           router.push("/login")
  //         }} className={styles.btn}>Get Started</button>
  //       }

  //       <br/>

  //       {
  //         user && user.role === "admin" && 
  //         <button onClick={() => deleteHandler(course._id)} className={styles.btn}>Delete</button>
  //       }
  //   </div>
  // )

  return (
  <div className={styles.course_card}>
    <img
      // src={`${server}/${course.image}`}
      src={course.image}
      alt="Course"
      className={styles.course_image}
    />

    <h3>{course.title}</h3>
    <p>Instructor - {course.createdBy}</p>
    <p>Duration - {course.duration} weeks</p>
    <p>Price - ₹{course.price}</p>

    {isAuth ? (
      <>
        {user && user.role !== "admin" ? (
          <div className={styles.btn_container}>
            {user.subscription.includes(course._id) ? (
              <button
                onClick={() => {
                  router.push(`/courseStudy/${course._id}`);
                }}
                className={styles.btn}
              >
                Study
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push(`/courseDescription/${course._id}`);
                }}
                className={styles.btn}
              >
                Get Started
              </button>
            )}
          </div>
        ) : (
          <div className={styles.btn_container}>
            <button
              onClick={() => {
                router.push(`/courseStudy/${course._id}`);
              }}
              className={styles.btn}
            >
              Study
            </button>
          </div>
        )}
      </>
    ) : (
      <div className={styles.btn_container}>
        <button
          onClick={() => {
            router.push("/login");
          }}
          className={styles.btn}
        >
          Get Started
        </button>
      </div>
    )}

    {user && user.role === "admin" && (
      <div className={styles.btn_container}>
        <button
          onClick={() => deleteHandler(course._id)}
          className={`${styles.btn} ${styles.delete_btn}`}
        >
          Delete
        </button>
      </div>
    )}
  </div>
);


}

export default CourseCard;