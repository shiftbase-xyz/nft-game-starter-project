const hre = require('hardhat');
const { expect } = require('chai');

describe('MyEpicGame', () => {
  it('attack was successful', async () => {
    const gameContractFactory = await hre.ethers.getContractFactory(
      'MyEpicGame',
    );
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
    await gameContract.deployed();

    // 3体のNFTキャラクターの中から、3番目のキャラクターを Mint しています。
    let txn = await gameContract.mintCharacterNFT(2);

    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // mintしたNFTにおける、攻撃前と後のhpを取得する
    let hpBefore = 0;
    let hpAfter = 0;
    // NFTの情報を得る
    let NFTInfo = await gameContract.checkIfUserHasNFT();
    hpBefore = NFTInfo.hp.toNumber();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    NFTInfo = await gameContract.checkIfUserHasNFT();
    hpAfter = NFTInfo.hp.toNumber();

    expect(hpBefore - hpAfter).to.equal(50);
  });
});
