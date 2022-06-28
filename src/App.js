import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';
import Amount from './components/pages/Amount';
import User from './components/pages/User';
import {useState,useEffect} from 'react'
const App=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const setAuth=(boolean)=>{
    setIsAuthenticated(boolean)
  }

  const checkAuthenticated=async()=>{
    try {
      const url='http://localhost:5000/api/verify'
      const response=await fetch(url,{
        method:'GET',
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const parseRes= await response.json();
      parseRes===true ? setIsAuthenticated(true): setIsAuthenticated(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(()=>{
    checkAuthenticated();
  },[]);
  return (
    <Router>
    <Routes>
      <Route path='/' element={!isAuthenticated ? <RegisterPage setAuth={setAuth}/> :<Navigate to='/home'/>}/>
      <Route path='/home' element={isAuthenticated ? <HomePage setAuth={setAuth}/>:<Navigate to='/'/>}/>
      <Route path='/dashboard' element={isAuthenticated ? <Dashboard setAuth={setAuth}/>:<Navigate to='/'/>}/>
      <Route path='/user' element={isAuthenticated ? <User setAuth={setAuth}/>:<Navigate to='/'/>}/>
      <Route path='/amount' element={isAuthenticated ? <Amount setAuth={setAuth}/>:<Navigate to='/'/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  </Router>
  );
}
 
export default App;
