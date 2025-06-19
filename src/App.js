
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not installed.");
    }
  };

  const sendETH = async () => {
    if (!window.ethereum || !account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(ethAmount)
      });
      alert("✅ ETH sent successfully!");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-gray-900 shadow-lg p-8 space-y-6">
        <header className="flex items-center justify-between border-b pb-4">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Coin DEX
          </h1>
          <button onClick={toggleTheme} className="text-sm px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-800 hover:text-white">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        <section className="space-y-4">
          <button onClick={connectWallet} className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "🔗 Connect Wallet"}
          </button>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-300">🚀 Send ETH</h2>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Recipient Address"
            onChange={e => setRecipient(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Amount in ETH"
            onChange={e => setEthAmount(e.target.value)}
          />
          <button
            onClick={sendETH}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-lg font-semibold"
          >
            💸 Send ETH
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
