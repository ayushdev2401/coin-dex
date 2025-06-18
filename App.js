import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SendETH from './pages/SendETH';
import NFTViewer from './pages/NFTViewer';

function Home() {
  return <div className="p-4">Welcome to Coin DEX! Choose an option from the menu.</div>;
}

function Buy() {
  return <div className="p-4">Buy Ethereum options coming soon.</div>;
}

function Compare() {
  return <div className="p-4">Compare exchanges and rates here.</div>;
}

function Learn() {
  return <div className="p-4">Educational resources about Ethereum.</div>;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/send" element={<SendETH />} />
        <Route path="/nfts" element={<NFTViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
