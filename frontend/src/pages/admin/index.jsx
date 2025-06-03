import Footer from '@/components/Footer';
import { server } from '@/config';
import { useUser } from '@/context/UserContext';
import AdminLayout from '@/layout/AdminLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import Loading from '@/components/Loading';
import { UserLayout } from '@/layout/UserLayout';

// const AdminDashboard = () => {

//   const { user } = useUser();
//   const router = useRouter();


//   useEffect(() => {
//       if (user && user.role !== "admin") {
//         router.push('/');
//       }
//     }, []);

//   const [ stats, setStats ] = useState([]);

//   async function fetchStats () {
//     try{
//       const { data } = await axios.get(`${server}/api/stats`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         }
//       });

//       setStats(data.stats);
//     }catch(err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   // useEffect(() => {
//   //   if (!loading) {
//   //     fetchStats();
//   //   }
//   // }, [loading]);

//   // if (loading) {
//   //   return <Loading/>; // Show a loading state until the user check is complete
//   // }

//   return(
//     <>
//       <AdminLayout>
//         <div className={styles.main_content}>
//           <div className={styles.box}>
//             <p>Total Courses</p>
//             <p>{stats.totalCourses}</p>
//           </div>

//           <div className={styles.box}>
//             <p>Total Lectures</p>
//             <p>{stats.totalLectures}</p>
//           </div>

//           <div className={styles.box}>
//             <p>Total Users</p>
//             <p>{stats.totalUsers}</p>
//           </div>
//         </div>
//       </AdminLayout>
//       <Footer />
//     </>
//   );
// };

// export default AdminDashboard;

const AdminDashboard = () => {
  const { user, loading } = useUser(); // Assuming `useUser` provides a loading state
  const router = useRouter();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!loading && user && user.role !== "admin") {
      router.push('/'); // Redirect if user is not admin
    }
  }, [loading, user]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!loading && user && user.role === "admin") {
      fetchStats(); // Fetch stats only if user is admin
    }
  }, [loading, user]);

  if (loading) {
    return <Loading />; // Show loading spinner while user data is loading
  }

  // return (
  //   <>
  //     <AdminLayout>
  //       <div className={styles.main_content}>
  //         <div className={styles.box}>
  //           <p>Total Courses</p>
  //           <p>{stats.totalCourses}</p>
  //         </div>
  //         <div className={styles.box}>
  //           <p>Total Lectures</p>
  //           <p>{stats.totalLectures}</p>
  //         </div>
  //         <div className={styles.box}>
  //           <p>Total Users</p>
  //           <p>{stats.totalUsers}</p>
  //         </div>
  //       </div>
  //     </AdminLayout>
  //     <Footer />
  //   </>
  // );
const StatBox = ({ label, value }) => (
  <div className={styles.box}>
    <p className={styles.label}>{label}</p>
    <p className={styles.value}>{value}</p>
  </div>
);
return (
  <>
    <UserLayout>
      <AdminLayout>
      <div className={styles.main_content}>
        <StatBox label="Total Courses" value={stats.totalCourses} />
        <StatBox label="Total Lectures" value={stats.totalLectures} />
        <StatBox label="Total Users" value={stats.totalUsers} />
      </div>
    </AdminLayout>
    </UserLayout>
    <Footer />
  </>
);

// Optionally extract to a small component


};

export default AdminDashboard;

