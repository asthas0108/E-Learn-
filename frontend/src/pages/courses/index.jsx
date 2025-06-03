import Footer from '@/components/Footer';
import { UserLayout } from '@/layout/UserLayout';
import React from 'react';
import styles from "./styles.module.css";
import { useCourse } from '@/context/CourseContext';
import CourseCard from '@/components/CourseCard/CourseCard';

const Courses = () => {

  const {courses} = useCourse();

  return (
    <>
      <UserLayout>
        <div className={styles.courses}>
          <h2>Available Courses</h2>

          <div className={styles.course_container}>
            {
              courses && courses.length > 0 ? 
                courses.map((e) => {
                  return (
                    <CourseCard key={e._id} course={e}/>
                  )
                })
                :
                <p>No Courses Available Yet !</p>
            }
          </div>
        </div>
      </UserLayout>
      <Footer/>
    </>
  )

  
}

export default Courses;