import React, { useContext, useRef, useEffect } from 'react';
import logo from "../../images/logo.png";
import './Header.css';
import { useAuth } from '../LogIn/useAuth';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import { UserContext } from '../..</Linkpp';

const usePrev = value =>{
  const useref = useRef();
  useEffect(()=>{
    useref.current = value;
  },[value]);
  return useref.current;
}

const Header = () => {
const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
          <img src={logo} alt=""/>
          <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/review">Order review</Link>
          <Link to="/inventory">Manage Inventory</Link>
          {
           loggedInUser &&
           <span style ={{color:'yellow'}}>{loggedInUser.name}</span>
          
          }
          {
           loggedInUser?    <Link to = '/Login'>Sing Out</Link>
            : <Link to = '/Login'>Sing in</Link>
          }
        </nav>
        </div>
      
    );
    

};

export default Header;
