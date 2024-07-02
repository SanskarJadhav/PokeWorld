import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Login from './components/login';
import Regions from './components/regions';
import Starters from './components/starters';
import Play from './components/play';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" exct Component={Home} />
        <Route path="/Regions" exct Component={Regions} />
        <Route path="/Login" exct Component={Login} />
        <Route path="/Starters" exct Component={Starters} />
        <Route path="/Play" exct Component={Play} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
