import {Link } from "react-router-dom";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import ProfileMenu from "./ProfileMenu";


const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {

    const [ active, setActive ] = useState(false)
    function toggleSidebar(){
        const sidebar = document.querySelector('.sidebarContainer')
        sidebar.classList.toggle('open');
    }

    function toggleProfileMenu(){
        if (active === true) {
            setActive(false)
        } else {
            setActive(true)
        }
    }

    return (
        <div>
            <div className="nav">
                <div className="navBarContainer">
                    <h1 className="logo">FitnessTrack</h1>
                    <div className="mobileIcon">
                        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar}/>
                    </div>
                    {isAuthenticated && (
                        <div className="navMenu">
                        </div>
                    )}
                    <div className="navBtn">
                        <button onClick={toggleProfileMenu}>Profile</button>
                        {!isAuthenticated ? (
                            <Link to={'/login'}>Sign In</Link>
                        ) : (
                            <Link to={'/login'} onClick={logout}>Log Out</Link>
                        )}

                    </div>
                </div>
            </div>
            {active && (
                <ProfileMenu />
            )}
        </div>

    );
}


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);