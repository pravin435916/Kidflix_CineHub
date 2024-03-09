import React from "react";

function Footer() {
  return (
    <footer className="bg-[#070F2B] text-white p-4 text-center">
      <p className="text-lg font-semibold">KidFlix - Your Kids' Movie Paradise</p>
      <p className="text-sm mt-2">
        © {new Date().getFullYear()} All rights reserved. | Pravin Nandankar
      </p>
    </footer>
  );
}

export default Footer;
