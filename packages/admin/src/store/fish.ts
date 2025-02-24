import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 定义状态的类型
interface FishState {
	fishes: number;
	addAFish: () => void;
}

const useFishStore = create<FishState>()(
	persist(
		(set, get) => ({
			fishes: 0,
			addAFish: () => set({ fishes: get().fishes + 1 }),
		}),
		{
			name: 'food-storage',
		},
	),
)

export default useFishStore;