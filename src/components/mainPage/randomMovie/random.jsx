import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './random.scss';

function Random({ movie, onPickAnother, addFavorite, removeFavorite }) {

    const navigate = useNavigate();
    const [isFavorite, setIsFavorite]= useState(false);

    const handleShowDetailsClick = () => {

        navigate(`/${movie.imdbID}`);
    
    };

    const handleAddFavorite = () => {
        if (isFavorite){
            removeFavorite(movie.imdbID);
            setIsFavorite(false);
        }
        else{
            addFavorite(movie);
            setIsFavorite(true);
        }
        };
    return (
        <div className='movie'>
            <button className='add-favorites' onClick={handleAddFavorite}>{isFavorite? <FontAwesomeIcon icon={faStarSolid}/> : <FontAwesomeIcon icon={faStarRegular}/> } </button>
            <h2>{movie.Title}</h2>
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
                alt={movie.Title}
            />
            <p>Year: {movie.Year}</p>
            <div className='buttons'>
                <button className='btn outline' onClick={handleShowDetailsClick}>See Movie Details</button>
                <button className='btn fill' onClick={onPickAnother}>Pick another Flick</button>
            </div>
        </div>
    );
}

export default Random;
