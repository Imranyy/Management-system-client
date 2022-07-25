import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import toast from "react-hot-toast";

const customStyles={
    content:{
      background:'#f2f2f2',
      top:'12%',
      left:'35px',
      bottom:'auto',
      transform:'translate(-50%.-50%)'
    },
  }

const User=({setAuth})=>{
  
  const [isUi,setIsUi]=useState(false);
    const name=localStorage.getItem('name');
    const id=localStorage.getItem('id')
    const logout=async(e)=>{
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('password')
            localStorage.removeItem('pic')
            setAuth(false)
            toast.error("logout successfully")
        } catch (err) {
            console.log(err.message)
        }
    }
    const adminlogout=async(e)=>{
      try {
          localStorage.removeItem('Admintoken')
          setIsUi(false)
          toast.error("Admin logout successfully")
      } catch (err) {
          console.log(err.message)
      }
  }
     //setupUI for logged in and logged out admins
 
     const checkUI=async()=>{
      try {
        const url='http://localhost:5000/admin/adminVerify'
        const response=await fetch(url,{
          method:'GET',
          headers:{
            authorization:`Bearer ${localStorage.getItem('Admintoken')}`
          }
        })
        const parseRes= await response.json();
        parseRes===true ? setIsUi(true): setIsUi(false)
      } catch (err) {
        
        console.log(err.message);
      }
    }
    useEffect(()=>{
      checkUI()
    },[]);
    
const loggedinLink=document.querySelectorAll('.logged-in')
const loggedoutLink=document.querySelectorAll('.logged-out')
  if(isUi){
    loggedinLink.forEach(item=>item.style.display='block')
    loggedoutLink.forEach(item=>item.style.display='none')
  }else{
    loggedinLink.forEach(item=>item.style.display='none')
    loggedoutLink.forEach(item=>item.style.display='block')
  }
     //modal
     const [modalIsOpen,setIsOpen]=useState(false);
     const openModal=()=>{
         setIsOpen(true)
       }
       const closeModal=()=>{
         setIsOpen(false)
       }
       //copy referral
       document.querySelectorAll('.copy-link').forEach(copyLinkContainer=>{
        const inputfield=copyLinkContainer.querySelector('.copy-link-input')
        const copyButton=copyLinkContainer.querySelector('.copy-link-button')
       
        inputfield.addEventListener('focus',()=>inputfield.select());
        copyButton.addEventListener('click',()=>{
            const text=inputfield.value;
            inputfield.select();
            navigator.clipboard.writeText(text);

            toast.success('Copied!😃')
        })
       })
       
    
    //login admin
    const loginAdmin=async()=>{
      try {
        preloader()
        const url='http://localhost:5000/admin/login'
        const loginAdmin=await fetch(url,{
          method:'POST',
          body:JSON.stringify({
            email:localStorage.getItem('email'),
            name:localStorage.getItem('name')
          }),
          headers:{
            'Content-Type':'Application/json'
          }
        })
        const parseRes= await loginAdmin.json()
        if(parseRes.token){
          localStorage.setItem('Admintoken',parseRes.token);
          localStorage.setItem('name',parseRes.name);
          localStorage.setItem('email',parseRes.email);
          localStorage.setItem('id',parseRes._id);
          setAuth(true);
          setIsUi(true);
          preloaderoff()
          toast.success(`success login to Admin Account ${parseRes.name}`)
        }else{
          setIsUi(false)
          setAuth(false)
          preloaderoff();
          toast.error(parseRes)
        }
        } catch (err) {
          toast.error('Try again!..or request for an admin account ☠☠')
          preloaderoff()
          console.log(err.message)
        }
      }

    const deleteAccount=async()=>{
      try {
        preloader();
          const url=`https://project-api-version1.herokuapp.com/api/${id}`
          const deleteUser= await fetch(url,{
              method:"DELETE"
          })
          const response=await deleteUser.json()
          console.log(response)
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('email');
          localStorage.removeItem('pic');
          localStorage.removeItem('id');
          setAuth(false)
          preloaderoff();
          toast.error('Account Deleted')
      } catch (err) {
          console.log(err.message)
          toast.error('Try again ☠')
          preloaderoff()
      }
  }
    
          //preloader
          const preloader=()=>{
            const loader=document.querySelector('.preload');
            loader.style.display='block';
          }
          const preloaderoff=()=>{
            const loader=document.querySelector('.preload');
            loader.style.display='none';
          }
    return(
    <>
      <div className="preload"></div>
        <nav className="cyran lighten-2" role="navigation">
            <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
            <div className="nav-wrapper container">
            <ul className="left">
            <li><Link to='/home'>Return</Link></li>
            </ul>
                <ul className="right">
                    <li><Link to='/dashboard' className="light">{name}</Link></li>
                    {/*<li onClick={(e)=>logout(e)}><a className="light" >Log out</a></li>*/}
                </ul>
            
                </div> 
        </nav>
        <div className="container">
        <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      >
      <div className="center-align">
        <h6 className="light container">Copy Referral link:</h6> 
        <div className="copy-link">
          <input type='text' className='copy-link-input ' value={id} readOnly/>
          <button type='button' className="copy-link-button"><i className="material-icons">content_copy</i></button>
        </div>
      </div>
    </Modal> 
<br/><br/>
        <div className="container ">

        <a onClick={openModal} style={{cursor:'pointer'}} className='light customfont black-text'>Get your referral link</a><br/>
        <Link to='/inbox' className="light logged-in" style={{cursor:"pointer", display:'none'}}><i className="material-icons ">email</i>Inbox</Link><br/>
        <Link to='/allorders' className="light logged-in" style={{cursor:"pointer", display:'none'}}><i className="material-icons ">notifications</i>View All user Orders</Link><br/>
        <Link to='/allusers' className="light logged-in" style={{cursor:"pointer", display:'none'}}><i className="material-icons ">assignment</i>See all registered users</Link><br/>
        <Link to='/request' className="light logged-out" style={{cursor:"pointer",display:'none'}}><i className="material-icons ">send</i>Request for an Admin Account</Link><br/>
        <Link to='/addAdmin' className="light logged-in" style={{cursor:"pointer", display:'none'}} ><i className="material-icons ">add_circle</i>add an Admin</Link><br/>
        <a className="light logged-out" style={{cursor:"pointer",display:'none'}} onClick={loginAdmin}><i className="material-icons ">shield</i>Login to My Admin Account</a><br/>
        <a className="light logged-out" style={{cursor:"pointer", display:'none'}} onClick={deleteAccount}><i className="material-icons ">delete</i>Delete My Account</a><br/><br/>
        <a onClick={(e)=>adminlogout(e)} className="btn-small light logged-in" style={{display:'none'}} >admin Log out </a><br/>
        <a onClick={(e)=>logout(e)} className="btn-small light logged-out" style={{display:'none'}} >Log out</a><br/>
            
        </div>
        
      </div>
      
    </>
    )
}
export default User;