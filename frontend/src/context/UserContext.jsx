import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { server } from '@/config/index';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  
  const router = useRouter();
  const [user, setUser] = useState([]); 
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email, password });
      toast.success(data.message);
      localStorage.setItem('token', data.token);
      setUser(data.user); 
      setIsAuth(true);
      router.push('/');

      fetchMyCourse();

    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      setIsAuth(false);
      setBtnLoading(false);
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerUser(name, email, password) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, { name, email, password });
      toast.success(data.message);
      localStorage.setItem('activationToken', data.activationToken);
      setBtnLoading(false);
      router.push('/verify');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } 
  }

  async function fetchUser() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token },
      });
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  async function verifyOTP(OTP) {

    setBtnLoading(true);

    const activationToken = localStorage.getItem("activationToken")

    try{
      const { data } = await axios.post(`${server}/api/user/verify`, { OTP, activationToken });
      toast.success(data.message);
      router.push("/login");
      localStorage.clear();

      setBtnLoading(false);

    }catch(err){
      setBtnLoading(false);
      toast.error(err.response?.data?.message || 'Verification failed');
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, loginUser, btnLoading, loading, registerUser, verifyOTP, fetchUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
