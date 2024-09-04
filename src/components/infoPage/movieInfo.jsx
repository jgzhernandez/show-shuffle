import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './movieInfo.scss';


const OMDB_API_KEY = '34d27982';

function MovieInfo({favorites, addFavorite, removeFavorite}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite]= useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data);
                    const isFav = favorites.some(fav => fav.imdbID === data.imdbID);
                    setIsFavorite(isFav);
                } else {
                    setError('Movie details not found.');
                }
            } catch (err) {
                setError('Failed to fetch movie details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();


    }, [id, favorites]);

    if (loading) {
        return <div className='movieInfo'>Loading...</div>;
    }

    if (error) {
        return <div className='movieInfo'>{error}</div>;
    }

    const handleAddFavorite = () => {
        if (isFavorite){
            removeFavorite(movie.imdbID);
            setIsFavorite(false);
            console.log(movie.imdbID)
        }
        else{
            addFavorite(movie);
            setIsFavorite(true);
        }
        };

    const handleBackButton = () => {

        navigate(-1);
    
    };

    const handleGoToFavorites = () => {
        navigate('/favorites');
    };


    return (
        <div className='movieInfo'>
            <div className='container-movie'>
            <button className='back-button' onClick={handleBackButton}><FontAwesomeIcon icon={faArrowLeft} /></button>
            {movie && (
                <>
                    <div className='left'>
                    
                    <img
                        className='poster'
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg'}
                        alt={movie.Title}
                    />
                    </div>
                    <div className='right'>
                        <div className='details'>
                        <h1>{movie.Title}</h1>
                        <p> <strong>Directed by:</strong> {movie.Director}</p>
                        <p> <strong> Written by:</strong> {movie.Writer}</p>
                        <p><strong>Starring: </strong> {movie.Actors}</p>
                        <p><strong>Released on: </strong> {movie.Released}</p>
                        <p><strong>Type: </strong> {movie.Type}</p>
                        <p><strong>Genre: </strong> {movie.Genre}</p>
                        <p><strong>Language: </strong> {movie.Language}</p>
                        <p><strong>IMDB Rating: </strong> {movie.imdbRating}</p>
                        <p><strong>Plot Summary: </strong> {movie.Plot}</p>

                        <button className={`favorites-action-button ${isFavorite ? 'remove' : 'add'}`} onClick={handleAddFavorite}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                        
                        </div>
                    </div>
                    
                </>
            )}

            <button className='favorite-button' onClick={handleGoToFavorites}><FontAwesomeIcon icon={faStar} /></button>
            </div>
        </div>
    );
}

export default MovieInfo;
