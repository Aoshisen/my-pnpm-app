import { create } from 'zustand'
export enum Status {
	//未配置
	UN_CONFIG,
	//已发布
	PUBLISHED,
	//未发布
	UN_PUBLISHED,
}
type StatusStore = {
	state: Status,
	unConfig: () => void;
	published: () => void;
	unPublished: () => void;
	reset: () => void;
}
const useConfigStateStore = create<StatusStore>()(
	(set) => ({
		state: Status.UN_CONFIG,
		unConfig: () => set({ state: Status.UN_CONFIG }),
		published: () => set({ state: Status.PUBLISHED }),
		unPublished: () => set({ state: Status.UN_PUBLISHED }),
		reset: () => set({ state: Status.UN_CONFIG }),
	}),
)
export default useConfigStateStore;
