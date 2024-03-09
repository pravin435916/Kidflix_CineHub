import React from "react";
import masha from '../assets/masha.png'
function ComingSoon() {
  return (
    <div className="bg-[#070F2B] text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold mb-6">
        🌟 Coming Soon 🌟
      </h1>
      <p className="text-lg mb-8 p-2">
        We're working on something exciting for your little ones! Stay tuned for
        the magic.
      </p>
      <img
        className="w-3/2 sm:w-1/2 p-4"
        src={masha}
        alt="Coming Soon Illustration"
      />
    </div>
  );
}

export default ComingSoon;
