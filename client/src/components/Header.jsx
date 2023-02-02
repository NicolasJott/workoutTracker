import React, {useState} from 'react';
import {Link} from "react-router-dom";
import '../styles/Header.css';




function Header() {

    const [token, setToken] = useState(sessionStorage.getItem('token'))
    console.log(token)

    const renderHeader = () => {
        if (token !== null) {
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
