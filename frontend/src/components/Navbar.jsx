import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useDispatch , useSelector} from 'react-redux';
import { logoutUser } from '../Redux/authSlice'; 
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate =useNavigate();
 const logged = useSelector(state => state.auth.logged);
  const handleLogout = () => {
    
   try{
   
    dispatch(logoutUser());
   } 
   catch(err){
  alert(err);
   }
  };
  useEffect(()=>{
    if(!logged){
      navigate('/Login')
    }
  },[logged])

  return (
    <nav className='navbar'>
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <ul className="menu">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/CashFlow">CashFlow</Link>
        </li>
        <li>
          <Link to="/Networth">Networth</Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;