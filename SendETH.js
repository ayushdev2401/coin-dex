import React, { useState } from 'react';
import { sendETH } from '../utils/eth';

function SendETH() {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleSend = async () => {
    try {
      const tx = await sendETH(toAddress, amount);
      setTxHash(tx.hash);
    } catch (err) {
      alert('Transaction failed: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Send ETH</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Recipient address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
      {txHash && <p className="mt-4 text-green-600">Transaction sent: {txHash}</p>}
    </div>
  );
}

export default SendETH;
