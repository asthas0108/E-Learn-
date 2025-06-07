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
      <div className={styles.card}>
        <div className={styles.left}>
          <img src="/assets/log.png" alt="login" className={styles.image} />
          <div className={styles.overlay}>
            {/* <h2>Lorem Ipsum is simply</h2>
            <p>Lorem Ipsum is simply</p> */}
          </div>
        </div>

        <div className={styles.right}>
          <h2 className={styles.welcome}>Welcome to ElevateU..!</h2>
          <div className={styles.toggle}>
            <button className={`${styles.tab} ${styles.active}`}>Register</button>
            <button className={styles.tab} onClick={() => router.push('/login')}>Login</button>
          </div>

          <p className={styles.description}>
            Enter your details !
          </p>

          <form className={styles.form} onSubmit={submitHandler}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type='password'
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <span onClick={() => setShowPassword(!showPassword)} className={styles.eye}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span> */}
            </div>

            {/* <div className={styles.options}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <span className={styles.forgot}>Forgot Password ?</span>
            </div> */}

            <button type="submit" className={styles.loginBtn} disabled={btnLoading}>
              {btnLoading ? 'Please Wait...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;