import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import logo from "../assets/logo.png";
import chitchat from "../assets/chitchat.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-[100vw] z-10">
      <div className="container mx-auto px-10 py-4 flex justify-between items-center bg-[]">
        <div className="flex items-center">
          {/* <img
            src={logo}
            alt="Poseidon logo"
            className="h-10 w-10"
          /> */}
          <span className="ml-2 text-xl font-semibold">
            <img src={chitchat} width={100} alt="" />
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            HOME
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            PRODUCTS
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            ABOUT US
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            CONTACTS
          </a>
        </nav>
        <div className="hidden md:flex space-x-4">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
            Sign in
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
            Sign up
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              HOME
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              PRODUCTS
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              ABOUT US
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              CONTACTS
            </a>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
              Sign in
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">
              Sign up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;