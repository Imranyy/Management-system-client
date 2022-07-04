import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Modal from 'react-modal'

const customStyles={
  content:{
    background:'#f2f2f2',
    top:'12%',
    left:'35px',
    bottom:'auto',
    transform:'translate(-50%.-50%)'
  },
}

Modal.setAppElement('#root')
const HomePage=({setAuth})=>{
    const name=localStorage.getItem('name');
    //const pic=localStorage.getItem('pic');
    const getName=async()=>{
        try {
            const url="http://localhost:3000/api/userdata"
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

   
    const options=[
      {value:'instagram', label:'instagram'},
      {value:'facebook',label:'facebook'},
      {value:'twitter',label:'twitter'}
    ];
    const options2=[
      {value:'followers',label:'followers'},
      {value:'likes',label:'likes'},
      {value:'comments',label:'commments'},
      {value:'tweets',label:'tweets'},
      {value:'Follower',label:'followers'}
    ]

    //modal stuff
    const [modalIsOpen, setIsOpen]=useState(false);
    const [modalIsOpen2,setIsOpen2]=useState(false);
    const [modalIsOpen3,setIsOpen3]=useState(false);
      //modal1
    const openModal=()=>{
      setIsOpen(true)
    }
    const closeModal=()=>{
      setIsOpen(false);
    }
    //modal2
    const openModal2=()=>{
      setIsOpen2(true)
    }
    const closeModal2=()=>{
      setIsOpen2(false)
    }
    //modal3
    const openModal3=()=>{
      setIsOpen3(true)
    }
    const closeModal3=()=>{
      setIsOpen3(false)
    }
    //main form
    const[media,setMedia]=useState(null);
    const [choose, setChoose]=useState(null);
    const [username,setUsername]=useState('');
    const[amount,setAmount]=useState('');
    const[price,setPrice]=useState('');
    const handleDone=(e)=>{
      e.preventDefault()
      //console.log(choose,media,username,amount,price)
      localStorage.setItem('username',username);
      localStorage.setItem('choose',choose);
      localStorage.setItem('amount',amount);
      localStorage.setItem('price',price);
      localStorage.setItem('media',media);

      //redirect after submitting form
      window.location.href=`https://${localStorage.getItem('media')}.com/${localStorage.getItem('username')}`
    }


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
                  {/*<li onClick={(e)=>logout(e)}><a className="light" >Log out</a></li> */}
            </ul>
           
            </div>
    </nav>
            <Toaster/>
    {/*<!--modalstats-->*/}
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      >
      <div className="center-align">
        <h4>Add Statistics:</h4>
        <button className="right" onClick={closeModal}>close</button><br/>
        <div className="account-details">
          
        </div>
      </div>
    </Modal> 
   {/*<!--modalreview-->*/}
   <Modal
      isOpen={modalIsOpen2}
      onRequestClose={closeModal2}
      style={customStyles}
      contentLabel='Example Modal'
      >
    <div className="modal-content center-align">
      <h4>Add Review:</h4>
      <button onClick={closeModal2}>close</button><br />
      <div className="account-details">
        <form id="answer-form">
            <div className="input-field">
            <input type="text" id="choice" name="choice" required placeholder="Enter Review"/>
            </div>
          <button className="btn red lighten-1 z-depth-0">Submit</button>
        </form>
      </div>
    </div>
  </Modal>
  {/*<!--modalhistory--> */}
  <Modal
      isOpen={modalIsOpen3}
      onRequestClose={closeModal3}
      style={customStyles}
      contentLabel='Example Modal'
      >
    <div className="modal-content center-align">
      <h4>Add History:</h4>
      <button onClick={closeModal3}>close</button><br />
      <div className="account-details">
        
      </div>
    </div>
  </Modal>

  {/*<!--content--> */}
<div className="container">
    <div className="section">
        <div className="card">
            <div className="card-title" style={{marginLeft: '8%'}}><h4 className="light customfont">AddMeUp. org</h4></div>
            <div className="card-content">
              <form onSubmit={handleDone}>
                      <Select name="media" options={options} onChange={(e)=>{setMedia(e.value)}}/><br/>

                      <Select name="choose" options={options2} onChange={(e)=>{setChoose(e.value)}}/>

                        <div className="input-field" >
                          <input type="text" onChange={(e)=>{setUsername(e.target.value)}} name="username" placeholder="Enter Username" />
                         </div>

                      <div className="input-field">
                      <input type="number" onChange={(e)=>{setAmount(e.target.value)}} name="amount" placeholder="Enter Amount of Followers you want"/>
                     </div>

                     <div className="input-field">
                     <input type="number" onChange={(e)=>{setPrice(e.target.value)}} name="price" placeholder="Price" />
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
                  <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a onClick={openModal}><i className="material-icons red-text lighen-1">inventory</i></a></div>
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
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a  onClick={openModal2} ><i className="material-icons red-text lighen-1">add</i></a></div>
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
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a   onClick={openModal3}><i className="material-icons red-text lighen-1">inventory</i></a></div>
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