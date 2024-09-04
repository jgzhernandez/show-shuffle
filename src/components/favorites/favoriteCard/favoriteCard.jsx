import React from 'react';
import { useNavigate } from 'react-router-dom';
import './favoriteCard.scss';

function FavoriteCard({ movie}) {
  const navigate = useNavigate();

  const handleFavoriteCardClick = () => {
    navigate(`/${movie.imdbID}`);
  }

  return (

    <div className='favorite-card'>
        <div className='card-container' onClick={handleFavoriteCardClick}>
        <img
            className='poster'
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
            alt={movie.Title}
        />
        </div>
    </div>
  );
}

export default FavoriteCard;
