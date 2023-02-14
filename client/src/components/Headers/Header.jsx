import {Link } from "react-router-dom";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faUserCircle, faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";


const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenu = () => {
            setIsMenuOpen(false);
        };

        // Close the menu when a link is clicked or when the user clicks outside the menu
        document.addEventListener("click", closeMenu);
        return () => {
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const authVisible = (
        <div className="navMenu">
            <Link to="/">Home</Link>
            <Link to="/workout">Workout</Link>
            <Link to="/meal">Calorie Tracker</Link>
            <button className="navbtn" onClick={logout}>
                <FontAwesomeIcon icon={faUserCircle} size="2xl" /> Hello, {user && user.firstName}!
            </button>
        </div>
    );

    const authVisibleSmall = (
        <div className="nav-dropdown">
            <Link to="/">Home</Link>
            <Link to="/workout">Workout</Link>
            <Link to="/meal">Calorie Tracker</Link>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )

    const guestVisible = (
        <div className="navMenu">
            <Link to="/login">Login</Link>
        </div>
    );

    return (
        <div className="nav-center">
            <header>
                <h1 className="logo">FitnessTrack</h1>
                {isAuthenticated ? authVisible : guestVisible}
                {isMenuOpen && (
                    <div className="dropdown">
                        {isAuthenticated ? authVisibleSmall : guestVisible}
                    </div>
                )}
                <button className="nav-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </header>
        </div>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);