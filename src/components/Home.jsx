import React from "react";
import logo from "../assets/logo.png";
import {
  CircleDashed,
  Droplet,
  House,
  LogOut,
  MessageCircle,
  Plus,
  Search,
} from "lucide-react";
import Users from "./Users";

const Home = () => {
  return (
    <div className="h-screen w-screen flex bg-[#f9f7fd]">
      <div className="flex">
        <div className="left-nav flex flex-col items-center justify-between pb-10 bg py-10 w-[8vw]">
          <div className="logo w-20 h-20">
            <img src={logo} alt="logo" />
          </div>
          <div class="bg-[#ffffff]  shadow-lg  flex flex-col items-center justify-center gap-7 text-black w-[5vw] rounded-xl py-6 ">
            <a href="#" class="text-gray-800">
              <House />
            </a>
            <a href="#" class="relative text-gray-800">
              <MessageCircle />
              <span class="absolute top-0 right-0 block h-2 w-2 bg-green-500 rounded-full"></span>
            </a>
            <a href="#" class="text-gray-800">
              <CircleDashed />
            </a>
            <a href="#" class="text-gray-800">
              <Droplet />
            </a>
            <a href="#" class="text-gray-800">
              <Search />
            </a>
            <a href="#" class="text-gray-800">
              <Plus />
            </a>
          </div>
          <div className="logout cursor-pointer text-red-600">
            <LogOut />
          </div>
        </div>
        <div className="container flex gap-5">
        <div className="users bg-[#fff] w-[25vw] my-10 rounded-lg">
          <div className="profile flex border-gray-300 border-b p-4">
            <div className="profile-img w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/b8/f4/4d/b8f44d323752475ead78d666689b54e4.jpg"
                alt=""
              />
            </div>
            <div className="ml-5">
              <h1>Priyanka Das</h1>
              <p className="text-green-500 text-sm">Available</p>
            </div>
            {/* <Users /> */}
          </div>
        </div>
        <div className="messages bg-yellow-200 w-[67vw] my-10 rounded-lg">MESSAGES</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
