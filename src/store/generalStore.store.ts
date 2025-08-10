import type { AuthResponse } from '@/domain/graphql';
import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

interface SidebarStore {
  sidebarIsOpen: boolean;
  toggleSidebar: () => void;
  sidebarSearch: string;
  setSidebarSearch: (search: string) => void;

  isGeneralLoading: boolean;
  setIsGeneralLoading: (isLoading: boolean) => void;

  appUserInfo?: AuthResponse;
  setAppUserInfo: (userInfo: AuthResponse) => void;
}

type IGeneralStore = SidebarStore;

const storeApi: StateCreator<IGeneralStore, [['zustand/devtools', never], ['zustand/immer', never]]> = (set, get) => ({
  sidebarIsOpen: true,
  setAppUserInfo: userInfo => {
    set(
      state => {
        state.appUserInfo = userInfo;
      },
      undefined,
      'general:setAppUserInfo',
    );
  },
  toggleSidebar: () => {
    set(
      state => {
        state.sidebarIsOpen = !get().sidebarIsOpen;
        state.sidebarSearch = '';
      },
      undefined,
      'general:toggleSidebar',
    );
  },
  sidebarSearch: '',
  setSidebarSearch: (search: string) =>
    set(
      state => {
        state.sidebarSearch = search;
      },
      undefined,
      'general:setSidebarSearch',
    ),
  isGeneralLoading: false,
  setIsGeneralLoading: (isLoading: boolean) =>
    set(
      state => {
        state.isGeneralLoading = isLoading;
      },
      undefined,
      'general:setIsGeneralLoading',
    ),
});

export const useGeneral = create<IGeneralStore>()(
  persist(
    devtools(immer(storeApi), {
      name: `generalStore`,
      enabled: import.meta.env.MODE !== 'production',
    }),
    {
      name: 'general-storage', // nombre de la clave en localStorage
      partialize: state => ({ sidebarIsOpen: state.sidebarIsOpen }), // qué propiedades guardar
    },
  ),
);

// Custom hook para usar useGeneral con shallow
export function useGeneralShallow<T>(selector: (state: IGeneralStore) => T) {
  return useGeneral(useShallow(selector));
}
