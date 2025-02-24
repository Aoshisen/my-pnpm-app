import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 定义状态的类型
interface LocalData {
	data: any
	setLocalData: (e: any) => void;
}

const useLocalData = create<LocalData>()(
	persist(
		(set) => ({
			data: null,
			setLocalData: (data) => set(data)
		}),
		{
			name: 'local-storage',
		},
	),
)

export default useLocalData;