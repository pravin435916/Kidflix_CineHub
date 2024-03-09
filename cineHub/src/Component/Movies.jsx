import React from 'react'

function Movies({movie}) {
  return (
    <div className="flex justify-center flex-wrap gap-8 items-center ">
      {movie.map((movie) => (
        <div
          key={movie.imdbID}
          className="w-32 h-56 sm:w-72 sm:h-96 p-2 border border-purple-500 rounded-md cursor-pointer transform hover:scale-105 transition-transform overflow-hidden"
        >
          {/* Display movie information as needed */}
          <h1 className="font-bold text-xs sm:text-lg text-purple-800 mb-2">{movie.Title}</h1>
          <p className="text-gray-600 text-sm mb-2">{movie.Year}</p>
          <img
            className="w-full h-full sm:h-full pb-2 object-cover rounded-md"
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
          />
        </div>
      ))}
    </div>
  )
}

export default Movies