import { useState } from 'react';

const animals = [
  'dog',
  'cat',
  'bird',
  'fish',
  'hamster',
  'lion',
  'elephant',
  'tiger',
  'panda',
  'monkey',
  'giraffe',
  'snake',
  'crocodile',
  'hippopotamus',
  'penguin',
  'octopus',
  'koala',
  'kangaroo',
  'whale',
  'dolphin',
  'shark',
  'seagull',
  'rhinoceros',
  'zebra',
  'cheetah',
  'bear',
  'fox',
  'wolf',
  'rabbit',
  'deer',
  'owl',
  'butterfly',
  'bee',
  'snail',
  'ant',
  'spider',
  'scorpion',
  'crab',
  'lobster',
  'squid',
  'jellyfish',
  'starfish',
  'clam',
  'oyster',
  'salmon',
  'trout',
  'swordfish',
  'tuna',
  'crayfish',
  'lobster',
  'shrimp',
  'prawn',
  'cricket',
  'grasshopper',
  'caterpillar',
  'ladybug',
  'mosquito',
  'fly',
  'moth',
  'cockroach',
  'centipede',
  'millipede',
  'worm',
  'snakes',
  'lizard',
  'iguana',
  'gecko',
  'turtle',
  'crocodile',
  'alligator',
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
