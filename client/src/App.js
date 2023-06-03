import React, { useState } from "react";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Components/Profile";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <div className="mx-3">
        <Navbar user={user} setUser={setUser} />
        <main
          className="py-3"
          style={{
            minHeight: "80vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Signin setUser={setUser} />} />

            <Route path="/signup" element={<Signup setUser={setUser} />} />

            <Route path="/login" element={<Signin setUser={setUser} />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
