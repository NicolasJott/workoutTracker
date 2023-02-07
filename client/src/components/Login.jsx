import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {Link, Navigate} from "react-router-dom";
import '../styles/Register.css'
import { login } from '../actions/auth';
import {connect} from "react-redux";
import PropTypes from 'prop-types';




const Login = ({ login, isAuthenticated }) => {
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

        const { email, password } = formData;

        const handleOnChange = (e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value });

        const handleOnSubmit = async (e) => {
            e.preventDefault();

            await login(email, password);
        };

        if(isAuthenticated) {
            return <Navigate to='/' />;
        }

        return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Log In</h2>
                    <form id="form" className="flex flex-col" onSubmit={handleOnSubmit} >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleOnChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleOnChange}
                        />
                        <button className="btn">Login</button>
                        <span>Don't have an account? <Link to="/register"> Register </Link></span>
                    </form>
                </div>
            </div>
        </section>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);