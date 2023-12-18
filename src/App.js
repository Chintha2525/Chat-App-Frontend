
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";


const socket = io.connect("https://chat-app-3tts.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinGroup = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
       <h1 className="home-head">CHAT APP</h1>
      {!showChat ? (
        <div className="home-head-body">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Group ID...(no. only)"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinGroup}>Join A Group</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;