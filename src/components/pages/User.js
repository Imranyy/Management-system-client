import React,{Fragment} from "react";
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
    const name=localStorage.getItem('name');
    const id=localStorage.getItem('id')
    const logout=async(e)=>{
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            setAuth(false)
            toast.error("logout successfully")
        } catch (err) {
            console.log(err.message)
        }
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
       
    //admin
    const adminAccount=async()=>{
      try {
        preloader()
        const url='http://localhost:5000/admin'
        const loginAdmin=await fetch(url,{
          method:'POST',

        })

        preloaderoff()
        toast.success('logged-in to admin🧐')
      } catch (error) {
        preloaderoff();
        toast.error('Failed☠..Try again!')
        console.log(error.message)
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
    <Fragment>
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
        <h6 className="light container">Referral link:</h6>
        <div className="copy-link">
          <input type='text' className='copy-link-input' value={id} readOnly/>
          <button type='button' className="copy-link-button"><i className="material-icons">content_copy</i></button>
        </div>
      </div>
    </Modal> 

        <div className="container">

        <a onClick={openModal} style={{cursor:'pointer'}} className='light customfont black-text'>Get your referral link</a>
        
        <a className="light" style={{cursor:"pointer"}} onClick={adminAccount}>Login to My Admin Account</a><br/><br/>
        <a className="light" style={{cursor:"pointer"}} onClick={deleteAccount}>Delete My Account</a>
        <div className="container"><a onClick={(e)=>logout(e)} className="btn-small light" >Log out</a></div><br/>
            
        </div>
        
      </div>
    </Fragment>
    )
}
export default User;