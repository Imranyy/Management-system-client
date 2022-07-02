import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import img from '../../img.png';
const Dashboard=({setAuth})=>{
    const name=localStorage.getItem('name');
    const email=localStorage.getItem('email');
    const [pic,setPic]=useState('')
    if(localStorage.getItem('pic')==='null'){
        setPic(img)
    }else{
        setPic(localStorage.getItem('pic'));
    }
    const id=localStorage.getItem('id')
    const logout=async(e)=>{
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('pic');
            localStorage.removeItem('id');
            setAuth(false)
            toast.success('logout successfully')
        } catch (err) {
            console.log(err.message)
        }
    }
    const deleteAccount=async()=>{
        try {
            const url=`https://project-api-version1.herokuapp.com/api/${localStorage.getItem('id')}`
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
            toast.success('Account Delete')
        } catch (err) {
            console.log(err.message)
        }
    }
    
    return(
        <div>
            <nav className="cyran lighten-2" role="navigation">
                <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
                <div className="nav-wrapper container">
                <ul className="left">
                <li><Link to='/home'>Return</Link></li>
                </ul>
            </div>
            </nav>

            <div className="container">
            <div className="center-align">
            <h4>Dashboard:</h4><br />
            <div className="container">
            <div className='center'>
         <img src={pic} className="avatar circle img" alt='avatar' width='100'/><br/>
         <p className="light customfont">{name}</p>
         <p className="light customfont">{email}</p>
         <p className="light customfont" style={{fontSize: '12px'}}>User id: {id}</p>
         </div>
         <ul>
         <li> <Link to='/user'><i className='material-icons left'>contact_page</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Personal Info</h5></Link></li>
         <li> <Link to='/Amount'><i className='material-icons left'>account_circle</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Account</h5></Link></li>
         <li> <Link to='/user'><i className='material-icons left'>history</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>History</h5></Link></li>
         <li> <Link to='/Amount'><i className='material-icons left'>payments</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Payment</h5></Link></li>
         <li> <Link to='/about'><i className='material-icons left'>help</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Help</h5></Link></li>
         <li> <Link to='/about'><i className='material-icons left'>info</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>About</h5></Link></li>
        </ul><br/>
        <a className="light" onClick={deleteAccount}>Delete My Account</a>
            </div>
            <div className="container"><a onClick={(e)=>logout(e)} className="btn-small light" >Log out</a></div>
            </div>
        </div>
       
        </div>
    )
};

export default Dashboard;