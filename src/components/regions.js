import React, { useState } from 'react';
import hoenn from "../assets/Hoenn.mp4";
import johto from "../assets/Johto.mp4";
import kanto from "../assets/Kanto.mp4";
import sinnoh from "../assets/Sinnoh.mp4";
import unova from "../assets/Unova.mp4";
import kalos from "../assets/Kalos.mp4";
import alola from "../assets/Alola.mp4";
import "../styles/regions.css";
import { useNavigate } from 'react-router-dom';

function Regions() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const sliderNav = (direction) => {
    if (direction === 'prev') {
      setActiveSlide(activeSlide === 0 ? 6 : activeSlide - 1);
    } else {
      setActiveSlide(activeSlide === 6 ? 0 : activeSlide + 1);
    }
  };

  const selectRegion = (region) => {
    // Send selected region to backend
    fetch('http://localhost:4000/save-region', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, region })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save region');
        }
        // save region chosen to local browser storage
        localStorage.setItem('region', region);
        // redirect to Starters page
        navigate('/Starters');
      })
      .catch(error => {
        console.error('Error saving region:', error);
      });
  };

  return (
    <div className="region">
      <video className={activeSlide === 0 ? "videobox active" : "videobox"} src={kanto} autoPlay muted loop></video>
      <video className={activeSlide === 1 ? "videobox active" : "videobox"} src={johto} autoPlay muted loop></video>
      <video className={activeSlide === 2 ? "videobox active" : "videobox"} src={hoenn} autoPlay muted loop></video>
      <video className={activeSlide === 3 ? "videobox active" : "videobox"} src={sinnoh} autoPlay muted loop></video>
      <video className={activeSlide === 4 ? "videobox active" : "videobox"} src={unova} autoPlay muted loop></video>
      <video className={activeSlide === 5 ? "videobox active" : "videobox"} src={kalos} autoPlay muted loop></video>
      <video className={activeSlide === 6 ? "videobox active" : "videobox"} src={alola} autoPlay muted loop></video>
      
      <div className={activeSlide === 0 ? "content active" : "content"}>
        <h1>Kanto</h1>
        <p>Gen I Pokémon</p>
        <button onClick={() => selectRegion('Kanto')}>Select this region</button>
      </div>

      <div className={activeSlide === 1 ? "content active" : "content"}>
        <h1>Johto</h1>
        <p>Gen II Pokémon</p>
        <button onClick={() => selectRegion('Johto')}>Select this region</button>
      </div>

      <div className={activeSlide === 2 ? "content active" : "content"}>
        <h1>Hoenn</h1>
        <p>Gen III Pokémon</p>
        <button onClick={() => selectRegion('Hoenn')}>Select this region</button>
      </div>

      <div className={activeSlide === 3 ? "content active" : "content"}>
        <h1>Sinnoh</h1>
        <p>Gen IV Pokémon</p>
        <button onClick={() => selectRegion('Sinnoh')}>Select this region</button>
      </div>

      <div className={activeSlide === 4 ? "content active" : "content"}>
        <h1>Unova</h1>
        <p>Gen V Pokémon</p>
        <button onClick={() => selectRegion('Unova')}>Select this region</button>
      </div>

      <div className={activeSlide === 5 ? "content active" : "content"}>
        <h1>Kalos</h1>
        <p>Gen VI Pokémon</p>
        <button onClick={() => selectRegion('Kalos')}>Select this region</button>
      </div>

      <div className={activeSlide === 6 ? "content active" : "content"}>
        <h1>Alola</h1>
        <p>Gen VII Pokémon</p>
        <button onClick={() => selectRegion('Alola')}>Select this region</button>
      </div>

      <div className="nav-arrows">
        <div className="arrow left" onClick={() => sliderNav('prev')}>&#8249;</div>
        <div className="arrow right" onClick={() => sliderNav('next')}>&#8250;</div>
      </div>
    </div>
  );
}

export default Regions;