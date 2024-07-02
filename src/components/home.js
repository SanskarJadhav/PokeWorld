import React from "react";
import logo from "../assets/logo.png";
import Navbar from './navbar';
import "../styles/home.css";

function Home(){
    return (
        <div>
        <Navbar/>
        <div className="home">
            <div className="hometop">
                <h1>Venture into the World of Pokémon</h1>
            </div>  
            <div className="homediv2">
                <div className="leftSide">
                    <img src={logo} alt="logo"/>
                </div>
                <div className="rightSide">
                    <div className="rightText">
                    <h3>Become the Ultimate Trainer & Collect All Pokémon!</h3>
                    <h5>Travel to different regions, encounter wild pokémon, and try to catch them all!</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Home;