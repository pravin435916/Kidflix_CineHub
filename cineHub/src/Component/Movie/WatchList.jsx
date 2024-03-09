import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/CartSlice';
import { Link } from 'react-router-dom';
function WatchList() {
    const dispatch = useDispatch();
    const productCart = useSelector(state => state.cart.items);
    const removeFromCart = (id) => {
        dispatch(removeItem(id));
    };
    

    return (
        <div className='w-full min-h-screen bg-[#070F2B] overflow-hidden'>
            <div className="container mx-auto px-4 py-8">
                {
                     productCart < 1 && 
                     <div className='w-full h-screen flex justify-center items-center text-white flex-col'>
                          <span>No Items In the watchlist</span>
                          <span>Go the the <Link className="text-blue-400" to="/" >Homepage</Link></span>
                     </div>
                }
              <h1 className="text-3xl text-white mb-4">Watchlist</h1> 
                {productCart && productCart.map((movie) => (
                    <div key={movie.imdbID} className="flex items-center justify-between border-b flex-col sm:flex-row border-gray-700 text-white py-4">
                        <div className="flex items-center w-[90vw] sm:w-[40vw] h-72 sm:h-96 border rounded-md">
                            {movie.Poster && (
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className='w-full sm:w-1/2 flex justify-start items-start flex-col gap-2'>
                            <span className='text-xl text-white'>{movie.Title}</span>
                                <span className="text-xs">{ movie  ? movie.Type : ""}</span>
                                <span className="text-xs">{movie ? movie.Language : ""}</span>
                                <span className="text-xs">{movie.Runtime}</span>
                                <span className=" ">{movie.Released}</span>
                                
                            <button
                                onClick={() => removeFromCart(movie.imdbID)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WatchList;
