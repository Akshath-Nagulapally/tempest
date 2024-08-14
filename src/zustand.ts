import { create } from 'zustand'

interface UserState {
  userId: string | null;
  setUserId: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id: string) => set({ userId: id }),
}));
