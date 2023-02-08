import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { useFormInputValidation } from "react-form-input-validation";



const Register = ({ setAlert, register, isAuthenticated }) => {

    const [fields, errors, form] = useFormInputValidation({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        password_confirmation: '',
    }, {
        firstName: 'required',
        lastName:'required',
        email: "required|email",
        password: "required",
        password_confirmation: "required|same:password",
    });

    const { firstName, lastName, email, password } = fields


    const handleOnSubmit = async (e) => {
        e.preventDefault();

            await register( { firstName, lastName, email, password} );

    };

    // Redirect User after Registration
    if (isAuthenticated) {
        return <Navigate to='/'/>;
    }


return (
    <section>
            <div className="register">
                <div className="col-1">
                    <h2>Create an Account</h2>
                    <form id="authForm" className="flex flex-col" onSubmit={handleOnSubmit} >
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={fields.firstName}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.firstName ? errors.firstName : ""}</span>
                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={fields.lastName}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.lastName ? errors.lastName : ""}</span>
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={fields.email}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.email ? errors.email : ""}</span>
                        <input
                            type='text'
                            placeholder='Password'
                            minLength='6'
                            name='password'
                            value={fields.password}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.password ? errors.password : ""}</span>
                        <input
                            type='text'
                            placeholder='Confirm Password'
                            minLength='6'
                            name='password_confirmation'
                            value={fields.password_confirmation}
                            onChange={form.handleChangeEvent}
                            onBlur={form.handleBlurEvent}
                            required
                        />
                        <span className="error">{errors.password_confirmation ? errors.password_confirmation : ""}</span>
                        <button className="btn">Register</button>
                        <span>Already have an account? <Link to="/login"> Login </Link></span>
                    </form>
                </div>
            </div>
        </section>
);
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);