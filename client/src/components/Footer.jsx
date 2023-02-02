import React from "react";
import '../styles/Footer.css'
function Footer() {
    const date = new Date().getFullYear();
    
    return (
        <footer>
            <p>Copyright &copy; FitnessTrack. {date} All rights reserved</p>
        </footer>
    );

}

export default Footer;