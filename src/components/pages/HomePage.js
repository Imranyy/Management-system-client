import { useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const HomePage=({setAuth})=>{
    const name=localStorage.getItem('name')
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
            localStorage.setItem('name',parseRes.username)
            localStorage.setItem('email',parseRes.email)
        } catch (err) {
            console.log(err.message) 
        }
    };
    const logout=async(e)=>{
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('pic');
            localStorage.removeItem('id');
            setAuth(false)
            toast.error("logout successfully")
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(()=>{
        getName();
    },[])

    const handleDone=(e)=>{

    }
    //modal
  const modals=document.querySelectorAll('.modal');
  M.Modal.init(modals);
    return(
        <div>
        <nav className="cyran lighten-2" role="navigation">
        <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
        <div className="nav-wrapper container">
          <ul className="left">
          <li><Link to='/amount'>Amount Balance</Link></li>
          </ul>
            <ul className="right">
                <li><Link to='/dashboard' className="light">{name}</Link></li>
                  <li onClick={(e)=>logout(e)}><a className="light" >Log out</a></li>
            </ul>
           
            </div>
    </nav>
            
    {/*<!--modalstats-->*/}
    <div id="modal-stats" className="modal">
      <div className="modal-content center-align">
        <h4>Add Statistics:</h4><br />
        <div className="account-details">
          <form id="answer-form">
            <div className="input-field">
              <input type="text" id="site" name="site" required />
              <label >Likes:</label>
              </div>
              <div className="input-field">
              <input type="text" id="choice" name="choice" required />
              <label>Followers</label>
              </div>
              <div className="input-field">
              <input type="number" id="amount" name="amount" required />
              <label>Comment</label>
             </div>
             <div className="input-field">
             <input type="number" id="price" name="price" required />
             <label>Live</label>
            </div>
            <button className="btn red lighten-1 z-depth-0">Done</button>
            <p className="error"></p>
          </form>
        </div>
      </div>
    </div> 
   {/*<!--modalreview-->*/}
   <div id="modal-review" className="modal">
    <div className="modal-content center-align">
      <h4>Add Review:</h4><br />
      <div className="account-details">
        <form id="answer-form">
          <div className="input-field">
            <input type="text" id="site" name="site" required />
            <label>Enter Username</label>
            </div>
            <div className="input-field">
            <input type="text" id="choice" name="choice" required />
            <label>Enter Review</label>
            </div>
          <button className="btn red lighten-1 z-depth-0">Done</button>
          <p className="error"></p>
        </form>
      </div>
    </div>
  </div>
  {/*<!--modalhistory--> */}
  <div id="modal-history" className="modal">
    <div className="modal-content center-align">
      <h4>Add History:</h4><br />
      <div className="account-details">
        <form id="answer-form">
          <div className="input-field">
            <input type="text" id="site" name="site" required />
            <label>Enter User No.</label>
            </div>
            <div className="input-field">
            <input type="text" id="choice" name="choice" required />
            <label>Enter Followers</label>
            </div>
            <div className="input-field">
            <input type="number" id="amount" name="amount" required />
            <label>Time</label>
           </div>
          <button className="btn red lighten-1 z-depth-0">Done</button>
          <p className="error"></p>
        </form>
      </div>
    </div>
  </div>

  {/*<!--content--> */}
<div className="container">
    <div className="section">
        <div className="card">
            <div className="card-title" style={{marginLeft: '8%'}}><h4 className="light customfont">AddMeUp. org</h4></div>
            <div className="card-content">
              <form onSubmit={handleDone()}>

                    <div className="input-field" id='site'>
                      <select name="media">
                        <option value="" disabled>Choose your site</option>
                        <option type="text" value="instagram">Instagram</option>
                        <option type="text" value="twitter">Twitter</option>
                        <option type="text" value="facebook">Facebook</option>
                      </select>
                      <label htmlFor="site">Site</label>
                      </div>

                      <div className="input-field" id="choose">
                        <select name="choose">
                          <option value="" disabled >Choose</option>
                            <option type="text" value="followers">Followers</option>
                            <option type="text" value="likes">Likes</option>
                            <option type="text" value="comments">Comments</option>
                           <option type="text" value="tweets">Tweets</option>
                            <option type="text" value="followers">Followers</option>
                        </select>
                        <label htmlFor="choose">Choose</label>
                        </div>

                        <div className="input-field" >
                          <input type="text" id="username" name="username"  />
                          <label>Enter Username</label>
                         </div>

                      <div className="input-field">
                      <input type="number" id="amount" name="amount" />
                      <label>Enter Amount</label>
                     </div>

                     <div className="input-field">
                     <input type="number" id="price" name="price" />
                     <label >Price</label>
                    </div>

                    <button className="btn red lighten-1 z-depth-0">Done</button>
                  </form>
            </div>
        </div>
    </div>  
</div>

<div className="container">
    <div className="section">

      {/*<!--   Icon Section   --> */}
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h3 className="center">Stats <i className="material-icons">topic</i></h3>
                <div className="card">
                  <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a className="btn-floating waves-effect waves-light red modal-trigger" data-target="modal-stats"><i className="material-icons">add</i></a></div>
                  <div className="card-content">
                    <p className="light"> Likes: 134243243423</p>
                    <p className="light">Followers: 12556</p>
                    <p className="light">Comments: 2233</p>
                    <p className="light">Live: 94435</p>
                  </div>
                </div>
             </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h3 className="center">Reviews <i className="material-icons">hive</i></h3>
            <div className="card">
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a className="btn-floating waves-effect waves-light red modal-trigger" data-target="modal-review" ><i className="material-icons">add</i></a></div>
              <div className="card-content">
                <p className="light"> Joel: <i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></p>
                <p className="light">Daniel: <i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></p>
                <p className="light">Joseph: <i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></p>
                <p className="light">Ben: <i className="material-icons">star</i><i className="material-icons">star</i><i className="material-icons">star</i></p>
              </div>
            </div>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h3 className="center">History <i className="material-icons">history</i></h3><div className="card">
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a className="btn-floating waves-effect waves-light red modal-trigger"  data-target="modal-history"><i className="material-icons">add</i></a></div>
              <div className="card-content">
                <p className="light"> User 601: 10K 2sec</p>
                <p className="light">User 602: 5k 3sec</p>
                <p className="light">User 603: 3k 10sec</p>
                <p className="light">User 604: 100 1hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
   <br/><br/>
  </div>


            <Footer/>
        </div>
    )
};

export default HomePage;