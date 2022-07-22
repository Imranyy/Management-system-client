import React,{Fragment} from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Amount=({setAuth})=>{
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
      <div className="container">
        
        {/*<!--Amount balance-->*/}
        
            <div className="center-align"><br/><br/><br />
            <div className="account-details">
                <h5 className="center light">KSH: 234563</h5><br/><br/>
                <div className="row container">
                <div className="col s6 m6">
                    Transaction: <p>20</p>
                </div>
                <div className="col s6 m6">
                    Withdrawal: <p>2</p>
                </div>
                </div><br/>
                <form> 
                <div className="input-field container" style={{width: '80%'}}>
                    <input type="number" id="fund" name="price" required />
                    <label>Fund account</label>
                </div><br/>
                <button className="btn red lighten-1 z-depth-0">Done</button>
                <p className="error"></p>
            </form>
            </div>
            </div>

      </div>
        </Fragment>
    )
}
 export default Amount