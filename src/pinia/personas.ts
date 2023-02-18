import { defineStore } from 'pinia';

export const usePersonasStore = defineStore('personas', {
  state: () => ({
    highlightBestPersonaStatAtLevel: 0,
    highlightBestPersonaStatAtTheirLevel: false,
  }),
  actions: {
    setHighlightBestPersonasLevel(level: number) {
      this.highlightBestPersonaStatAtLevel = level;
    },
    toggleBestPersonaAtTheirLevel() {
      this.highlightBestPersonaStatAtTheirLevel = !this.highlightBestPersonaStatAtTheirLevel;
    },
  },
});