import { Link } from "react-router-dom";
import toast   from "react-hot-toast";
import Modal from "react-modal/lib/components/Modal";
import img from '../../img.png';
import { useState } from "react";
import { projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../../FirebaseConfig/FirebaseConfig';

const customStyles={
    content:{
      background:'#f2f2f2',
      top:'12%',
      left:'35px',
      bottom:'auto',
      transform:'translate(-50%.-50%)'
    },
  }
  
const Dashboard=({setAuth})=>{
    const name=localStorage.getItem('name');
    const email=localStorage.getItem('email');
    const pic=localStorage.getItem('pic');
    const id=localStorage.getItem('id');
    const logout=async(e)=>{
        try {
          preloader();
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('pic');
            localStorage.removeItem('id');
            preloaderoff()
            toast.success('logout successfully')
            setAuth(false)
        } catch (err) {
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
            toast.error('Try again')
        }
    }
    //admin
    const adminAccount=async()=>{
      try {
        
      } catch (error) {
        console.log(error.message)
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
      //update avatar
      const [error,setError]=useState(null);
    const [file,setFile]=useState(null);
        const types=['image/png', 'image/jpeg'];

          const changeHandler=(e)=>{
            localStorage.removeItem('pic')
            let selected=e.target.files[0]
            if(selected&&types.includes(selected.type)){
                setFile(selected)
                setError('')
                //uploading image to storage
                const storageRef=ref(projectStorage,selected.name);
                const uploadTask = uploadBytesResumable(storageRef, selected);
                uploadTask.on('state_changed',
                 async()=>{
                     try {
                      preloader()
                      await getDownloadURL(storageRef).then((url)=>{
                       console.log(url);
                       localStorage.setItem('pic',url);
                        })
                         closeModal()
                         const url=` https://project-api-version1.herokuapp.com/api/${localStorage.getItem('id')}`
                         const update=localStorage.getItem('pic')
                         fetch(url,{
                             method:'PATCH',
                             body:JSON.stringify({
                               pic:update
                             }),
                               headers:{
                                 'Content-Type':'application/json'
                               }
                         })
                         preloaderoff();
                         setFile(null);
                         toast.success('updated');
                     } catch (error) {
                      console.log(error)
                     }

                          })
                         
            }else{
                setFile(null);
                setError('Please select an image file(png or jpeg)')
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
          <div className="preload "></div>

            <nav className="cyran lighten-2" role="navigation">
                <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
                <div className="nav-wrapper container">
                <ul className="left">
                <li><Link to='/home'>Return</Link></li>
                </ul>
            </div>
            </nav>
            
        {/* update pic modal*/}
        <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
      >
    <div className="modal-content center-align">
      <button className='right' onClick={closeModal}>close</button><br />
      <div className="account-details">
        <label>
        <h5 className="light">Update Avatar:</h5>
                <input type="file" onChange={changeHandler}/>
                <span>  
                    <div className="btn-floating red lighten-1"><i className="material-icons white-text">add</i></div>
                <br/>
                </span>
            </label>
            <div className="output">
                {error&&<div className='error'>{error}</div>}
                {file&&<div>{file.name}</div>}
            </div>
      </div>
    </div>
  </Modal>

            <div className="">
            <div className="center-align">
            <h4>Dashboard:</h4><br />
            <div className="container">
            <div className='center'>
         <img src={pic?pic:img} className="avatar circle img" alt='avatar' width='100' onClick={openModal}/><br/>
         <p className="light customfont">{name}</p>
         <p className="light customfont">{email}</p>
         <p className="light customfont" style={{fontSize: '12px'}}>User id: {id}</p>
         </div>
         <ul>
          <li> <Link to='/user'><i className='material-icons left'>contact_page</i><h5 style={{marginRight:'600px'}} className='light customfont black-text'>Personal Info</h5></Link></li>
         <li> <Link to='/user'><i className='material-icons left'>history</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>History</h5></Link></li>
          <li> <Link to='/order'><i className='material-icons left'>done</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Orders</h5></Link></li>
         <li> <Link to='/Amount'><i className='material-icons left'>payments</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Payment</h5></Link></li>
         <li> <Link to='/about'><i className='material-icons left'>help</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>Help</h5></Link></li>
         <li> <Link to='/about'><i className='material-icons left'>info</i><h5 className='light customfont black-text' style={{marginRight:'600px'}}>About</h5></Link></li>
        </ul><br/>
        <a className="light" style={{cursor:"pointer"}} onClick={adminAccount}>Login to My Admin Account</a><br/><br/>
        <a className="light" style={{cursor:"pointer"}} onClick={deleteAccount}>Delete My Account</a>
            </div><br/>
            <div className="container"><a onClick={(e)=>logout(e)} className="btn-small light" >Log out</a></div><br/>
            </div>
        </div>
       
        </>
    )
};

export default Dashboard;