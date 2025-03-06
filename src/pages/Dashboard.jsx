import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserFriends, FaComments } from 'react-icons/fa';
import supabase from '../helper/supabaseClient';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = useState(null);
  const chats = [
    { id: 1, name: 'John Doe', type: 'one-to-one' },
    { id: 2, name: 'Family Group', type: 'group' },
    { id: 3, name: 'Work Chat', type: 'group' },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message)
    } else {
      navigate("/login"); // Redirect to login page after logout
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar */}
      <div className="col-md-3 bg-light border-end p-3 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Chats</h4>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
        <ul className="list-group flex-grow-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${selectedChat === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              {chat.name}
              {chat.type === 'group' ? <FaUserFriends /> : <FaComments />}
            </li>
          ))}
        </ul>
        <div className="mt-3 text-center">
          <Link to='/new-chat' className="btn btn-primary w-100">Start New Chat</Link>
        </div>
      </div>
      
      {/* Chat Window */}
      <div className="col-md-9 d-flex flex-column p-3">
        {selectedChat ? (
          <div className="card flex-grow-1">
            <div className="card-header">Chat with {chats.find(chat => chat.id === selectedChat)?.name}</div>
            <div className="card-body chat-messages" style={{ height: '70vh', overflowY: 'auto' }}>
              {/* Messages will be displayed here */}
              <p className="text-muted text-center">No messages yet...</p>
            </div>
            <div className="card-footer d-flex">
              <input type="text" className="form-control" placeholder="Type a message..." />
              <button className="btn btn-primary ms-2">Send</button>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            <h5>Select a chat to start messaging</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
