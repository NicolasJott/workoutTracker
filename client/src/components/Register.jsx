import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, registerUser } from '../actions/authAction';
import '../styles/Register.css'


function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");





    const handleRegister = (e) => {
        e.preventDefault();

        const userCheck = /^[a-z0-9_.-]{6,25}$/igm;

        if (password.length < 8) {
            toast.error("Password length must be atleast 8 characters");
            return;
        }

        dispatch(registerUser(email, password))
    }



    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate]);

return (
    <section>
            <div className="register">
                <div className="col-1">
                    <h2>Create an Account</h2>
                    <form id="form" className="flex flex-col" onSubmit={handleRegister} >
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn">Register</button>
                        <span>Already have an account? <Link to="/login"> Login </Link></span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
);
}

export default Register;