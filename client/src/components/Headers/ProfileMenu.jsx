import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {Link} from "react-router-dom";



const ProfileMenu = ( { auth: { isAuthenticated, loading, user }, onLogout }) => {

    const [userName, setUserName] = useState(user["firstName"] + " " + user["lastName"])
    const [userEmail, setUserEmail] = useState(user["email"])
    return(
        <div>
            <div className="profile-box">
                <div className="profile-box-inner">
                    <div className="box-header">
                        <img className="profile-picture" src="/profile_picture.jpg" alt="profile picture"/>
                        <div className="right-header">
                            <h2>{userName}</h2>
                            <p>{userEmail}</p>
                        </div>
                    </div>
                    <div className="box-contents">
                        <div className="profile-block">
                            <Link to={'/profile'}><h2>Profile</h2></Link>
                        </div>
                        <div className="logout-block">
                            <Link to={'/login'} onClick={onLogout}><h2>Log Out</h2></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

ProfileMenu.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, { logout })(ProfileMenu);