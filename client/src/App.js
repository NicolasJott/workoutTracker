import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Headers/Header";
import Home from "./components/Home";
import MealTracker from "./components/MealTracker";
import Register from "./components/Register";
import Workout from "./components/Workout";
import Login from "./components/Login"
import React, {useEffect, Suspense} from "react";

import {useDispatch, useSelector} from "react-redux";
import LoggedOutHeader from "./components/Headers/LoggedOutHeader";
import {loadUser} from "./actions/authAction";
import Cookies from 'js-cookie'


function App() {

    const dispatch = useDispatch();
    const { isAuthenticated }   = useSelector((state) => state.user);



  return (
        <>
            {isAuthenticated && <Header/>}
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workout" element={<Workout/>} />
                    <Route path="/meal" element={<MealTracker/>} />
                </Routes>
                {!isAuthenticated && <LoggedOutHeader/>}
                <div>
                    <Routes>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                    </Routes>
                    <Footer/>
                </div>
            </Suspense>

        </>




  );
}

export default App;
