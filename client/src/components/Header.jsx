import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import isAuth from '../components/Login'
import '../styles/Header.css';
import { useCookies } from 'react-cookie'

function Header() {


    const [cookies, setCookies] = useCookies()

    const renderHeader = () => {
        console.log(cookies.jwt)
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
