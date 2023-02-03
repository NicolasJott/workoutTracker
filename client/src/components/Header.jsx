import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../styles/Header.css';
import {useCookies} from "react-cookie";




function Header() {

    const cookies = useCookies([])


    const renderHeader = () => {
        if (cookies.jwt) {
        return (
            <><div className="navMenu">
            <Link to="/">Home</Link>
            <Link to="/workout">Workout</Link>
            <Link to="/meal">Calorie Tracker</Link>
        </div>
        <div className="rightMenu">
            <Link to="/user">Account</Link>
        </div></>

    )
        } else {
            return (
                <Link to="/login">Login</Link>
            )
        }
    }

    return (
       <header>
           <div className="logo">
               <h1><Link to="/">FitnessTrack</Link></h1>
           </div>
           {renderHeader()}
                
       </header>
    );

}

export default Header;
