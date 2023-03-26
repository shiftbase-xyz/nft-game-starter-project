## 💬 ETH-NFT-Game(prototype)

本レポジトリは ETH-NFT-Game の完成版を示したものになります。

以下の手順を実行することで ETH-NFT-Game の挙動を確認できます。

### レポジトリのクローン

[こちら](https://github.com/unchain-tech/ETH-NFT-Game.git)から ETH-NFT-Game をクローンします。

### コントラクトとフロントの準備

1. Alchemy と MetaMask の設定

[こちら](https://app.unchain.tech/learn/ETH-NFT-Game/ja/1/6/)のページを参考にして Alchemy と MetaMask の設定を行います。

2. キーの指定とテスト

packages/contract 下に.env ファイルを作成し、下のように Alchemy と MetaMask の key を指定。この際、Alchemy に関しては HTTP KEY をコピー&ペーストしてください。

```
PRIVATE_KEY = MetaMaskのPrivatekey
STAGING_ALCHEMY_KEY = AlchemyのHTTP-KEY
```

次に下のコマンドを実行することでコントラクトのテスト＋コンパイルができます。

```
yarn contract test
```

下のような結果が出ていれば成功です！

```
 MyEpicGame
Done initializing boss CROCODILE w/ HP 10000, img https://i.imgur.com/BehawOh.png
Done initializing ZORO w/ HP 100, img QmXxR67ryeUw4xppPLbF2vJmfj1TCGgzANfiEZPzByM5CT
Done initializing NAMI w/ HP 200, img QmPHX1R4QgvGQrZym5dpWzzopavyNX2WZaVGYzVQQ2QcQL
Done initializing USOPP w/ HP 300, img QmUGjB7oQLBZdCDNJp9V9ZdjsBECjwcneRhE7bHcs9HwxG
Minted NFT w/ tokenId 1 and characterIndex 2

Player w/ character USOPP about to attack. Has 300 HP and 25 AD
Boss CROCODILE has 10000 HP and 50 AD
Player attacked boss. New boss hp: 9975
Boss attacked player. New player hp: 250

    ✔ attack was successful (1415ms)


  1 passing (1s)

✨  Done in 3.29s.
```

3. コントラクトのデプロイとフロントへの反映

`packages/contract`ディレクトリに移動し、以下のコマンドを実行しましょう。

```
yarn contract deploy
```

下記のような結果がでていれば成功です。

```
Deploying contracts with account:  0xa9eD1748Ffcda5442dCaEA242603E7e3FF09dD7F
Account balance:  25000000000000000
WavePortal address:  0xFD1035BFf7F4825c99c8cBC6fDAACDdca21DC3Ec
```

このうち`Contract deployed to:`に続く文字列を
`packages/client/src/constants.js`の中の`CONTRACT_ADDRESS`に代入します。

次に deploy によって作成された`packages/contract/artifacts/contracts/MyEpicGame.sol/MyEpicGame.json`に格納されているコントラクトの情報を全てコピーします。

最後に`packages/client/src/utils/MyEpicGame.json`に先ほどコピーした内容を貼り付けます。

これでコントラクトとフロントエンドの準備は完了です！

### フロントエンドを起動

下のコマンドを実行させることでフロントエンドの動きを確認してみましょう。

ウォレットの接続やボスキャラクターへの攻撃ができるか確認しましょう！

```
yarn client start
```
