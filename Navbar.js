import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const ethValue = ethers.formatEther(balance);

        setWalletAddress(address);
        setEthBalance(parseFloat(ethValue).toFixed(4));
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setEthBalance(null);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-300">Coin DEX</h1>
      <div className="flex items-center gap-4">
        <Link to="/" className={`hover:underline ${location.pathname === '/' ? 'font-bold' : ''}`}>Home</Link>
        <Link to="/buy" className={`hover:underline ${location.pathname === '/buy' ? 'font-bold' : ''}`}>Buy</Link>
        <Link to="/compare" className={`hover:underline ${location.pathname === '/compare' ? 'font-bold' : ''}`}>Compare</Link>
        <Link to="/learn" className={`hover:underline ${location.pathname === '/learn' ? 'font-bold' : ''}`}>Learn</Link>
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
          {darkMode ? 'Light' : 'Dark'}
        </button>
        {!walletAddress ? (
          <button onClick={connectWallet} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-500 font-semibold">{ethBalance} ETH</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button onClick={disconnectWallet} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
              Disconnect
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
