import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import '../styles/Register.css'


const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    const {name, email, password, password2} = formData;

    const handleOnChange = (e) =>
        setFormData({...formData, [e.target.name]: e.target.value});

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            await register({ email,  password});
        }
    };

    // Redirect User after Registeration
    if (isAuthenticated) {
        return <Navigate to='/'/>;
    }


return (
    <section>
            <div className="register">
                <div className="col-1">
                    <h2>Create an Account</h2>
                    <form id="form" className="flex flex-col" onSubmit={handleOnSubmit} >
                        <input
                            type='email'
                            placeholder='Email Address'
                            name='email'
                            value={email}
                            onChange={handleOnChange}
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            minLength='6'
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            required
                        />
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            minLength='6'
                            name='password2'
                            value={password2}
                            onChange={handleOnChange}
                            required
                        />
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