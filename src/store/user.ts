import { create } from 'zustand';

interface Type {
  name: string;
  ico: string;
  champion: number;
}

type IStore = {
  spining: number;
  tips: string;
  addSpining: () => void;
  delSpining: () => void;
  SaveTips: (tip: string) => void;
  users: Type | null;
  SaveUser: (user: Type | null) => void;
  currentSymbol: string;
  SaveSymbol: (symbol: string) => void;
  simple: boolean;
  SaveSimple: (type: boolean) => void;
};

export const useCountStore = create<IStore>(set => {
  const storedType = localStorage.getItem('simpleType') as string | null;
  let type = false;
  if (storedType === 'false') {
    type = false;
  } else if (storedType === 'true') {
    type = true;
  }
  const initialType: boolean = type || false;

  return {
    spining: 0,
    tips: 'Loading',
    users: null,
    addSpining: () => set(state => ({ spining: state.spining + 1 })),
    delSpining: () => set(state => ({ spining: state.spining - 1 })),
    SaveTips: (tip: string) => set(() => ({ tips: tip })),
    SaveUser: (user: Type | null) => set(() => ({ users: user })),
    currentSymbol: '',
    SaveSymbol: (symbol: string) => set(() => ({ currentSymbol: symbol })),
    simple: initialType,
    SaveSimple: (type: boolean) => set(() => ({ simple: type })),
  };
});
