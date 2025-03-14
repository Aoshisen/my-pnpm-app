import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 定义状态的类型
interface LocalData {
	data: unknown
	setLocalData: (e: unknown) => void;
}

const useLocalData = create<LocalData>()(
	persist(
		(set) => ({
			data: null,
			setLocalData: (data) => set(data as LocalData)
		}),
		{
			name: 'local-storage',
		},
	),
)

export default useLocalData;