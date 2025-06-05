import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import { useParams } from 'next/navigation';
import { useCourse } from '@/context/CourseContext';
import { server } from '@/config';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '@/components/Loading';
import { UserLayout } from '@/layout/UserLayout';
import Footer from '@/components/Footer';

const CourseDescription = () => {

    // const params = useParams();
    // console.log(params.id);

    const router = useRouter();
    const {id} = router.query;

    const {fetchUser} = useUser();

    const {fetchCourse, course, fetchCourses, fetchMyCourse} = useCourse();
    const {user} = useUser();

    const [loading, setLoading] = useState(false); 

    useEffect(() => {
      fetchCourse(id)
    }, []);

    const checkOutHandler = async () => {
      try{
        const token = localStorage.getItem("token");
        setLoading(true);

        const { data: {order} } = await axios.post(`${server}/api/course/checkout/${id}`, {}, {
          headers:{
            token,
          }
        });

        const options = {
          key:  process.env.NEXT_PUBLIC_RAZORPAY_KEY,
          amount: order.id,
          currency: "INR",
          name: "E-Learning",
          description: "test",
          order_id: order.id,

          handler: async function(response) {
            const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = response;

            try{
              const {data} = await axios.post(`${server}/api/verification/${id}`, {
                razorpay_order_id, 
                razorpay_payment_id, 
                razorpay_signature,
              }, {
                headers: {
                  token,
                }
              });

              await fetchUser();
              await fetchCourses();

              await fetchMyCourse();
              toast.success(data.message);

              setLoading(false);

              router.push(`/paymentSuccess/${razorpay_payment_id}`);
            }catch(err) {
              toast.error(err.response.data.message);
            }
          },
          theme: {
            color: "#8a4baf",
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      }catch(err){
        console.log(err);
      }
    }
    
  // return (
  //   <>
  //     <UserLayout>
  //     {
  //       loading ? 
  //        <Loading/>
  //        :
  //        <>
  //         {
  //           course && (
  //             <div className={styles.description}>
  //               <div className={styles.header}>
  //                 <img src={`${server}/${course.image}`} className={styles.image}/>

  //                 <div className={styles.info}>
  //                   <h2>{course.title}</h2>
  //                   <p>Instructor - {course.createdBy}</p>
  //                   <p>Duration - {course.duration} weeks</p>
  //                 </div>

  //               </div>

  //               <p>{course.description}</p>
                
  //               <p>Get started with course at just ₹{course.price}</p>

  //               {
  //                 user && user.subscription?.includes(course._id) ?
  //                 <button onClick={() => {
  //                   router.push(`/courseStudy/${course._id}`)
  //                 }} className={styles.btn}>Study</button>
  //                 :
  //                 <button onClick={checkOutHandler} className={styles.btn}>Buy Now</button>
  //               }
  //             </div>
  //           )
  //         }
  //       </>
  //     }
  //     </UserLayout>
  //     <Footer/>
  //   </>
  // )

  return(
    <>
  <UserLayout>
    {loading ? (
      <Loading />
    ) : (
      <>
        {course && (
          <section className={styles.description}>
            <div className={styles.header}>
              <img
                src={course.image}
                alt={course.title}
                className={styles.image}
              />

              <div className={styles.info}>
                <h2>{course.title}</h2>
                <p className={styles.meta}>
                  <strong>Instructor:</strong> {course.createdBy}
                </p>
                <p className={styles.meta}>
                  <strong>Duration:</strong> {course.duration} weeks
                </p>
                <p className={styles.meta}>
                  <strong>Price:</strong> ₹{course.price}
                </p>
              </div>
            </div>

            <p className={styles.courseDesc}>{course.description}</p>

            <div className={styles.buttonContainer}>
              {user && user.subscription?.includes(course._id) ? (
                <button
                  onClick={() => router.push(`/courseStudy/${course._id}`)}
                  className={styles.btn}
                >
                  📘 Start Learning
                </button>
              ) : (
                <button onClick={checkOutHandler} className={styles.btn}>
                  💳 Buy Now
                </button>
              )}
            </div>
          </section>
        )}
      </>
    )}
  </UserLayout>
  <Footer />
</>

  )
}

export default CourseDescription; 