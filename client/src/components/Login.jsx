import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Register.css'

function setToken(userToken){
    sessionStorage.setItem("token", JSON.stringify(userToken))

}

const Login = () => {
    setToken(null)


    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const generateError = (err) =>
        toast.error(err, {
            position:"bottom-right",
        });



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post("http://localhost:3001/login",{
                ...values
            },{
                withCredentials: true
            });
            if(data) {
                if(data.errors) {
                    const {email,password} = data.errors;
                    if(email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/")
                    setToken(data.token)

                }
            }
        }catch (err) {
            console.log(err)
        }
    };

    return (
        <section>
        <div className="register">
            <div className="col-1">
                <h2>Log into Account</h2>
                <form id="form" className="flex flex-col" onSubmit={handleSubmit} >
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                        setValues({...values, [e.target.name]: e.target.value})
                        }
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) =>
                        setValues({...values, [e.target.name]: e.target.value})
                        }
                    />
                    <button className="btn">Log in</button>
                    <span>Don't have an account? <Link to="/register"> Register </Link></span>
                </form>
            </div>
        </div>
        <ToastContainer />
    </section>
    );
}

export default Login;