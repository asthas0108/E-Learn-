import React, { useEffect, useState, useRef } from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useCourse } from '@/context/CourseContext';
import { useUser } from '@/context/UserContext';
import Loading from '@/components/Loading';
import { server } from '@/config';
import { UserLayout } from '@/layout/UserLayout';
import Footer from '@/components/Footer';

const StudyCourse = () => {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic route parameter
  const { fetchCourse, course } = useCourse();
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true); // Track the first render to avoid repeated calls

  useEffect(() => {
    // Exit early if `id` or `user` is not available
    if (!id || !user) return;

    // Avoid re-fetching on re-renders, make sure it's the first fetch
    if (isFirstRender.current) {
      // Redirect unauthorized users
      if (user.role !== "admin" && !user.subscription?.includes(id)) {
        router.push("/"); // Redirect to the homepage
        return;
      }

      // Track that the fetch has been triggered to avoid multiple fetches
      isFirstRender.current = false;

      const fetchData = async () => {
        try {
          await fetchCourse(id); // Fetch course details
        } catch (err) {
          console.error("Error fetching course:", err);
        } finally {
          setLoading(false); // Stop loading regardless of success or failure
        }
      };

      fetchData();
    }
  }, [id, user, fetchCourse, router]); // Dependency array ensures `useEffect` only runs when `id`, `user`, or `router` changes

  // If still loading or no course data, show loading spinner
  if (loading || !course) {
    return <Loading />;
  }

  return (
    <>
      <UserLayout>
        {/* <div className={styles.study_course}>
          <img src={`${server}/${course.image}`} width={350} alt={course.title} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>By - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>

          <a href={`/lecture/${course._id}`} className={styles.btn}>
            <h2>Lectures</h2>
          </a>
        </div> */}
        {/* <div className={styles.study_course}>
          <div className={styles.course_image}>
            <img src={`${server}/${course.image}`} alt={course.title} />
          </div>
          <div className={styles.course_details}>
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>Duration: {course.duration} weeks</h5>
            <h5>Instructor: {course.createdBy}</h5>
            <a href={`/lecture/${course._id}`}>
              <button className={styles.btn}>Enroll Now</button>
            </a>
          </div>
        </div> */}


        <div className={styles.study_course}>
        <div className={styles.course_image}>
          <img src={course.image} alt={course.title} />
        </div>

        <div className={styles.course_details}>
          <h2>{course.title}</h2>
          <p className={styles.description}>{course.description}</p>

          <div className={styles.meta}>
            <span>📅 Duration: {course.duration} weeks</span>
            <span>👨‍🏫 Instructor: {course.createdBy}</span>
          </div>

          <a href={`/lecture/${course._id}`} className={styles.link}>
            <button className={styles.btn}>Enroll Now</button>
          </a>
        </div>
      </div>
      </UserLayout> 
      <Footer />
    </> 
  );
};

export default StudyCourse;


// import React, { useEffect, useState } from 'react';
// import styles from "./styles.module.css";
// import { useRouter } from 'next/router';
// import { useCourse } from '@/context/CourseContext';
// import { useUser } from '@/context/UserContext';
// import Loading from '@/components/Loading';
// import { server } from '@/config';
// import { UserLayout } from '@/layout/UserLayout';
// import Footer from '@/components/Footer';

// const StudyCourse = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get the dynamic route parameter
//   const { fetchCourse, course } = useCourse();
//   const { user } = useUser();

//   const [loading, setLoading] = useState(true);

//   // Single `useEffect` that ensures hooks execute in the correct order
//   useEffect(() => {
    
//       if (!id || !user) {
//         return; // Exit early if `id` or `user` is unavailable
//       }

//       // Redirect unauthorized users
//       if (user.role !== "admin" && !user.subscription?.includes(id)) {
//         router.push("/"); // Redirect to the homepage
//         return;
//       }
//       const fetchData = async () => {
//       try {
//         await fetchCourse(id); // Fetch course details
//       } catch (err) {
//         console.error("Error fetching course:", err);
//       } finally {
//         setLoading(false); // Stop the loading spinner
//       }
//     };

//     fetchData();
//   }, [id, user, fetchCourse, router]);

//   // Display a loading spinner until the course data is ready
//   if (loading || !course) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <UserLayout>
//       <div className={styles.study_course}>
//       <img src={`${server}/${course.image}`} width={350} alt={course.title} />
//       <h2>{course.title}</h2>
//       <h4>{course.description}</h4>
//       <h5>By - {course.createdBy}</h5>
//       <h5>Duration - {course.duration} weeks</h5>

//       <a href={`/lecture/${course._id}`} className={styles.btn}>
//         <h2>Lectures</h2>
//       </a>
//     </div>
//     </UserLayout>
//     <Footer/>
//     </>
//   );
// };

// export default StudyCourse;


// // import React, { useEffect, useState } from 'react';
// // import styles from "./styles.module.css";
// // import { useParams } from 'react-router-dom';
// // import { useCourse } from '@/context/CourseContext';
// // import { useRouter } from 'next/router';
// // import { useUser } from '@/context/UserContext';
// // import Loading from '@/components/Loading';

// // const StudyCourse = () => {

// //     // const params = useParams();
    
// //     const router = useRouter();
// //     const { id } = router.query;

// //     const {fetchCourse, course} = useCourse();
// //     const {user} = useUser();

// //     // extra adding
// //     const [loading, setLoading] = useState(true);

// //   // useEffect(() => {
// //   //   // Ensure we only redirect once user and id are defined
// //   //   if (user && id) {
// //   //     if (user.role !== "admin" && !user.subscription?.includes(id)) {
// //   //       router.push("/"); // Redirect if the user doesn't have access
// //   //     } else {
// //   //       fetchCourse(id); // Fetch the course details
// //   //       setLoading(false);
// //   //     }
// //   //   }
// //   // }, [user, id]);

// //   // useEffect(() => {
// //   //   // Wait for `id` and `user` to become available
// //   //   if (id && user) {
// //   //     // Redirect if the user is unauthorized
// //   //     if (user.role !== "admin" && !user.subscription?.includes(id)) {
// //   //       router.push("/"); // Redirect unauthorized users
// //   //       return;
// //   //     }

// //   //     // Fetch course details if the user is authorized
// //   //     fetchCourse(id)
// //   //       .then(() => setLoading(false))
// //   //       .catch((error) => {
// //   //         console.error("Error fetching course:", error);
// //   //         setLoading(false);
// //   //       });
// //   //   }
// //   // }, [id, user, fetchCourse, router]);
// //   useEffect(() => {
// //     // Ensure `id` and `user` are defined before proceeding
// //     if (!id || !user) {
// //       return;
// //     }

// //     // Redirect unauthorized users
// //     if (user.role !== "admin" && !user.subscription?.includes(id)) {
// //       router.push("/"); // Redirect unauthorized users
// //       return;
// //     }

// //     // Fetch course details
// //     const fetchData = async () => {
// //       try {
// //         await fetchCourse(id);
// //       } catch (err) {
// //         console.error("Error fetching course:", err);
// //       } finally {
// //         setLoading(false); // Stop loading regardless of success or failure
// //       }
// //     };

// //     fetchData();
// //   }, [id, user, fetchCourse, router]);

// //   if (loading || !course) {
// //     return <Loading />; // Display a loading spinner while waiting for data
// //   }

// //     // if(user && user.role !== "admin" && !user.subscription.includes(params.id)){
// //     //     router.push("/");
// //     // }

// //     useEffect(() => {
// //         fetchCourse();
// //     }, []);

// //   return (
// //     <>
// //         {
// //             course && <div className={styles.study_course}>
// //                 <img src={`${server}/${course.image}`} width={350}/>

// //                 <h2>{course.title}</h2>
// //                 <h4>{course.description}</h4>
// //                 <h5>By- {course.createdBy}</h5>
// //                 <h5>Duration- {course.duration} weeks</h5>

// //                 <a href={`/lectures/${course._id}`}>
// //                     <h2>Lectures</h2>
// //                 </a>
// //             </div>
// //         }
// //     </>
// //   )
// // }

// // export default StudyCourse



