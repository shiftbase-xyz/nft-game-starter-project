const hre = require('hardhat');
const { expect } = require('chai');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe('MyEpicGame', () => {
  async function deployTextFixture() {
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
      [100, 50, 300],
      [100, 50, 25],
      'CROCODILE', // Bossの名前
      'https://i.imgur.com/BehawOh.png', // Bossの画像
      100, // Bossのhp
      50, // Bossの攻撃力
    );
    await gameContract.deployed();

    return {
      gameContract,
    };
  }

  it('attack was successful', async () => {
    const { gameContract } = await loadFixture(deployTextFixture);

    // 3体のNFTキャラクターの中から、3番目のキャラクターを Mint しています。
    let txn = await gameContract.mintCharacterNFT(2);

    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // mintしたNFTにおける、攻撃前と後のhpを取得する
    let hpBefore = 0;
    let hpAfter = 0;
    // NFTの情報を得る
    // かつきちんとMintがされているかを確認
    let NFTInfo = await gameContract.checkIfUserHasNFT();
    hpBefore = NFTInfo.hp.toNumber();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    NFTInfo = await gameContract.checkIfUserHasNFT();
    hpAfter = NFTInfo.hp.toNumber();

    expect(hpBefore - hpAfter).to.equal(50);
  });

  // ボスのHPがなくなった時に、ボスへの攻撃ができないことを確認
  it('check boss attack does not happen if boss hp is smaller than 0', async () => {
    const { gameContract } = await loadFixture(deployTextFixture);

    // 3体のNFTキャラクターの中から、1番目のキャラクターを Mint しています。
    let txn = await gameContract.mintCharacterNFT(0);

    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    // 2回目の攻撃: attackBoss 関数を追加
    // ボスのhpがなくなった時に、エラーが発生することを確認
    txn = expect(gameContract.attackBoss()).to.be.revertedWith(
      'Error: boss must have HP to attack characters.',
    );
  });

  // キャラクターのHPがなくなった時に、ボスへの攻撃ができないことを確認
  it('check boss attack does not happen if character hp is smaller than 0', async () => {
    const { gameContract } = await loadFixture(deployTextFixture);

    // 3体のNFTキャラクターの中から、2番目のキャラクターを Mint しています。
    let txn = await gameContract.mintCharacterNFT(1);

    // Minting が仮想マイナーにより、承認されるのを待ちます。
    await txn.wait();

    // 1回目の攻撃: attackBoss 関数を追加
    txn = await gameContract.attackBoss();
    await txn.wait();

    // 2回目の攻撃: attackBoss 関数を追加
    // キャラクターのhpがなくなった時に、エラーが発生することを確認
    txn = expect(gameContract.attackBoss()).to.be.revertedWith(
      'Error: character must have HP to attack boss.',
    );
  });
});
