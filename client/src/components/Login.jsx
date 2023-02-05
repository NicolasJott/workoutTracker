import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Register.css'
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import { clearErrors, loginUser } from '../actions/authAction';
import Cookies from "js-cookie";





const Login = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate("/")
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Log In</h2>
                    <form id="form" className="flex flex-col" onSubmit={handleLogin} >
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
                        <button className="btn">Login</button>
                        <span>Don't have an account? <Link to="/register"> Register </Link></span>
                    </form>
                </div>
                <ToastContainer />
            </div>

        </section>
    );
}

export default Login;