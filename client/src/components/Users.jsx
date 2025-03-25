import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Users = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Bruno Fernado',
      type: 'personal',
      messages: [
        { text: 'How are you doing?', time: '9:12AM', isMe: false },
        { text: 'How are you doing?', time: '9:12AM', isMe: false },
        { text: 'How are you doing?', time: '9:12AM', isMe: false }
      ]
    },
    // Add more chats here
  ]);

  const filteredChats = chats.filter(chat => 
    activeTab === 'all' || chat.type === activeTab
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
            <TabsTrigger value="personal" onClick={() => setActiveTab('personal')}>Personal</TabsTrigger>
            <TabsTrigger value="groups" onClick={() => setActiveTab('groups')}>Groups</TabsTrigger>
          </TabsList>

          {/* <div className="p-4 overflow-y-auto h-[calc(100vh-48px)]">
            {filteredChats.map(chat => (
              <TabsContent key={chat.id} value={activeTab}>
                <div className="p-3 border-b cursor-pointer hover:bg-gray-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.messages[0].time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.messages[0].text}</p>
                </div>
              </TabsContent>
            ))}
          </div> */}
        </Tabs>
      </div>

      <div className="w-3/4 p-4">
        <div className="h-full flex flex-col">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold">Bruno Fernado</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {chats[0].messages.map((message, index) => (
              <div key={index} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${message.isMe ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center border rounded-lg p-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 outline-none px-2"
              />
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;