import {Link } from "react-router-dom";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";


const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {

    function toggleSidebar(){
        const sidebar = document.querySelector('.sidebarContainer')
        sidebar.classList.toggle('open');
    }
    return (
        <div className="nav">
            <div className="navBarContainer">
                <h1 className="logo">FitnessTracker</h1>
                <div className="mobileIcon">
                    <FontAwesomeIcon icon={faBars} onClick={toggleSidebar}/>
                </div>
                {isAuthenticated && (
                    <div className="navMenu">
                    </div>
                )}
                <div className="navBtn">
                    {!isAuthenticated ? (
                        <Link to={'/login'}>Sign In</Link>
                    ) : (
                        <Link to={'/login'} onClick={logout}>Log Out</Link>
                    )}

                </div>
            </div>
        </div>
    );
}


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);