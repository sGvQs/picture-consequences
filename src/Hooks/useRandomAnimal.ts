import { useState } from 'react';

const animals = [
  '犬',
  '猫',
  '鳥',
  '魚',
  'ハムスター',
  'ライオン',
  '象',
  'トラ',
  'パンダ',
  '猿',
  'キリン',
  '蛇',
  'ワニ',
  'カバ',
  'ペンギン',
  'タコ',
  'コアラ',
  'カンガルー',
  'クジラ',
  'イルカ',
  'サメ',
  'カモメ',
  'サイ',
  'シマウマ',
  'チーター',
  'クマ',
  'キツネ',
  'オオカミ',
  'ウサギ',
  'シカ',
  'フクロウ',
  '蝶々',
  '蜂',
  'カタツムリ',
  'アリ',
  'クモ',
  'サソリ',
  'カニ',
  'ロブスター',
  'イカ',
  'クラゲ',
  'ヒトデ',
  '貝',
  '牡蠣',
  'サーモン',
  'マス',
  'カジキ',
  'ツナ',
  'ザリガニ',
  'エビ',
  'プラウン',
  'コオロギ',
  'バッタ',
  'キャタピラー',
  'テントウムシ',
  '蚊',
  'ハエ',
  '蛾',
  'ゴキブリ',
  'ムカデ',
  'ミミズ',
  'ヘビ',
  'トカゲ',
  'イグアナ',
  '亀',
  'クロコダイル',
  'ワニ',
];

export const useRandomAnimal = (): string => {
  const [animal, setAnimal] = useState<string>('');

  const getRandomAnimal = (): void => {
    const randomIndex = Math.floor(Math.random() * animals.length);
    setAnimal(animals[randomIndex]);
  };

  if (!animal) {
    getRandomAnimal();
  }

  return animal;
};
