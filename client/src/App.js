import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Headers/Header";
import Home from "./components/Home";
import MealTracker from "./components/MealTracker";
import Register from "./components/Register";
import Workout from "./components/Workout";
import Login from "./components/Login"
import React, {useEffect} from "react";

import { Provider } from 'react-redux';
import { store } from './store';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';


function App() {

    useEffect(() => {

        if (localStorage.token) {
            // if there is a token set axios headers for all requests
            setAuthToken(localStorage.token);
        }

        store.dispatch(loadUser());

        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/workout" element={<Workout/>} />
                  <Route path="/meal" element={<MealTracker/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>

      </Provider>






  );
}

export default App;
