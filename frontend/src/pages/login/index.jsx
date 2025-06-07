import React, { useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import { useCourse } from '@/context/CourseContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const router = useRouter();
  const { btnLoading, loginUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { fetchMyCourse } = useCourse();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, fetchMyCourse);
  };

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
            <button className={`${styles.tab} ${styles.active}`}>Login</button>
            <button className={styles.tab} onClick={() => router.push('/register')}>Register</button>
          </div>

          <p className={styles.description}>
            Enter your details to login !
          </p>

          <form className={styles.form} onSubmit={submitHandler}>
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
                type={showPassword ? 'text' : 'password'}
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
              {btnLoading ? 'Please Wait...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
