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

    function handleLogout() {
        setActive(false)
        logout()
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
                            <div className="navItem">
                                <Link to={'/'}>Home</Link>
                            </div>
                            <div className="navItem">
                                <Link to={'/workout'}>Workout</Link>
                            </div>
                            <div className="navItem">
                                <Link to={'/meal'}>Calorie</Link>
                            </div>
                        </div>
                    )}
                    <div className="navBtn">
                        {!isAuthenticated ? (
                            <Link to={'/login'}>Sign In</Link>
                        ) : (
                            <div>
                                <div className="profile-btn" onClick={toggleProfileMenu}><img src="/profile_picture.jpg" alt=""/></div>
                                {/*<Link to={'/login'} onClick={logout}>Log Out</Link>*/}
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {active && isAuthenticated && (
                <ProfileMenu onLogout={handleLogout} onClick={toggleProfileMenu} />
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