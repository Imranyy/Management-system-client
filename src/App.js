import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Upload from './components/pages/Upload';
import RegisterPage from './components/pages/RegisterPage';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';
import Amount from './components/pages/Amount';
import Order from './components/pages/Order';
import About from './components/pages/About';
import User from './components/pages/User';
import {useState,useEffect} from 'react';
import { Toaster } from 'react-hot-toast';
import  toast  from 'react-hot-toast';
import Help from './components/pages/Help';
import Payment from './components/pages/Payment';


const App=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const setAuth=(boolean)=>{
    setIsAuthenticated(boolean)
  }

  const checkAuthenticated=async()=>{
    try {
      const url=' https://project-api-version1.herokuapp.com/api/verify'
      const response=await fetch(url,{
        method:'GET',
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const parseRes= await response.json();
      parseRes===true ? setIsAuthenticated(true): setIsAuthenticated(false)
    } catch (err) {
      console.log(err.message);
      toast.error('Please Register Or Login!')
    }
  }
  useEffect(()=>{
    checkAuthenticated();
  },[]);

 
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={!isAuthenticated ? (<Upload />) :(<Navigate to='/home' replace/>)}/>
        <Route path='/register' element={!isAuthenticated ? (<RegisterPage setAuth={setAuth}/>) :(<Navigate to='/home' replace/>)}/>
        <Route path='/home' element={isAuthenticated ? (<HomePage setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/dashboard' element={isAuthenticated ? (<Dashboard setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/user' element={isAuthenticated ? (<User setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/amount' element={isAuthenticated ? (<Amount setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/help' element={isAuthenticated ? (<Help setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/payment' element={isAuthenticated ? (<Payment setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/order' element={isAuthenticated ? (<Order setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='/about' element={isAuthenticated ? (<About setAuth={setAuth}/>):(<Navigate to='/'/>)}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </Router>
    <Toaster/>
    </>
  );
}
 
export default App;
