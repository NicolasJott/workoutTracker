import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {Link, Navigate} from "react-router-dom";
import { login } from '../actions/auth';
import {connect} from "react-redux";
import { useFormInputValidation } from "react-form-input-validation";
import PropTypes from 'prop-types';




const Login = ({ login, isAuthenticated }) => {
        const [fields, errors, form] = useFormInputValidation({
            email: '',
            password: '',
        } , {
            email: "required|email",
            password: "required"
        });

        const { email, password } = fields;



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
                    <form id="authForm" className="flex flex-col" onSubmit={handleOnSubmit} >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={fields.email}
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                        />
                        <span className="error">{errors.email ? errors.email : ""}</span>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={fields.password}
                            onBlur={form.handleBlurEvent}
                            onChange={form.handleChangeEvent}
                        />
                        <span className="error">{errors.password ? errors.password : ""}</span>
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