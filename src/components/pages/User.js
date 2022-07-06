import React,{Fragment} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User=({setAuth})=>{
    const name=localStorage.getItem('name')
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
    return(
    <Fragment>
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
        
        <h6 className="light customfont"><br/> 
        <div className='card'>
        <div className="container"><br/>
        <p className='right'>Created On:.{localStorage.getItem('date')}</p><br/>
        <p>Username:..{localStorage.getItem('username')}<br/>
        Service:..{localStorage.getItem('choose')}<br/>
        Site:..{localStorage.getItem('media')}<br/>
        Amount of followers:..{localStorage.getItem('amount')}<br/>
        To_pay:..{localStorage.getItem('price')}</p><br/>
        </div>
        </div>
      
        </h6>
      </div>
    </Fragment>
    )
}
export default User;