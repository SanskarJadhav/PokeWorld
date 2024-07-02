import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function Navbar2(){
    const handleLogout = () => {
        // remove username from localStorage
        localStorage.removeItem('username');
    };

    return (
        <div className="navbar">
            <div className="leftSide">
                <img src={logo} alt="pokemon_badge"/>
            </div>
            <div className="rightSide">
                <Link to="/Regions">Change Region</Link>
                <Link to="/Login" onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    );
}

export default Navbar2;