import {Link } from "react-router-dom";
import {logout} from "../../actions/auth";
import PropTypes from "prop-types";
import {connect} from "react-redux";




const Header = ({ auth: { isAuthenticated, loading }, logout}) => {
    const authVisible = (
        <><div className="navMenu">
            <Link to="/">Home</Link>
            <Link to="/workout">Workout</Link>
            <Link to="/meal">Calorie Tracker</Link>
        </div>
            <div className="rightMenu">
                <button className="navbtn" onClick={logout}>Logout</button>
            </div></>

    )

    const guestVisible = (
        <Link to="/login">Login</Link>
    )

    return (
       <header>
           <div className="logo">
               <h1><Link to="/">FitnessTrack</Link></h1>
           </div>

           {!loading && <>{isAuthenticated ? authVisible : guestVisible}</>}
       </header>
    );

}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, {logout})(Header);