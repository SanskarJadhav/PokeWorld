import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ type, imageUrl, pokemon, hoverImage, info, className}) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    // extracting the 'pokemon' prop as a constant
    const pokemonName = pokemon.toLowerCase();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const selectStarter = (starter) => {
        // Send selected region to backend
        fetch('http://localhost:4000/save-starter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, starter })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to save starter pokemon');
            }
            // save region chosen to local browser storage
            localStorage.setItem('starter', starter);
            // redirect to Starters page
            navigate('/Play');
          })
          .catch(error => {
            console.error('Error saving starter:', error);
          });
      };

    return (
        <div className="pokemon-card">
            <div className="card">
                <div className="card-inner">
                    <div className="card-front">
                        <img src={imageUrl} className="card-img-top" alt={type} />
                        <h4 className="card-title">Hover to reveal!</h4>
                    </div>
                    <div className="card-back">
                        <img src={hoverImage} className="card-img-top" alt={pokemon} />
                        <h5 className="card-title">{pokemon}</h5>
                        <button className="btn btn-secondary" onClick={() => selectStarter(pokemonName)}>
                            I Choose You!
                        </button>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={openModal}>
                Learn More
            </button>
            {showModal && (
                <div className="modal">
                    <div className={`modal-content ${className}`}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div>
                            <h2>{type}</h2>
                            <p>{info}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonCard;

