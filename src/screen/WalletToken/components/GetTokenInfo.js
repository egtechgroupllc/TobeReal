import {Contract, formatUnits, JsonRpcProvider} from 'ethers';
const tokenABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
];
export const getCoinInfo = async ({walletAddress, chain, name}) => {
  try {
    const provider = new JsonRpcProvider(chain.rpcUrl);
    const image = `https://raw.githubusercontent.com/KuDenn172/assets/refs/heads/main/blockchains/${chain?.chainId}/logo.png`;
    const balance = await provider.getBalance(walletAddress);
    return {
      name: name || chain.name,
      symbol: chain.currency,
      image: image,
      balance: formatUnits(balance, 18),
    };
  } catch (error) {
    console.error('Lỗi lấy số dư:', error);
    return '0';
  }
};

export const getTokenInfo = async ({walletAddress, chain, contract}) => {
  try {
    const provider = new JsonRpcProvider(chain.rpcUrl);
    const tokenContract = new Contract(contract, tokenABI, provider);
    const image = `https://raw.githubusercontent.com/KuDenn172/assets/refs/heads/main/blockchains/${chain?.chainId}/${contract}/logo.png`;
    // Lấy thông tin token
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const balance = await tokenContract.balanceOf(walletAddress);
    const decimals = await tokenContract.decimals();

    return {
      image: image,
      name,
      symbol,
      balance: formatUnits(balance, decimals),
    };
  } catch (error) {
    console.error('Lỗi lấy thông tin token:', error);
    return null;
  }
};
