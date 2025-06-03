import axios from "axios";
import styles from "./styles.module.css";
import React, { useEffect, useState } from 'react'
import { server } from "@/config";
import { useRouter } from "next/router";
import AdminLayout from "@/layout/AdminLayout";
import { UserLayout } from "@/layout/UserLayout";
import toast from "react-hot-toast";

const AdminUsers = ({user}) => {

    const router = useRouter();

    if(user && user.role !== "admin"){
        router.push('/'); 
    }

    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        try{
            const {data} = await axios.get(`${server}/api/users`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })

            setUsers(data.users)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
    },[]);

    const updateRole = async(id) => {
        if(confirm("Are you sure you want to update this user role ?")){
            try{
                const {data} = await axios.put(`${server}/api/user/${id}`, {}, {
                    headers: {
                        token: localStorage.getItem("token")
                    },
                })
                toast.success(data.message);
                fetchUsers()
            }catch(err){
                toast.error(err.reponse.data.message);
            }
        }
    }

  return (
    // <UserLayout>
    //     <AdminLayout>
    //         <div className={styles.users}>
    //             <h1>ALL USERS</h1>
    //             <table border={"black"}>
    //                 <thead>
    //                     <tr>
    //                         <td>#</td>
    //                         <td>name</td>
    //                         <td>email</td>
    //                         <td>role</td>
    //                         <td>update role</td>
    //                     </tr>
    //                 </thead>

    //                 {
    //                     users && users.map((e,i) => (
    //                         <tbody key={e._id}>
    //                             <tr>
    //                                 <td>{i+1}</td>
    //                                 <td>{e.name}</td>
    //                                 <td>{e.email}</td>
    //                                 <td>{e.role}</td>
    //                                 <td>
    //                                     <button onClick={() => {
    //                                         updateRole(e._id)
    //                                     }} className="">Update</button>
    //                                 </td>
    //                             </tr>
    //                         </tbody>
    //                     ))
    //                 }
    //             </table>
    //         </div>
    //     </AdminLayout>
    // </UserLayout>

    <UserLayout>
  <AdminLayout>
    <div className={styles.users}>
      <div className={styles.usersContainer}>
        <h1>All Users</h1>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Update Role</td>
            </tr>
          </thead>
          <tbody>
            {users.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>
                  <button onClick={() => updateRole(e._id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</UserLayout>

  )
}

export default AdminUsers;