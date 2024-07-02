import React, { useState } from 'react';
import Pokedex from './pokedex';
import Forest from './forest';
import Profile from './profile';
import Navbar2 from './navbar2';
import '../styles/play.css';

function Play() {
    const [activeOption, setActiveOption] = useState(null);
    const [isPokedexOpen, setIsPokedexOpen] = useState(false);
    const [isForestOpen, setIsForestOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setIsPokedexOpen(option === 'pokedex');
        setIsForestOpen(option === 'forest');
        setIsProfileOpen(option === 'profile');
    }

    const renderActiveComponent = () => {
        switch (activeOption) {
            case 'pokedex':
                return <Pokedex isOpen={isPokedexOpen} handleClose={() => setIsPokedexOpen(false)} />;
            case 'forest':
                return <Forest isOpen={isForestOpen} handleClose={() => setIsForestOpen(false)} />;
            case 'profile':
                return <Profile isOpen={isProfileOpen} handleClose={() => setIsProfileOpen(false)} />;
            default:
                return null;
        }
    }

    return (
        <div>
        <Navbar2/>
        <div className='visual'>
            <h1>Begin Your Pokémon Adventure!</h1>
            <div className="options">
                <button onClick={() => handleOptionClick('pokedex')}>View Pokédex</button>
                <button onClick={() => handleOptionClick('forest')}>Explore the Forest</button>
                <button onClick={() => handleOptionClick('profile')}>View Profile</button>
            </div>
            <div className="play">
                {renderActiveComponent()}
            </div>
        </div>
        </div>
    );
}

export default Play;
