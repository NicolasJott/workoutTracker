import {Link } from "react-router-dom";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";


const Sidebar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    function toggleSidebar(){
        const sidebar = document.querySelector('.sidebarContainer')
        sidebar.classList.toggle('open');
    }

    function handleLogout() {
        logout()
        toggleSidebar()
    }

    return (
        <div className="sidebarContainer">
            <div className="icon">
                <FontAwesomeIcon icon={faClose} onClick={toggleSidebar}/>
            </div>
            <div className="sidebarWrapper">
                {isAuthenticated && (
                    <div className="sidebarMenu">
                        <Link to={'/'} onClick={toggleSidebar}>Home</Link>
                        <Link to={'/workout'} onClick={toggleSidebar}>Workout</Link>
                        <Link to={'/meal'} onClick={toggleSidebar}>Calorie</Link>
                    </div>
                )}
                <div className="sideBtnWrap">
                    {!isAuthenticated ? (
                        <Link to={'/login'}> Sign In</Link>
                    ) : (
                        <Link to={'/login'} onClick={handleLogout}>Logout</Link>
                    )}

                </div>
            </div>
        </div>
    );
}


Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Sidebar);