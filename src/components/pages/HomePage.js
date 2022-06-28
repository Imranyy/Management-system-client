import { useState,useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const HomePage=({setAuth})=>{
    const [name,setName]=useState('');
    const getName=async()=>{
        try {
            const url="http://localhost:5000/api/userdata"
            const response=await fetch(url,{
                method:"GET",
                headers:{
                    authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            const parseRes= await response.json();
            setName(parseRes.username)
        } catch (err) {
            console.log(err.message) 
        }
    };
    const logout=async(e)=>{
        e.preventDefault()
        try {
            localStorage.removeItem('token')
            setAuth(false)
            alert('logout successfully')
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(()=>{
        getName();
    },[])
    return(
        <div>
            <button onClick={(e)=>logout(e)}>LogOut</button>
            <p>{name}</p>

            <Footer/>
        </div>
    )
};

export default HomePage;