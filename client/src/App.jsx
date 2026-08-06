import React from "react";
import {Route, Routes} from "react-router-dom";
import "./styles/index.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
 import Home from "./pages/Home";
 import Journal from "./pages/Journal";
import Playlist from "./pages/Playlist";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/journal" element={<Journal />} />

<Route path="/playlist" element={<Playlist />} />

<Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;