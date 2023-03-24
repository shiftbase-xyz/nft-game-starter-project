// CONTRACT_ADDRESSに、コントラクトアドレスを保存します。
const CONTRACT_ADDRESS = '0xCC007a97dd4d3eAb7eD8c49F3c9802a66D2B3507';

// NFT キャラクター の属性をフォーマットしてオブジェクトとして返します。
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  };
};

// 変数を constants.js 以外の場所でも使えるようにします。
export { CONTRACT_ADDRESS, transformCharacterData };
