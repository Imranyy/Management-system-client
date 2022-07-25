import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Select from 'react-select';
import Modal from 'react-modal';

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
            const url="https://project-api-version1.herokuapp.com/api/userdata"
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
            console.log(err) 
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
    const [modalIsOpen4,setIsOpen4]=useState(false);
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
    //modal4
    const openModal4=()=>{
      setIsOpen4(true)
    }
    const closeModal4=()=>{
      setIsOpen4(false)
    }
    //main form
    const[media,setMedia]=useState(null);
    const [choose, setChoose]=useState(null);
    const [username,setUsername]=useState('');
    const[amount,setAmount]=useState('');
    const price=amount*2;
    const form1=document.querySelector('#form1');
    const handleDone=async(e)=>{
      e.preventDefault()
      try {
        preloader();
        const email=localStorage.getItem('email');
        const url=' http://localhost:5000/data/orders';
        const response=await fetch(url,{
          method:"POST",
          body:JSON.stringify({
            pic:localStorage.getItem('pic'),
            email:email,
            username:username,
            choose:choose,
            media:media,
            amount:amount,
            price:price
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const parseRes=await response.json()
        localStorage.setItem('date',parseRes.createdAt)
        localStorage.setItem('username',parseRes.username)
        localStorage.setItem('choose',parseRes.choose)
        localStorage.setItem('media',parseRes.media)
        localStorage.setItem('amount',parseRes.amount)
        localStorage.setItem('price',parseRes.price)
        preloaderoff();
        form1.reset()
        toast.success('Order Posted')
      } catch (error) {
        preloaderoff();
        form1.reset()
        toast.error('Post Order failed☠')
        console.log(error)
      }
      //redirect after submitting form
     // window.location.href=`https://${localStorage.getItem('media')}.com/${localStorage.getItem('username')}`
    }
    

    //post review
const [review,setReview]=useState('');
const handleReview=async(e)=>{
  e.preventDefault();
  try {
    preloader();
    const url=' http://localhost:5000/data/reviews'
  const response=await fetch(url,{
    method:"POST",
    body:JSON.stringify({
      pic:localStorage.getItem('pic'),
      name:localStorage.getItem('name'),
      review:review
    }),
    headers:{
      'Content-Type':'application/json'
    }
  })
  const parseRes=await response.json();
  closeModal2();
  preloaderoff();
  toast.success('review posted')
  } catch (error) {
    preloaderoff();
    toast.error('Post review failed☠')
    console.log(error)
  }
}
//get reviews
const[rev,setRev]=useState('')
const getReview=async()=>{
  try {
    const url=' https://project-api-version1.herokuapp.com/data/reviews';
    const response=await fetch(url,{
      method:"GET"
    })
    const parseRes=await response.json();
    setRev(parseRes)

  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  getReview(); 
  //getUserhistory();
  getSta();
},[])

//get userhistory
/*const [history,setHistory]=useState('')
const getUserhistory=async()=>{
  try {
    const url='http://localhost:5000/data/orders';
    const response=await fetch(url,{
      method:'GET'
    })
    const parseRes=await response.json();
    setHistory(parseRes)
  } catch (error) {
    console.log(error)
  }
}*/

//get stats
const[sta,setSta]=useState('');
const getSta=async()=>{
  try {
    const url=' https://project-api-version1.herokuapp.com/data/stats';
    const response=await fetch(url,{
      method:"GET"
    })
    const parseRes=await response.json()
    setSta(parseRes)
  } catch (error) {
    console.log(error)
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
        <div>
           <div className="preload "></div>
        <nav className="cyran lighten-2" role="navigation">
        <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
        <div className="nav-wrapper container">
          <ul className="left">
          <li ><Link to='/amount'>Amount Balance</Link></li>
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
        <h4>Statistics:</h4>
        <button className="right" onClick={closeModal}>close</button><br/>
        <div className="account-details">
          {sta?sta.map((st)=>(
            <><p>Likes:.{st.likes}<br/>Followers:.{st.followers}<br/>Comments:.{st.comments}<br/>Lives:.{st.lives}</p><br/></>
          )) :'loading...'}
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
        <form onSubmit={handleReview}>
            <div className="input-field">
            <input type="text" onChange={(e)=>{setReview(e.target.value)}} name="review" required placeholder="Enter Review"/>
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
      <h4>History:</h4>
      <button onClick={closeModal3}>close</button><br />
      <div className="account-details">
          <><p>Created On:.{localStorage.getItem('date')}</p><br/><p>username:.{localStorage.getItem('username')}<br/>Service:.{localStorage.getItem('choose')}<br/>Site:.{localStorage.getItem('media')}<br/>Amount of followers:.{localStorage.getItem('amount')}<br/>To_pay:.{localStorage.getItem('price')}</p><br/></>
      </div>
    </div>
  </Modal>

  <Modal
      isOpen={modalIsOpen4}
      onRequestClose={closeModal4}
      style={customStyles}
      contentLabel='Example Modal'
      >
    <div className="modal-content center-align" style={{overflowY:'scroll'}}>
    <p className="light">Profile pic</p>
    </div>
  </Modal>

  
  {/*<!--content--> */}
<div className="container">
    <div className="section">
        <div className="card">
            <div className="card-title" style={{marginLeft: '8%'}}><h4 className="light customfont">AddMeUp. org</h4></div>
            <div className="card-content">
              <form onSubmit={handleDone} id='form1'>
                      <Select name="media" options={options} onChange={(e)=>{setMedia(e.value)}} required/><br/>

                      <Select name="choose" options={options2} onChange={(e)=>{setChoose(e.value)}} required/>

                        <div className="input-field" >
                          <input type="text" onChange={(e)=>{setUsername(e.target.value)}} name="username" placeholder="Enter Instagram or Twitter Username" required/>
                         </div>

                      <div className="input-field">
                      <input type="number" onChange={(e)=>{setAmount(e.target.value)}} name="amount" placeholder="Enter Amount of Followers you want" required/>
                     </div>

                     <div className="input-field">
                     <p className="light">Price: ksh {price}</p>
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
        <div className="col s12 m12 l4">
          <div className="icon-block">
            <h3 className="center">Stats <i className="material-icons">topic</i></h3>
                <div className="card">
                  <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a onClick={openModal}><i className="material-icons red-text lighen-1">inventory</i></a></div>
                  <div className="card-content">
                  {sta?sta.map((st)=>(
                    <><p key={st.comments}>Likes:.{st.likes}<br/>Followers:.{st.followers}<br/>Comments:.{st.comments}<br/>Lives:.{st.lives}</p><br/></>
                     )):'Cannot get Stats..'}
                  </div>
                </div>
             </div>
        </div>

        <div className="col s12 m12 l4">
          <div className="icon-block">
            <h3 className="center">Reviews <i className="material-icons">hive</i></h3>
            <div className="card">
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a  onClick={openModal2} ><i className="material-icons red-text lighen-1">add</i></a></div>
              <div className="card-content">
              {rev ? rev.map((revs)=>(
                  <><p key={revs.name}><img src={revs.pic} className="avatar circle img"  width='30' onClick={openModal4}/><div className="revcard">:.{revs.name}  <br />review:.{revs.review}</div></p><br /></>
                )):'Cannot get Review..You are offline'}
              </div>
            </div>
          </div>
        </div>

        <div className="col s12 m12 l4">
          <div className="icon-block">
            <h3 className="center">History <i className="material-icons">history</i></h3><div className="card">
              <div className="card-title right" style={{marginRight: '1%', marginTop:'1%'}}><a   onClick={openModal3}><i className="material-icons red-text lighen-1">inventory</i></a></div>
              <div className="card-content">
                <p className='light'>view Your activities</p>
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