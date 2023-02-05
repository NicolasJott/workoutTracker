import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../../styles/Header.css';
import {useCookies} from "react-cookie";




function LoggedOutHeader() {

    return (
       <header>
           <div className="logo">
               <h1><Link to="/">FitnessTrack</Link></h1>
           </div>
           <Link to="/login">Login</Link>
       </header>
    );

}

export default LoggedOutHeader;
