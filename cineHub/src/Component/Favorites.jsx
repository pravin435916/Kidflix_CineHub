// Favorites.js

import React from "react";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-400 min-h-screen p-8 font-sans">
      <h1 className="text-center font-extrabold text-4xl text-purple-800 mb-8">
        🌟 Your Favorites 🌟
      </h1>
      <div className="flex justify-center flex-wrap gap-8 items-center">
        {favorites.map((m) => (
          <div
            key={m.imdbID}
            className="w-72 h-96 p-2 border border-purple-500 rounded-md cursor-pointer transform hover:scale-105 transition-transform overflow-hidden"
          >
            <h1 className="font-bold text-lg text-purple-800 mb-2">{m.Title}</h1>
            <p className="text-gray-600 text-sm mb-2">{m.Year}</p>
            <p className="text-gray-600 text-sm mb-2">{m.Released}</p>
            <p className="text-gray-600 text-sm mb-2">{m.Country}</p>
            <p className="text-gray-600 text-sm mb-2">{m.Awards}</p>
            <img
              className="w-full h-64 p-2 object-cover rounded-md"
              src={m.Poster}
              alt={`${m.Title} Poster`}
            />
            <button
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => removeFromFavorites(m)}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
