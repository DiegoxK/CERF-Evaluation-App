import { create } from "zustand";

interface RateLimitState {
  limit: number | null;
  remaining: number | null;
  setRateLimit: (limit: number, remaining: number) => void;
}

export const useRateLimitStore = create<RateLimitState>((set) => ({
  limit: null,
  remaining: null,
  setRateLimit: (limit, remaining) => set({ limit, remaining }),
}));
