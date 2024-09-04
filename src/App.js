import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './components/favorites/favorites';
import MovieInfo from './components/infoPage/movieInfo';
import Picker from './components/mainPage/picker/picker';

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (movie) => {
    const isAlreadyFavorite = favorites.includes(movie);
    if (!isAlreadyFavorite) {
      const newFavoritesList = [...favorites,movie]
      setFavorites(newFavoritesList);
    }
    else{
      console.log("already in favorites");
    }
  };

  const removeFavorite = (imdbID) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
};

  console.log(favorites)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Picker addFavorite={addFavorite} removeFavorite={removeFavorite} />} />
          <Route path="/:id" element={<MovieInfo favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
