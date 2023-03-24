const hre = require('hardhat');

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

  // Hardhat がローカルの Ethereum ネットワークを、コントラクトのためだけに作成します。
  const gameContract = await gameContractFactory.deploy(
    // キャラクターの名前
    ['ZORO', 'NAMI', 'USOPP'],
    // キャラクターの画像を IPFS の CID に変更
    [
      'QmXxR67ryeUw4xppPLbF2vJmfj1TCGgzANfiEZPzByM5CT',
      'QmPHX1R4QgvGQrZym5dpWzzopavyNX2WZaVGYzVQQ2QcQL',
      'QmUGjB7oQLBZdCDNJp9V9ZdjsBECjwcneRhE7bHcs9HwxG',
    ],
    [100, 200, 300],
    [100, 50, 25],
    'CROCODILE', // Bossの名前
    'https://i.imgur.com/BehawOh.png', // Bossの画像
    10000, // Bossのhp
    50, // Bossの攻撃力
  );
  // ここでは、nftGame コントラクトが、
  // ローカルのブロックチェーンにデプロイされるまで待つ処理を行っています。
  const nftGame = await gameContract.deployed();

  console.log('Contract deployed to:', nftGame.address);
};
const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
};
runMain();
