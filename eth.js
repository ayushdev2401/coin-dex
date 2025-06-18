import { ethers } from 'ethers';

export async function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not detected');
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
}

export async function getSigner(provider) {
  return await provider.getSigner();
}

export async function sendETH(to, amount) {
  const provider = await getProvider();
  const signer = await getSigner(provider);
  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amount)
  });
  return tx;
}
