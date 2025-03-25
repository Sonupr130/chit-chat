import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, Users, Bell, Search, Plus, X } from "lucide-react";
import ChatListItem from "./ChatListItem";

function Sidebar({ onClose }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "personal", label: "Personal" },
    { id: "groups", label: "Groups" },
  ];

  const chatList = [
    {
      id: 1,
      name: "Aarav Sharma",
      message: "Hey, are we still meeting tomorrow?",
      time: "9:15 AM",
      avatar: "https://i.pinimg.com/736x/84/3e/5b/843e5b0864071ade626c3c93c549909f.jpg",
      unread: false
    },
    {
      id: 2,
      name: "Priya Chettri",
      message: "Please review the documents I sent",
      time: "10:30 AM",
      avatar: "https://i.pinimg.com/736x/65/be/98/65be9880275db3afc6079f2075db5efd.jpg",
      unread: true
    },
    {
      id: 3,
      name: "Rahul Gupta",
      message: "Did you get my last message?",
      time: "11:45 AM",
      avatar: "https://i.pinimg.com/736x/72/e2/08/72e2081e72d6c2958036726ef03bf98f.jpg",
      unread: false
    },
    {
      id: 4,
      name: "Ananya Singh",
      message: "Let's catch up for coffee soon!",
      time: "12:20 PM",
      avatar: "https://i.pinimg.com/736x/53/fd/99/53fd99b1b7c6e552280b368e10d890f6.jpg",
      unread: true
    },
    {
      id: 5,
      name: "Vikram Joshi",
      message: "The project deadline is approaching",
      time: "1:50 PM",
      avatar: "https://i.pinimg.com/736x/ba/d9/b1/bad9b1547cc8ac473b25cb980b9c142a.jpg",
      unread: false
    },
    {
      id: 6,
      name: "Neha Reddy",
      message: "Can you call me when free?",
      time: "3:10 PM",
      avatar: "https://i.pinimg.com/736x/6b/11/12/6b1112e68a021e988525d30854bc19f4.jpg",
      unread: true
    },
    {
      id: 7,
      name: "Arjun Kumar",
      message: "Thanks for your help yesterday!",
      time: "4:25 PM",
      avatar: "https://i.pinimg.com/736x/d5/7d/69/d57d6979c38a240ab83ad8b0e5c2a25a.jpg",
      unread: false
    },
    {
      id: 8,
      name: "Isha Desai",
      message: "Where should we meet for lunch?",
      time: "5:40 PM",
      avatar: "https://i.pinimg.com/736x/99/ca/e3/99cae3a1249e92ea0985540f5b14b5d9.jpg",
      unread: false
    },
    {
      id: 9,
      name: "Rohan Malhotra",
      message: "I'll be there in 15 minutes",
      time: "6:55 PM",
      avatar: "https://i.pinimg.com/736x/83/08/b2/8308b269db7bf1f5366933c207b63c01.jpg",
      unread: true
    },
    {
      id: 10,
      name: "Meera Choudhary",
      message: "Did you check the email I sent?",
      time: "8:30 PM",
      avatar: "https://i.pinimg.com/736x/b5/02/c7/b502c702ed52e467e4e73f7fd57c3964.jpg",
      unread: false
    },
    {
      id: 11,
      name: "Aditya Iyer",
      message: "Happy Diwali in advance!",
      time: "9:45 PM",
      avatar: "https://i.pinimg.com/736x/0a/0d/96/0a0d9613c6435740a74a8b129a69824a.jpg",
      unread: false
    },
    {
      id: 12,
      name: "Divya Nair",
      message: "The files have been uploaded",
      time: "10:10 PM",
      avatar: "https://i.pinimg.com/736x/6f/da/f7/6fdaf793b3e7b4857d005f0370e4d369.jpg",
      unread: true
    }
  ];

  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-emerald-500 text-white">
            <AvatarImage className="object-cover" src="https://i.pinimg.com/736x/aa/32/bc/aa32bc0587d6205c33c224ddd6842b5d.jpg" alt="Profile" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">Prakriti Mishra</span>
            <span className="text-xs text-green-500">Available</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex p-2 space-x-1 border-b">
        {tabs.map(function(tab) {
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`flex-1 rounded-full text-sm ${activeTab === tab.id ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}`}
              onClick={function() { setActiveTab(tab.id); }}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* <div className="flex-1 overflow-y-auto hide-scrollbar">
        {chatList.map(function(chat) {
          return <ChatListItem key={chat.id} chat={chat} />;
        })}
      </div> */}

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {chatList.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => onChatSelect(chat)}
            className={`flex items-center p-3 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage className="object-cover" src={chat.avatar} alt={chat.name} />
              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {chat.name}
                </span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {chat.time}
                </span>
              </div>
              <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {chat.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="border-t p-2 grid grid-cols-5 gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Users className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full col-span-5 mt-1">
          <Plus className="h-5 w-5" />
        </Button>
      </div> */}
    </div>
  );
}

export default Sidebar;