import { useState } from "react";
import { toast } from 'react-toastify';
const RegisterPage=({setAuth})=>{
      const toReg=()=>{
        const register=document.querySelector('.register');
        const login=document.querySelector('.login');
        login.classList.add('close');
        register.classList.add('open')
      }
      
      const toLogin=()=>{
        const register=document.querySelector('.register');
        const login=document.querySelector('.login');
        register.classList.remove('open');
        login.classList.remove('close')
      };
      
      //form inputs
      const pic=localStorage.getItem('pic')
      const [username,setName]=useState('');
      const [email,setEmail]=useState('');
      const [password, setPassword]=useState('');

      //registerUser
      const handleSubmit1=async(e)=>{
        e.preventDefault()
        try {
          const url='http://localhost:5000/api/register';
          const response= await fetch(url,{
            method:'post',
            body:JSON.stringify({
            username:username,
            pic:pic,
            email:email,
            password:password 
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const parseRes=await response.json()
        if(parseRes.token){
          localStorage.setItem('pic');
          localStorage.setItem('token',parseRes.token);
          localStorage.setItem('name',parseRes.username);
          localStorage.setItem('email',parseRes.email);
          localStorage.setItem('id',parseRes._id);
          setAuth(true)
          toast.success('success register')
        }else{
          setAuth(false)
          toast.error(parseRes)
        }
        } catch (err) {
          console.log(err.message)
        }
      };

      //loginUser
      const handleSubmit2=async(e)=>{
        e.preventDefault()
        try {
          const url='http://localhost:5000/api/login'
          const response= await fetch(url,{
            method:'POST',
            body:JSON.stringify({
            email:email,
            password:password
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const parseRes= await response.json()
        if(parseRes.token){
          localStorage.setItem('pic',parseRes.pic);
          localStorage.setItem('token',parseRes.token);
          localStorage.setItem('name',parseRes.username);
          localStorage.setItem('email',parseRes.email);
          localStorage.setItem('id',parseRes._id);
          setAuth(true)
          toast.success('success login')
        }else{
          setAuth(false)
          toast.error(parseRes)
        }
        } catch (err) {
          console.log(err.message)
        }
      }


    return(
        <div>
            {/*register modal*/}
            <div className='register customfont'>
                <div className='registermodal container'>
                <h5 style={{borderBottom:'1px solid gray',width:'41%', margin:'0 auto', color:'rgb(226, 43, 165)'}}>register</h5> <br/>
                <p style={{fontSize:'20px'}}></p>
                <form onSubmit={handleSubmit1}>
                    <input type='text'  placeholder="Enter username" name='username' onChange={(e)=>{setName(e.target.value)}} required className="form-control my-3"/>
                    <input type='text' placeholder="Enter email" name="email" required onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-3"/>
                    <input type='password' placeholder="Enter password" name='password' onChange={(e)=>{setPassword(e.target.value)}}
                    required className="form-control my-3"/>
                    <button className="btn-small waves-effect waves-light left" type='submit' style={{marginTop:'40px', backgroundColor: 'rgb(226, 43, 165)'}}>Register</button>
                    <a onClick={toLogin} className="right" style={{cursor: 'pointer', marginTop: '50px'}}>I have an account!</a>
                    </form>
                </div>
            </div>
            {/*login modal */}
            <div className='login customfont'>
                <div className='loginmodal container'>
                <h5 style={{borderBottom:'1px solid gray',width:'41%', margin:'0 auto', color:'rgb(226, 43, 165)'}}>Login</h5> <br/>
                <p style={{fontSize:'20px'}}></p>
                <form onSubmit={handleSubmit2}>
                    <input type='text' placeholder="Enter email" name="email" required style={{height:'30px'}} onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-3"/>
                    <input type='password' placeholder="Enter password" name='password' onChange={(e)=>{setPassword(e.target.value)}} className="form-control my-3"
                    required style={{height:'30px'}}/>
                    <button className="btn-small waves-effect waves-light left" type='submit' style={{marginTop:'40px', backgroundColor: 'rgb(226, 43, 165)'}}>Login</button>
                    <a onClick={toReg} className="right" style={{cursor: 'pointer', marginTop: '50px'}}>Register</a>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;