import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItem } from '../../redux/CartSlice';
const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
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
        setLoading(true);
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=1a2127e5`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };
    return (
        <>
            {loading ? (
                <div className="w-full min-h-screen flex justify-center items-center bg-[#070F2B] text-white">
                    <span class="loader"></span>
                </div>
            ) : (
                <div className="w-full min-h-screen flex justify-center items-center flex-col bg-[#070F2B] text-white relative overflow-hidden">
                    <div className="movie_poster absolute movie__intro w-full h-full sm:w-[80vw] sm:h-[30rem] top-0">
                        <img className=" w-full h-full object-cover brightness-50" src={`${currentMovieDetail ? currentMovieDetail.Poster : ""}`} />
                    </div>
                    <div className="">
                        <div className="movie__posterBox absolute sm:top-48 left-12 sm:left-48 border rounded-lg shadow-2xl">
                            <img className="movie__poster" src={`${currentMovieDetail ? currentMovieDetail.Poster : ""}`} />
                        </div>
                        <div className="absolute top-4 left-4 sm:top-48 sm:left-[32rem]">
                            <div className="flex flex-col gap-2 font-bold font-sans text-xl text-white">
                                <span className="text-3xl ">{currentMovieDetail.Title}</span>
                                <span className="text-xs">{currentMovieDetail.Type}</span>
                                <span className="text-xs">{currentMovieDetail.Language}</span>
                                <span className="text-xs">{currentMovieDetail.Runtime}</span>
                                <span className="movie__name ">{currentMovieDetail.Released}</span>
                                <span className="flex gap-2">
                                    {currentMovieDetail.Genre && currentMovieDetail.Genre.split(',').map((genre, index) => (
                                        <span
                                            className="text-xl px-2 border-xs rounded-full bg-red-600"
                                            key={index}>
                                            {genre.trim()}
                                            {index !== currentMovieDetail.Genre.split(',').length - 1 && ' '}
                                        </span>
                                    ))}
                                </span>
                                <span className="flex gap-2 items-center">
                                    <span>Actors : </span>
                                    {currentMovieDetail.Actors && currentMovieDetail.Actors.split(',').map((Actors, index) => (
                                        <span
                                            className="border p-1 text-xs border-red rounded-full bg-red-600"
                                            key={index}>
                                            {Actors.trim()}
                                            {index !== currentMovieDetail.Actors.split(',').length - 1 && ' '}
                                        </span>
                                    ))}
                                </span>
                                <span className="text-xs w-96">{currentMovieDetail.Plot ? currentMovieDetail.Plot : ""}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    title="Play"
                                    onClick={() => handleMovieLink(currentMovieDetail)}><FaPlay /></button>
                                <button
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    title="Add to Watchlist"
                                    onClick={() => addMovie(currentMovieDetail)}><FaBookmark /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Movie;
