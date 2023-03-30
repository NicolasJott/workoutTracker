import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../../actions/auth";
import {Link} from "react-router-dom";



const ProfileMenu = ({ auth: user}, logout) => {

    return(
        <div>
            <div className="profile-box">
                <div className="box-header">
                    <img className="profile-picture" src="" alt="profile picture"/>
                    <h2>{user["firstName"] + " " + user["lastName"]}</h2>
                </div>
                <div className="box-contents">
                    <h2>Profile</h2>
                    <Link to={'/login'} onClick={logout}>Log Out</Link>
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