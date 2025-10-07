import {create} from 'zustand';

export const useLoading = create(set => ({
  isLoading: false,
  isStop: false,
  setLoading: value => set({isLoading: value, isStop: false}),
  stopLoading: () => set({isLoading: false, isStop: true}),
}));
