import React from 'react';
import {Link } from "react-router-dom";
import '../../styles/Header.css';
import {useDispatch, } from "react-redux";
import { logoutUser} from "../../actions/authAction";




function Header() {

    const dispatch = useDispatch()

    const handleLogout = () =>  {
        dispatch(logoutUser());
    }

    return (
       <header>
           <div className="logo">
               <h1><Link to="/">FitnessTrack</Link></h1>
           </div>
           <div className="navMenu">
               <Link to="/">Home</Link>
               <Link to="/workout">Workout</Link>
               <Link to="/meal">Calorie Tracker</Link>
           </div>
           <div className="rightMenu">
               <button className="navbtn" onClick={handleLogout}>Logout</button>
           </div>
       </header>
    );

}

export default Header;
