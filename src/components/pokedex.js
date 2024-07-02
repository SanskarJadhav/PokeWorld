import React, { useState, useEffect } from 'react';
import '../styles/pokedex.css';

const Pokedex = ({ isOpen, handleClose }) => { // Pass isOpen and handleClose as props
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State to track the selected Pokemon

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/records');
      const data = await response.json();
      setPokemonList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`pokedex-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="close-btn" onClick={handleClose}>x</button>
      <input
        className="search-bar"
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon._id} className="pokemon-eachcard" onClick={() => handlePokemonClick(pokemon)}>
            <img src={pokemon.PixelImg} alt={pokemon.Name} />
            <h3>{pokemon.Name}</h3>
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className={`pokemon-details ${selectedPokemon ? 'show' : ''}`}>
          <button className="close-btn" onClick={() => setSelectedPokemon(null)}>x</button>
          <img src={selectedPokemon.FirstImg} alt={selectedPokemon.Name} />
          <h2>{selectedPokemon.Name}</h2>
          <p>{selectedPokemon.Description}</p>
          <p><strong>Type:</strong> {selectedPokemon.Type}</p>
          <p><strong>Weak Against:</strong> {selectedPokemon.WeakAgainst}</p>
          <p><strong>Strong Against:</strong> {selectedPokemon.StrongAgainst}</p>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
