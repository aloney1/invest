import { create } from 'zustand';

type IStore = {
  refresh: number;
  updateRefresh: () => void;
};

export const useStore = create<IStore>(set => ({
  refresh: 0,
  updateRefresh: () => set(state => ({ refresh: state.refresh + 1 })),
}));
