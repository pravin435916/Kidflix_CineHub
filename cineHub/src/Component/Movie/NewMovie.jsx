import React, { useState, useEffect } from 'react';
import { FaBookmark, FaPlay } from 'react-icons/fa';
import './movie.css'
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/CartSlice';
function NewMovie() {
    const [currentMovieDetail, setMovie] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();

  const addMovie = (movi) => {
    dispatch(addItem(movi));
    alert("Added to Watchlist")
  };
    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);
    const handleMovieLink = (movie) => {
        if (movie.Title) {
          const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            movie.Title + ' full movie'
          )}`;
    
          window.open(youtubeLink, '_blank');
        } else {
          console.error('Movie title is undefined');
        }
      };
    const getData = () => {
        fetch(`https://www.omdbapi.com/?s=cartoons&apikey=1a2127e5`)
            .then(res => res.json())
            .then(data => {
                setMovie(data.Search || []);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Also set loading to false in case of error
            });
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[#070F2B] text-white">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className="flex justify-center flex-wrap gap-2 sm:gap-6 items-center pt-4 bg-[#070F2B]">
                    {currentMovieDetail.map((m) => (
                        <div
                            key={m.imdbID}
                            className="w-40 h-56 sm:w-64 sm:h-96 text-white rounded-md cursor-pointer transform hover:scale-105 transition-transform overflow-hidden"
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
                                  onClick={() => handleMovieLink(m)}
                                >
                                    <FaPlay />
                                </button>
                                <button
                                    onClick={()=> addMovie(m)}
                                    className="bg-violet-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    title="Add to Watchlist"
                                >
                                    <FaBookmark />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewMovie;
