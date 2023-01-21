import {useEffect, useState} from "react";
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const Api_url = 'http://www.omdbapi.com/?apikey=e1f56c10';



function App() {
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
      const response = await fetch(`${Api_url}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
    }  

    useEffect(() => {
      searchMovie('');
    }, []);

  return (
    <div className="app">
      <h1>KinoStation</h1>

      <div className="search">
    <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => {
      if (e.key === 'Enter') {
        searchMovie(searchTerm);
      }
    }}/>
    <img src={SearchIcon} alt="Search-icon" onClick={() => searchMovie(searchTerm)}/>
</div>

    {
      movies?.length > 0
      ? (
        <div className="container">  
        {movies.map((movie) =>(
          <MovieCard movie={movie}/>
        ))}      
      </div>
      ) :(
        <div className="empty">
          <h2>Movie not found</h2>
        </div>
      )
    }

      
    </div>
  );
}

export default App;
