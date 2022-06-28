import { AppBar,Toolbar,Typography} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';



const Navbar=()=>{
  const navItem=[
    {
      text:<Typography color='secondary'>Home</Typography>,
      path:'/home'
    },
    {
      text:<Typography color='secondary'>Amount</Typography>,
      path:'/amount'
    },
    {
      text:<Typography color='secondary'>imran matano username</Typography>,
      path:'/dashboard'
    }
  ]
  const navigate=useNavigate();
  const location=useLocation();
 
  
  
    return(
    <div>
     <AppBar
     color="primary"
     >
     <Toolbar>
         <Typography style={{flexGrow:'1',color:'#aa0f57',fontFamily:'monospace',fontSize:'20px'}}>
          AddMeUp Org
          </Typography>
      {navItem.map(item=>(
          <Typography
          color='secondary'
          key={item.text}
          onClick={()=>navigate(item.path)}
          className={location.pathname === item.path ? 'active' : null}
          style={{width:'10%'}}
          >{item.text}
          </Typography>
          ))}
          
        </Toolbar>
     </AppBar>
    </div>
    )
}
export default Navbar;