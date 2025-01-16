// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ZodiacGrid from "./pages/ZodiacGrid";
import SignForm from "./pages/SignForm";
import DecadeForm from "./pages/DecadeForm";
import FinalPage from "./pages/FinalPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ZodiacGrid />} />
        <Route path="/sign/:signName/day" element={<SignForm />} />
        <Route path="/sign/:signName/decade" element={<DecadeForm />} />
        <Route path="/sign/:signName/final" element={<FinalPage />} />
      </Routes>
    </Router>
  );
}

export default App;