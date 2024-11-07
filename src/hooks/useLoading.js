import {create} from 'zustand';

export const useLoading = create(set => ({
  isLoading: false,
  isStop: false,
  setLoading: value => set(state => ({isLoading: value, isStop: !value})),
  stopLoading: () => set({isLoading: false, isStop: true}),
}));
