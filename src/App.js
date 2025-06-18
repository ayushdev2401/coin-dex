
import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [ethToSend, setEthToSend] = useState("");
  const [recipient, setRecipient] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not found");
    }
  }

  async function sendETH() {
    if (!window.ethereum || !account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    try {
      await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(ethToSend)
      });
      alert("Transaction sent!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Coin DEX</h1>
      <button onClick={connectWallet} style={{ marginBottom: '1rem' }}>
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect MetaMask"}
      </button>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Send ETH</h3>
        <input placeholder="Recipient Address" onChange={e => setRecipient(e.target.value)} /><br/>
        <input placeholder="Amount in ETH" onChange={e => setEthToSend(e.target.value)} /><br/>
        <button onClick={sendETH}>Send</button>
      </div>
    </div>
  );
}

export default App;
