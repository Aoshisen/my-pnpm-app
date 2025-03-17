import { create } from 'zustand'
import { Record, List } from 'immutable'
import { createJSONStorage, persist } from 'zustand/middleware'

type Count = number;

type Counter = {
	value: Count,
}

type CounterStore = {
	count: number,
	history: List<ReturnType<Record.Factory<Counter>>>,
	currentIndex: number,
	increment: (e?: number) => void,
	decrement: (e?: number) => void,
	update: (e: Count) => void,
	reset: () => void,
	undo: () => void,
	redo: () => void,
	canUndo: () => boolean,
	canRedo: () => boolean,
}

type History = List<ReturnType<Record.Factory<Counter>>>

type BuildHistoryList = (values: Counter[]) => History;

const CounterRecord = Record<Counter>({
	value: 0
})

const initCount = CounterRecord();
const emptyHistory = List([]) as History;

const init = {
	count: 0,
	history: List([initCount]) as History,
	currentIndex: 0,
}

const creatorFactory = create<CounterStore>()


export const buildHistoryList: BuildHistoryList = (values) => {
	//NOTICE: 由于immutable的特性，这里需要使用reduce来进行累加，而不能使用forEach,forEach循环会丢失中间状态；
	const result = values.reduce((result, item) => {
		const newCount = CounterRecord({ value: item.value });
		return result.push(newCount);
	}, emptyHistory);

	return result
}

export const reviver = (key: string, value: unknown) => {
	if (key === "history") {
		return Array.isArray(value) ? buildHistoryList(value) : emptyHistory;
	}
	return value;
}

const useCounterStore = creatorFactory(
	persist((set, get) => {
		return {
			...init,
			reset() {
				set(init)
			},
			update(nextState: Count) {
				set(({ history, currentIndex }) => {
					const nextCount = initCount.set('value', nextState)
					const nextHistory = history.slice(0, currentIndex + 1).push(nextCount)
					return { count: nextState, history: nextHistory, currentIndex: history.size }
				})
			},
			increment(delta = 1) {
				get().update(get().count + delta)
			},
			decrement(delta = 1) {
				get().update(get().count - delta)
			},
			undo() {
				const { currentIndex, history, canUndo } = get()
				if (!canUndo()) return
				const newIndex = currentIndex - 1
				const previousState = history.get(newIndex)
				set({ count: previousState!.get('value'), currentIndex: newIndex })
			},
			redo() {
				const { currentIndex, history, canRedo } = get()
				if (!canRedo()) return;
				const newIndex = currentIndex + 1
				const nextState = history.get(newIndex)
				set({ count: nextState!.get('value'), currentIndex: newIndex })
			},
			canUndo() {
				return get().currentIndex > 0
			},
			canRedo() {
				const { currentIndex, history } = get()
				return currentIndex < (history.size - 1)
			},
		}
	}, {
		name: "counter-store",
		partialize: ({ history, count, currentIndex }) => ({
			count,
			currentIndex,
			//NOTICE: history 是immutable List 对象需要通过此方法转化数据类型
			history: history.toJS(),
		}),
		storage: createJSONStorage(() => localStorage, { reviver })
	})
)

export default useCounterStore