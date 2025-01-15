import React from 'react';
import ZodiacGrid from './components/ZodiacGrid';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="text-center pt-4">
        <h1>Descubra a Verdade Sobre o Seu Signo do Zodíaco</h1>
        <h2>Clique no seu signo abaixo para saber mais:</h2>
      </header>

      {/* Zodiac Signs Grid */}
      <ZodiacGrid />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;