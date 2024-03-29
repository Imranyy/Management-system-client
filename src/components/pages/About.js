import React,{Fragment} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const About=({setAuth})=>{
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
                    {/*<li onClick={(e)=>logout(e)}><a className="light" >Log out</a></li> */}
                </ul>
            
                </div>
        </nav>

             {/*<!--content-->*/}
      <div className="container"><br/>
        <p className="grey">About info will be placed</p>
            
      </div>
        </Fragment>
    )
}
 export default About;