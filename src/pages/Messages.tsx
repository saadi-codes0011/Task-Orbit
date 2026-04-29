import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, ChevronLeft } from "lucide-react";

const Messages = () => {
  // Agar aap chahte hain ke mobile par pehle list dikhe, toh isay null rakhein: useState(null)
  const [activeChat, setActiveChat] = useState<string | null>("Ali Khan");

  return (
    <div className="flex h-[calc(100vh-2rem)] p-4 md:p-8 gap-6 overflow-hidden">
      
      {/* 1. Chat List Sidebar */}
      {/* Logic: Mobile pe tab dikhega jab activeChat null ho, Desktop pe hamesha */}
      <div className={`w-full md:w-1/3 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col gap-6 ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none"
          />
        </div>
        
        <div className="space-y-4 overflow-y-auto custom-scrollbar">
          {["Ali Khan", "Sara Smith", "Team Group"].map((chat) => (
            <div 
              key={chat}
              onClick={() => setActiveChat(chat)}
              className={`p-4 rounded-2xl cursor-pointer transition-colors ${activeChat === chat ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              <p className="font-semibold">{chat}</p>
              <p className="text-xs text-gray-400 truncate">Last message snippet here...</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Chat Window */}
      {/* Logic: Mobile pe tab dikhega jab activeChat set ho, Desktop pe hamesha */}
      <div className={`flex-1 bg-slate-900/50 border border-slate-800 rounded-3xl flex flex-col ${activeChat ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Mobile pe wapis jane ke liye back button */}
            <button className="md:hidden text-white" onClick={() => setActiveChat(null)}>
              <ChevronLeft size={24} />
            </button>
            <h3 className="text-lg font-bold">{activeChat || "Select a chat"}</h3>
          </div>
          <MoreVertical className="text-gray-400 cursor-pointer" />
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="max-w-[70%] bg-slate-800 p-4 rounded-2xl rounded-bl-none">
            Hello, did you finish the task?
          </div>
          <div className="max-w-[70%] bg-blue-600 p-4 rounded-2xl rounded-br-none ml-auto">
            Yes, almost done!
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-800 flex gap-4">
          <button className="text-gray-400 hover:text-white"><Paperclip size={20} /></button>
          <input
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 outline-none"
            placeholder="Type a message..."
          />
          <button className="bg-blue-600 p-2 rounded-xl hover:bg-blue-500">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;