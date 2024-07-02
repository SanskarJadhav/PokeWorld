// Starters.js
import React from 'react';
// using a resuable component PokemonCard
import PokemonCard from './pokemoncard';
import fireType from '../assets/fire.png';
import waterType from '../assets/water.png';
import grassType from '../assets/grass.png';
import charmander from '../assets/charmander.png';
import squirtle from '../assets/squirtle.png';
import bulbasaur from '../assets/bulbasaur.png';
import cyndaquil from '../assets/cyndaquil.png';
import totodile from '../assets/totodile.png';
import chikorita from '../assets/chikorita.png';
import torchic from '../assets/torchic.png';
import mudkip from '../assets/mudkip.png';
import treecko from '../assets/treecko.png';
import '../styles/pokemoncard.css';
import '../styles/starters.css';

function Starters() {
    const region = localStorage.getItem('region');
    // let variables for Pokemon and hover image
    let pokemon1, hoverImage1, pokemon2, hoverImage2, pokemon3, hoverImage3;
    // switch case to determine which Pokemon and hover image to use based on region
    switch(region) {
        case 'Kanto':
            pokemon1 = "Charmander";
            hoverImage1 = charmander;
            pokemon2 = "Squirtle";
            hoverImage2 = squirtle;
            pokemon3 = "Bulbasaur";
            hoverImage3 = bulbasaur;
            break;
        case 'Johto':
            pokemon1 = "Cyndaquil";
            hoverImage1 = cyndaquil;
            pokemon2 = "Totodile";
            hoverImage2 = totodile;
            pokemon3 = "Chikorita";
            hoverImage3 = chikorita;
            break;
        case 'Hoenn':
            pokemon1 = "Torchic";
            hoverImage1 = torchic;
            pokemon2 = "Mudkip";
            hoverImage2 = mudkip;
            pokemon3 = "Treecko";
            hoverImage3 = treecko;
            break;
        default:
            // Default to Kanto Pokemon and hover image if region is not recognized
            pokemon1 = "Charmander";
            hoverImage1 = charmander;
            pokemon2 = "Squirtle";
            hoverImage2 = squirtle;
            pokemon3 = "Bulbasaur";
            hoverImage3 = bulbasaur;
    }
    return (
        <div className="card-container">
            <h1>Select your Starter!</h1>
            <div className="row">
                <PokemonCard
                    type="Fire"
                    imageUrl={fireType}
                    pokemon={pokemon1}
                    hoverImage={hoverImage1}
                    info="Fire types are notoriously rare in the earlier games so choosing the Fire variation starter is often a plus!"
                    className="fire-modal"
                />
                <PokemonCard
                    type="Water"
                    imageUrl={waterType}
                    pokemon={pokemon2}
                    hoverImage={hoverImage2}
                    info="Water is the most common type with over 150 Pokémon that are all based on a variety of fish and other sea-dwelling creatures!"
                    className="water-modal"
                />
                <PokemonCard
                    type="Grass"
                    imageUrl={grassType}
                    pokemon={pokemon3}
                    hoverImage={hoverImage3}
                    info="Grass is one of the weakest types statistically, so select a Grass type starter if you are looking for a real challenge!"
                    className="grass-modal"
                />
            </div>
        </div>
    );
}

export default Starters;
