import { create } from 'zustand';

interface User {
    id: number;
    full_name: string;
    email: string;
    role: 'visitor' | 'farmer' | 'producer';
    created_at: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setAuth: (user, token) => set({ user, token }),
    logout: () => set({ user: null, token: null }),
}));
