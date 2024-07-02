import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

function Navbar(){
    return (
        <div className="navbar">
            <div className="leftSide">
                <img src={logo} alt="pokemon_badge"/>
            </div>
            <div className="rightSide">
                <Link to="/">Home</Link>
                <Link to="/Login">Login</Link>
            </div>
        </div>
    );
}

export default Navbar;