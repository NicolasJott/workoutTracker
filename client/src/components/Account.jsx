import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from "../actions/auth";



const Account = ( { auth: { user, isAuthenticated }, logout}) => {

    const [activeTab, setActiveTab] = useState("personalInfo")

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="Container">
            <div className="profile-container">
                <div className="profile">
                    <div className="profile-left">
                        <div className="column-items">
                            <ul>
                                <li className={activeTab === "personalInfo" ? "active" : "inactive"} onClick={() => handleTabChange("personalInfo")}>Personal Information</li>
                                <li className={activeTab === "personalGoals" ? "active" : "inactive"} onClick={() => handleTabChange("personalGoals")}>Personal Goals</li>
                                <li className={activeTab === "privacy" ? "active" : "inactive"} onClick={() => handleTabChange("privacy")}>Privacy Settings</li>
                                <li className={activeTab === "security" ? "active" : "inactive"} onClick={() => handleTabChange("security")}>Security</li>
                            </ul>
                            <div className="left-column-btm">
                                <Link className="delete-acct-btn" to="/login" onClick={logout}>Log Out</Link>
                                <Link className="delete-acct-btn" to="/login">Delete Account</Link>
                            </div>
                        </div>
                    </div>
                    <div className="profile-right">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

Account.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Account);