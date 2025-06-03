import React, { useState } from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { useCourse } from '@/context/CourseContext';
 

const Login = () => {

    const router = useRouter();

    const { btnLoading, loginUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { fetchMyCourse } = useCourse();

    const submitHandler = async(e) => {
        e.preventDefault();
        await loginUser(email, password, fetchMyCourse);
    }

  return (
    <div className={styles.container}>
        <div className={styles.form}>
            <h1 style={{textAlign: "center"}}>Login Here !</h1>

            <div className={styles.main}>
                <div className={styles.left}>
                    <form onSubmit={submitHandler}>
                        <div>
                            <input 
                                type='email' 
                                id='email' 
                                value={email}
                                placeholder='Enter email' 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                            />
                        </div>

                        <div>
                            <input  
                                type='password'   
                                id='password'  
                                value={password}
                                placeholder='Enter password'  
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button disabled={btnLoading} type='submit' className={styles.btn}>{btnLoading ? "Please Wait..." : "Login"}</button>
                    </form>
                    <p onClick={() => {
                        router.push("/register")
                    }} style={{color: "blue", cursor: "pointer", textAlign: "center"}}>
                        Don't have an account ?
                    </p>
                </div>
                <div className={styles.right}>
                    <img src='/assets/login.png'/>
                </div>
            </div>

        </div>
    </div>
  )

  
}

export default Login;