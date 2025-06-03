import React, { useState } from 'react';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { UserLayout } from '@/layout/UserLayout';
import { useUser } from '@/context/UserContext';


const Register = () => {

    const router = useRouter();

    const {registerUser, btnLoading} = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async(e) => {
        e.preventDefault();
        await registerUser(name, email, password);
    }

  return (
    <div className={styles.container}>
        <div className={styles.form}>
            <h2 style={{textAlign: "center"}}>Register</h2>

            <form onSubmit={submitHandler}>
                <div>
                    <input 
                        type='text' 
                        id='name' 
                        placeholder='Enter name' 
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>

                <div>
                    <input 
                        type='email' 
                        id='email' 
                        placeholder='Enter email' 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                    />
                </div>

                <div>
                    <input 
                        type='password' 
                        id='password' 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder='Enter password' 
                        required
                    />
                </div>

                <button type='submit' disabled={btnLoading} className={styles.btn}>
                    {btnLoading ? "Please Wait..." : "Register"}
                </button>
            </form>
            <p onClick={() => {
                router.push("/login")
            }} style={{color: "blue", cursor: "pointer", textAlign: "center"}}>
                Already have an account ?
            </p>
        </div>
    </div>
  )
}

export default Register;