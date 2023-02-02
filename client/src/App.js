import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import MealTracker from "./components/MealTracker";
import Register from "./components/Register";
import Workout from "./components/Workout";
import Login from "./components/Login"





function App() {




  return (
      <div>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/workout" element={<Workout/>} />
            <Route path="/meal" element={<MealTracker/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
          <Footer/>
        </Router>
      </div>

  );
}

export default App;
