import React from 'react';

type StoreProps = {
  roomId: string | undefined;
  playersNum: number;
  isStarted: boolean;
  isHost: boolean;
  clientId: string;
  clientLists: string[] | undefined;
  sectionNum: number;
  setRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlayersNum: React.Dispatch<React.SetStateAction<number>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
  setClientId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setClientsLists: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setSectionNum: React.Dispatch<React.SetStateAction<number>>;
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
  const [clientId, setClientId] = React.useState<string | undefined>();
  const [clientLists, setClientsLists] = React.useState<string[] | undefined>();
  const [sectionNum, setSectionNum] = React.useState<number>(0);

  const providerValue = {
    roomId,
    playersNum,
    isStarted,
    isHost,
    clientId,
    clientLists,
    sectionNum,
    setRoomId,
    setPlayersNum,
    setIsStarted,
    setIsHost,
    setClientId,
    setClientsLists,
    setSectionNum,
  };

  return <Store.Provider value={providerValue}>{children}</Store.Provider>;
};
