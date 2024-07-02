import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isOpen, handleClose }) => {
  const [userData, setUserData] = useState(null);
  const [starter, setStarter] = useState(localStorage.getItem('starter') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const handleSelectStarter = async (selectedPokemon) => {
      try {
          // Fetch the user's username from local storage
          const username = localStorage.getItem('username');

          // Update the selected starter in the backend
          const response = await fetch('http://localhost:4000/select-starter', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, newStarter: selectedPokemon }),
          });

          if (!response.ok) {
              throw new Error('Failed to update starter selection.');
          }

          // Update the selected starter in local storage and state
          localStorage.setItem('starter', selectedPokemon);
          setStarter(selectedPokemon);
      } catch (error) {
          console.error('Error:', error);
      }
  };  

  const fetchUserData = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await fetch(`http://localhost:4000/users?name=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
  
    if (confirmDelete) {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:4000/delete/${username}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete user account');
        }
        showBootstrapAlert('User account has been deleted', 'primary');
        localStorage.removeItem('username');
        localStorage.removeItem('region');
        localStorage.removeItem('starter');
        console.log('User account deleted successfully');
        navigate('/');
      } catch (error) {
        showBootstrapAlert('Error in deleting account', 'secondary');
        console.error('Error deleting user account:', error);
      }
    }
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

  const renderProfileData = () => {
    if (!userData) {
      return <p>Loading...</p>;
    }
    const username = localStorage.getItem('username');
    const region = localStorage.getItem('region');
    const { pokemonCollected } = userData;
  
    // Convert the pokemonCollected Map values to an array before joining
    const collectedPokemonArray = pokemonCollected ? Array.from(pokemonCollected.values()) : [];
  
    return(
      <div className="profile-details">
        <div className="profile-header">
          <p><strong>Name:</strong> {username}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Companion:</strong> <span style={{ textTransform: 'capitalize' }}>{starter}</span></p>
        </div>
        <div className="profile-pokemon-collected">
          <p><em>Click on any of the pokémon below to select a new companion</em></p>
          <strong>Pokémon Collected:</strong>
          <div className="profile-pokemon-list">
            {collectedPokemonArray.map((pokemon, index) => (
            <div className="profile-pokemon-list-item" key={index} onClick={() => handleSelectStarter(pokemon)}>
              {pokemon}
            </div>
          ))}
          </div>
        </div>
        <button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    );
  };

  return (
    <div className={`profile-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={handleClose}>x</button>
      {renderProfileData()}
    </div>
  );
};

export default Profile;
