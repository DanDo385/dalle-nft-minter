// components/Navbar.jsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from './ui/Button'; // Import the Button component from the correct path

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
              <Link href="/"><span>Home</span></Link>
            </li>
            <li>
              <Link href="/images"><span>Images</span></Link>
            </li>
            <li>
              <Link href="/metadata"><span>Metadata</span></Link>
            </li>
            <li>
              <Link href="/mint"><span>Mint</span></Link>
            </li>
          </ul>
        </nav>
        <Button onClick={() => setIsOpen(!isOpen)} className="md:hidden">Menu</Button> {/* Use Button for mobile menu toggle */}
      </div>
      <Image src="/images/dalle.jpg" alt="DALL-E" width={50} height={50} className="rounded-full" />
    </div>
  );
};

export default Navbar;
