import React from 'react';
import { useRandomAnimal } from '../../Hooks/useRandomAnimal';

type StoreProps = {
  roomId: string | undefined;
  playersNum: number;
  isStarted: boolean;
  isHost: boolean;
  clientId: string;
  clientLists: string[] | undefined;
  sectionNum: number;
  canvasData: string | null;
  timeLeft: number;
  isDone: boolean;
  animal: string | undefined;
  clientName: string | undefined;
  setRoomId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlayersNum: React.Dispatch<React.SetStateAction<number>>;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
  setClientId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setClientsLists: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setSectionNum: React.Dispatch<React.SetStateAction<number>>;
  setCanvasData: React.Dispatch<React.SetStateAction<string | null>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimal: React.Dispatch<React.SetStateAction<string | undefined>>;
  setClientName: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const [sectionNum, setSectionNum] = React.useState<number>(1);
  const [canvasData, setCanvasData] = React.useState<string | null>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(100);
  const [isDone, setIsDone] = React.useState<boolean>(false);
  const [animal, setAnimal] = React.useState<string | undefined>(undefined);
  const [clientName, setClientName] = React.useState<string | undefined>();

  const providerValue = {
    roomId,
    playersNum,
    isStarted,
    isHost,
    clientId,
    clientLists,
    sectionNum,
    canvasData,
    timeLeft,
    isDone,
    animal,
    clientName,
    setRoomId,
    setPlayersNum,
    setIsStarted,
    setIsHost,
    setClientId,
    setClientsLists,
    setSectionNum,
    setCanvasData,
    setTimeLeft,
    setIsDone,
    setAnimal,
    setClientName,
  };

  return <Store.Provider value={providerValue}>{children}</Store.Provider>;
};
