import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import {FaPlay} from "react-icons/fa"
import {FaEye} from "react-icons/fa"
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import {  useSelector } from 'react-redux';
import './Movie/movie.css'
function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('Doraemon');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const apiKey = "1a2127e5";
  const movieContainerRef = useRef(null);
  const location = useLocation();
  const user = location.state?.user;
  useEffect(() => {
    fetchData();
  }, [search, type, page]);
  const dispatch = useDispatch();
  const watchlist = useSelector(state => state.cart.items);
  const addMovie = (movi) => {
    const isExisting = watchlist.some((item) => item.imdbID === movi.imdbID);
    if (isExisting) {
      toast.error("Movie already exists in the watchlist");
    } else {
      dispatch(addItem(movi));
      toast.success("Added to Watchlist");
    }
  };
  
  
  const fetchData = () => {
    setLoading(true);
    if (search.trim() === '') {
      setData([]);
      setPage(1);
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${search}&y=${search}&${type ? `type=${type}&` : ''}&page=${page}&apikey=${apiKey}`)
      .then((res) => res.json())
      .then((dta) => {
        setLoading(false)
        console.log(dta)
        if (dta.Search) {
          if (page === 1) {
            setData(dta.Search);
          } else {
            setData(prevData => [...prevData, ...dta.Search]);
          }

        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleMovieLink = (movie) => {
    if (movie.Title) {
      const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movie.Title + ' full movie'
      )}`;

      window.open(youtubeLink, '_blank');
    } else {
      console.error('Movie title is undefined');
    }

    setSelectedMovie(null);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleTypeClick = (selectedType) => {
    setType(selectedType);
  };

  const handleScroll = () => {
    if (
      movieContainerRef.current &&
      window.innerHeight + window.scrollY >= movieContainerRef.current.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
     {loading ? (
                <div className="w-full min-h-screen flex justify-center items-center bg-[#070F2B] text-white">
                    <span class="loader"></span>
                </div>
            ) : (
      <div className="bg-[#070F2B] min-h-screen font-sans overflow-hidden m-0">
        <div className="p-8 flex sm:flex-row flex-col gap-4 items-center">
          <input
            className="w-96 mx-4 h-12 border px-2 rounded-full bg-transparent focus:outline-none text-white"
            type="text"
            placeholder="Find a movie & TV"
            value={search}
            onChange={handleChange}
          />
          <button className="border-xs p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all" onClick={() => setPage(1)}>
            Search
          </button>
          <div className="flex gap-4 items-center">
            {['movie', 'series', 'episode'].map((filter) => (
              <button
                key={filter}
                className={`text-sm font-semibold px-4 py-2 rounded-full ${type === filter
                  ? 'bg-violet-500 text-white'
                  : 'bg-purple-200 text-purple-800 hover:bg-purple-300 hover:text-purple-900'
                  }`}
                onClick={() => handleTypeClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
         {user ? (
          <div>
            <p>Welcome, {user.email}!</p>
          </div>
        ) : (
          <p>Welcome, Guest!</p>
        )}
        <div className="flex justify-center flex-wrap gap-2 sm:gap-6 items-center" ref={movieContainerRef}>
          {data.map((m) => (
            <div
              key={m.imdbID}
              className="w-44 h-56 sm:w-64 sm:h-96 text-white rounded-md cursor-pointer transform hover:scale-105 transition-transform overflow-hidden"
              onClick={() => handleMovieClick(m)}
            >
              <img
                className="w-full h-full object-cover rounded-md"
                src={m.Poster}
                alt={`${m.Title} Poster`}
              />
              <div className="absolute bottom-4 left-2 sm:left-4 flex gap-2">
              <button
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                title="Play"
                onClick={() => handleMovieLink(m)}><FaPlay/></button>
              <Link to={`/movie/${m.imdbID}`}>
                <button
                  className="bg-violet-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  title="View More"
                >
                  <FaEye/>
                </button>
              </Link>
              <button
              onClick={()=> addMovie(m)}
                  className=" bg-violet-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  title="Add to Watchlist"
                >
                  <FaBookmark/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </>
  );
}

export default Home;
