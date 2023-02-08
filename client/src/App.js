import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Headers/Header";
import Home from "./components/Home";
import MealTracker from "./components/MealTracker";
import Register from "./components/Register";
import WorkoutPage from "./components/workout/WorkoutPage";
import NotFound from "./components/layout/NotFound";
import Login from "./components/Login"
import React, {useEffect} from "react";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from 'react-redux';
import { store } from './store';
import { loadUser } from './actions/auth';
import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';

import './App.css'

function App() {

    useEffect(() => {
        // check for token in LS when app first runs
        if (localStorage.token) {
            // if there is a token set axios headers for all requests
            setAuthToken(localStorage.token);
        }
        // try to fetch a user, if no token or invalid token we
        // will get a 401 response from our API
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
              <Alert/>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>}/>
                  <Route path='workout'
                         element={<PrivateRoute component={WorkoutPage}/> }
                         />
                  <Route path='meal'
                         element={<PrivateRoute component={MealTracker}/> }
                  />
                  <Route path='/*' element={<NotFound/>} />
              </Routes>
              <Footer/>
          </BrowserRouter>
      </Provider>


  );
}

export default App;
