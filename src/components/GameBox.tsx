'use client';

import Link from 'next/link';

const routes = [
  '/giochi/gioco-1',
  '/giochi/gioco-2',
  '/giochi/gioco-3',
  '/giochi/gioco-4',
];

const GameBox = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {routes.map((route, i) => (
        <Link href={route} key={i}>
          <div className="h-40 bg-black rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
            <p
              className="text-pink-500 text-xl sm:text-2xl tracking-wider"
              style={{ fontFamily: "'Press Start 2P', system-ui" }}
            >
              Gioco {i + 1}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameBox;
