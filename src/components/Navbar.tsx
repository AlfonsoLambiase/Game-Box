"use client";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-black text-white flex items-center justify-center border-b-4 border-pink-500 shadow-md">
      <h1
        className="text-pink-500 text-xl sm:text-2xl tracking-wider"
        style={{
          fontFamily: "'Press Start 2P', system-ui",
        }}>
        GAME-BOX
      </h1>
    </div>
  );
};

export default Navbar;
