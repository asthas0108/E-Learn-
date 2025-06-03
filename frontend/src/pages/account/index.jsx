import React from 'react';
import styles from "./styles.module.css";
import { UserLayout } from '@/layout/UserLayout';
import Footer from '@/components/Footer';
import { MdDashboard } from "react-icons/md";
import { useUser } from '@/context/UserContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Account = () => {

    const router = useRouter();

    const { user, setIsAuth, setUser } = useUser();

    const logoutHandler = () => {
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success("Logged Out !");
        router.push("/login");
    };

//   return (
//     <>
//         <UserLayout>
//             {
//                 user && (
//                     <div className={styles.profile}>
//                         <h2>My Profile</h2>
//                         <div className={styles.profile_info}>
//                             <p>
//                                 <strong>Name - { user.name }</strong>
//                             </p>
//                             <p>
//                                 <strong>Email - { user.email }</strong>
//                             </p>
//                             <button onClick={() => {
//                                 router.push(`/${user._id}/dashboard`)
//                             }} className={styles.btn}>Dashboard</button>

//                             <br/>

//                             {
//                                 user && user.role === "admin" &&
//                                 <button onClick={() => {
//                                     router.push(`/admin`)
//                                 }} className={styles.btn}>Admin Dashboard</button>
//                             }

//                             <br/>

//                             <button onClick={logoutHandler} className={styles.btn} style={{backgroundColor: "red"}}>Logout</button>
//                         </div>
//                     </div>
//                 )
//             }
//         </UserLayout>
//         <Footer/>
//     </>
//   )

return (
  <>
    <UserLayout>
      {user && (
        <div className={styles.profile}>
          <h2 className={styles.title}>My Profile</h2>
          <div className={styles.profile_info}>
            <div className={styles.info_row}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{user.name}</span>
            </div>
            <div className={styles.info_row}>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{user.email}</span>
            </div>

            <div className={styles.buttons}>
              <button
                onClick={() => router.push(`/dashboard/${user._id}`)}
                className={styles.btn}
              >
                Dashboard
              </button>

              {user.role === "admin" && (
                <button
                  onClick={() => router.push(`/admin`)}
                  className={styles.btn_secondary}
                >
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={logoutHandler}
                className={styles.btn_danger}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
    <Footer />
  </>
);

}

export default Account;