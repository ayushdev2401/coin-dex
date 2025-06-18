import React, { useState, useEffect } from 'react';
import { getProvider, getSigner } from '../utils/eth';

function NFTViewer() {
  const [address, setAddress] = useState('');
  const [nfts, setNFTs] = useState([]);

  const fetchNFTs = async () => {
    try {
      const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&limit=10`);
      const data = await res.json();
      setNFTs(data.assets || []);
    } catch (err) {
      alert('Error fetching NFTs');
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [address]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">NFT Viewer</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nfts.map((nft) => (
          <div key={nft.id} className="border rounded p-2">
            <img src={nft.image_url} alt={nft.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="font-bold">{nft.name}</h3>
            <p className="text-sm">{nft.description?.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTViewer;
