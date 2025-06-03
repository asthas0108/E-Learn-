import { server } from "@/config";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const CourseContext = createContext();

export const CourseContextProvider = ({children}) => {

    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [myCourse, setMycourse] = useState([]);

    async function fetchCourses() {
        try{
            const {data} = await axios.get(`${server}/api/course/all`);

            setCourses(data.courses);
        }catch(err){
            console.log(err);
        }
    }


    async function fetchCourse(id) {
        try{
            const { data } = await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
        }catch(err){
            console.log(err);
        }
    }

    async function fetchMyCourse() {
        try{
            const {data}= await axios.get(`${server}/api/myCourses`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });

            setMycourse(data.courses);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchCourses();
        fetchMyCourse();
    }, []);

    return( 
        <CourseContext.Provider value={{courses, fetchCourses, fetchCourse, course, myCourse, fetchMyCourse}}>
            {children}
            <Toaster/>
        </CourseContext.Provider>
    )
};

export const useCourse = () => useContext(CourseContext);