import React from 'react';
import styles from "./styles.module.css";
import { useCourse } from '@/context/CourseContext';
import CourseCard from '@/components/CourseCard/CourseCard';
import { UserLayout } from '@/layout/UserLayout';

const Dashboard = () => { 

    const {myCourse} = useCourse();

  return (
    <UserLayout>
        <div className={styles.dashboard}>
            <h2>All Enrolled Courses</h2>
            <div className={styles.content}>
                {
                    myCourse && myCourse.length > 0 ?
                    myCourse.map((e) => {
                        return <CourseCard key={e._id} course={e}/>
                    })
                    :
                    <p>No Courses Enrolled</p>
                }
            </div>
        </div>
    </UserLayout>
  )
}

export default Dashboard;