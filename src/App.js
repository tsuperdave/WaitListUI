import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import HomeView from "./pages/Home/HomeView";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
          
            <Route path="/" element={<HomeView />} />

            <Route path="/:repo" element={<HomeView />} />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
