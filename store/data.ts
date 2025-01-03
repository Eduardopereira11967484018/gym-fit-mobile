//store/data.ts
import { create } from 'zustand'

export type User = {
  frequency: any;
  name: string;
  weight: string;
  age: string;
  height: string;
  level: string;
  objective: string;
  gender: string;
}

type DataState = {
  user: User;
  setPageOne: (data: Omit<User, "gender" | "objective" | "level">) => void;
  setPageTwo: (data: Pick<User, "gender" | "objective" | "level">) => void;
}

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    age: "",
    level: "",
    objective: "",
    gender: "",
    height: "",
    weight: "",
    frequency: 0,

  },
  setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
  setPageTwo: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
}))