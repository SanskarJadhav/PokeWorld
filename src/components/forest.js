import React, { useState, useEffect, useCallback } from 'react';
import '../styles/forest.css';

const Forest = ({ isOpen, handleClose }) => {
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [catchProbability, setCatchProbability] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const fetchRandomPokemon = useCallback(async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const response = await fetch('http://localhost:4000/random');
      const data = await response.json();
      setRandomPokemon(data);
      calculateCatchProbability(data);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  }, []);

  useEffect(() => {
    // fetching a new random Pokémon when the component is opened or closed
    if (isOpen) {
      fetchRandomPokemon();
    }
  }, [isOpen, fetchRandomPokemon]);

  const calculateCatchProbability = async (pokemon) => {
    try {
      // retrieving the user's starter Pokémon name from localStorage
      const starterPokemonName = localStorage.getItem('starter');
      // gettint the type
      const response = await fetch(`http://localhost:4000/starter-pokemon?name=${starterPokemonName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch starter Pokémon');
      }
      const starterPokemon = await response.json();

      // Now that I have the starter Pokémon document, I can access its type
      const starterPokemonTypes = starterPokemon.Type.split(','); // Split by commas to handle multiple types
  
      // Calculate catch probability based on the starter Pokémon's types
      let probability = 0.5;
      for (const type of starterPokemonTypes) {
        if (pokemon.WeakAgainst.includes(type)) {
          probability = 0.75;
          break;
        }
        if (pokemon.StrongAgainst.includes(type)) {
          probability = 0.25;
          break;
        }
      }
      
      setCatchProbability(probability);
    } catch (error) {
      console.error('Error calculating catch probability:', error);
    }
  };
  
  const handleCatch = async () => {
    const catchResult = Math.random() < catchProbability;
    if (catchResult) {
      showBootstrapAlert('Congratulations! You caught the Pokémon!', 'success');
      try {
        const username = localStorage.getItem('username');
        const response = await fetch('http://localhost:4000/catch-pokemon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, caughtPokemonName: randomPokemon.Name })
        });
        const data = await response.json();
        if (data.success) {
          console.log('Pokemon collected successfully!');
        } else {
          console.error('Failed to collect Pokemon:', data.error);
        }
      } catch (error) {
        console.error('Error collecting Pokemon:', error);
      }
    } else {
      showBootstrapAlert('Oh no! The Pokémon got away...', 'danger');
    }
    handleClose();
  };  
  
  const showBootstrapAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'fixed-top', 'z-index-alert');
    alertDiv.style.top = '80px';
    alertDiv.role = 'alert';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 1500);
  };

  return (
    <div className={`forest-container ${isOpen ? 'open' : 'closed'}`}>
      <h2>You Encountered a Wild Pokémon!</h2>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        randomPokemon && (
          <div className="random-pokemon">
            <img src={randomPokemon.SecondImg} alt={randomPokemon.Name} />
            <h3>{randomPokemon.Name}</h3>
            <p>Catch Probability: {Math.round(catchProbability * 100)}%</p>
            <button onClick={handleCatch}>Throw a Pokéball</button>
          </div>
        )
      )}
    </div>
  );
};

export default Forest;