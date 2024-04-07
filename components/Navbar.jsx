//components/Navbar.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex items-center justify-between p-4 bg-green-400 text-black ${isOpen ? 'flex-col' : 'flex-row'}`}>
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-bold">DALL-E NFT Minter</h1>
        
        <div className="flex-1"></div> {/* This invisible div pushes everything else to the sides */}
        <nav className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            <li>
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/image">
                <span>Image</span>
              </Link>
            </li>
            <li>
              <Link href="/collection">
                <span>Collection</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="text-black hover:text-gray-700 md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <Image src="/images/dalle.jpg" alt="DALL-E" width={50} height={50} className="rounded-full" />
    </div>
  );
};

export default Navbar;
