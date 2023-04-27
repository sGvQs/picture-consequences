import React from 'react';

type StoreProps = {
  roomId: string | undefined;
  playersNum: number;
  isStarted: boolean;
  isHost: boolean;
  setRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlayersNum: React.Dispatch<React.SetStateAction<number>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
};

type Children = {
  children?: React.ReactNode;
};

const Store = React.createContext<StoreProps | null>(null);

export const useStoreState = (): StoreProps => {
  const context = React.useContext(Store);

  if (!context) {
    throw new Error('useSugorokuState must be used within StoreStateProvider');
  }

  return context;
};

export const StoreStateProvider: React.FC<Children> = ({ children }) => {
  const [roomId, setRoomId] = React.useState<string | undefined>();
  const [playersNum, setPlayersNum] = React.useState<number>(0);
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [isHost, setIsHost] = React.useState<boolean>(false);

  const providerValue = {
    roomId,
    playersNum,
    isStarted,
    isHost,
    setRoomId,
    setPlayersNum,
    setIsStarted,
    setIsHost,
  };

  return <Store.Provider value={providerValue}>{children}</Store.Provider>;
};
