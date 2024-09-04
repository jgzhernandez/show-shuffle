import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteCard from './favoriteCard/favoriteCard';
import './favorites.scss';


function Favorites({ favorites}) {
  const navigate = useNavigate();
  
  const handleBackButton = () => {

    navigate(-1);

};
  return (

    <div className='favorites'>
        <div className='favorites-container'>
        <button className='back-button' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeft} /></button>
          <h1>Favorite Flicks</h1>
          <div className='grid'>
          {
            favorites.map((movie)=>(
                <FavoriteCard movie={movie} />
            ))
        }
          </div>
        </div>
        
    </div>
  );
}

export default Favorites;
