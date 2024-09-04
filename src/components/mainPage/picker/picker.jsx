import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../loadingRandom/loading';
import Random from '../randomMovie/random';
import './picker.scss';


const OMDB_API_KEY = '60081a0c';

function Picker({addFavorite, removeFavorite}) {

    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getRandomMovie = async () => {
      setLoading(true);
      setMovie(null);
      setError(null);

      let movieFound = false;

      while (!movieFound) {
          const randomId = `tt${Math.floor(1+ Math.random() * 9999999)}`;

          try {
              const response = await fetch(`http://www.omdbapi.com/?i=${randomId}&apikey=${OMDB_API_KEY}`);
              const data = await response.json();

              if (data.Response === 'True' && data.Type === 'movie') {
                  setMovie(data);
                  movieFound = true;
              } else {
                  console.log('No movie found, retrying...');
              }
          } catch (err) {
              setError('Failed to fetch data. Please try again later.');
              setLoading(false);
              return;
          }

          await new Promise(resolve => setTimeout(resolve, 100));  
      }

      setLoading(false);
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
};

    return (
        <div className='picker'>
            <div className='container'>
                {loading ? (
                    <Loading></Loading>
                ) : movie ? (
                    <Random movie={movie} onPickAnother={getRandomMovie} addFavorite={addFavorite} removeFavorite={removeFavorite}></Random>
                ) : (
                    <>
                        <div className='header'>
                            <h1>Show Shuffle</h1>
                            <p>Hit the button to discover today’s cine magic.<br />
                               Find your perfect film for a cozy or thrilling night ahead!</p>
                        </div>
                        <div className='buttons'>
                            <button className='btn fill' onClick={getRandomMovie}>Pick a Flick</button>
                        </div>
                    </>
                )}
                {error && <p className='error'>{error}</p>}
            </div>
            <button className='favorite-button' onClick={handleGoToFavorites}>
            <div class="tooltip initiator"><FontAwesomeIcon icon={faStar}/></div>
            <div class="tooltip item"> Go to Favorites </div>
            </button>
        </div>
    );
}

export default Picker;
