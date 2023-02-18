import { defineStore } from 'pinia';

export const usePersonasStore = defineStore('personas', {
  state: () => ({
    highlightBestPersonasLevel: 1,
  }),
  actions: {
    setHighlightBestPersonasLevel(level: number) {
      this.highlightBestPersonasLevel = level;
    },
  },
});