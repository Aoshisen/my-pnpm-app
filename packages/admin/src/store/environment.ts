
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export enum Environment {
	MOBILE,
	PC,
}
type EnvironmentStore = {
	environment: Environment,
	toggle: () => void;
	pc: () => void;
	mobile: () => void;
	reset: () => void;
}

const useEnvironmentStore = create<EnvironmentStore>()(
	persist(
		(set, get) => ({
			environment: Environment.PC,
			toggle: () => set({ environment: get().environment === Environment.MOBILE ? Environment.PC : Environment.MOBILE }),
			pc: () => set({ environment: Environment.PC }),
			mobile: () => set({ environment: Environment.MOBILE }),
			reset: () => set({ environment: Environment.PC }),
		}),
		{
			name: 'environment-storage',
		},
	),
)

export default useEnvironmentStore;