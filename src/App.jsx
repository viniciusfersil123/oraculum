import React from 'react';
import ZodiacGrid from './components/ZodiacGrid';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="text-center pt-4">
        <h1>Discover the Truth About Your Zodiac Sign</h1>
        <h2>Click your sign below to find out more:</h2>
      </header>

      {/* Zodiac Signs Grid */}
      <ZodiacGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;