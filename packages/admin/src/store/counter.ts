import { create } from 'zustand'
import { Record, List } from 'immutable'
import { createJSONStorage, persist } from 'zustand/middleware'

type Count = number;

type Counter = {
	value: Count,
}

type CounterStore = {
	_count: ReturnType<Record.Factory<Counter>>,
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

const CounterRecord = Record<Counter>({
	value: 0
})

const immutableCount = CounterRecord();

type History = List<ReturnType<Record.Factory<Counter>>>
const init = {
	_count: immutableCount,
	count: 0,
	history: List([]) as History,
	currentIndex: 0,
}

type BuildHistoryList = (values: Counter[]) => History;

const buildHistoryList: BuildHistoryList = (values) => {
	//NOTICE: 由于immutable的特性，这里需要使用reduce来进行累加，而不能使用forEach,forEach循环会丢失中间状态；
	const result = values.reduce((result, item) => {
		const newCount = CounterRecord({ value: item.value });
		return result.push(newCount);
	}, init.history);

	return result
}

const creatorFactory = create<CounterStore>()

const reviver = (key: string, value: unknown) => {
	if (key === "_count") {
		return value ? CounterRecord(value) : init._count;
	}
	if (key === "history") {
		return Array.isArray(value) ? buildHistoryList(value) : init.history;
	}
	return value;
}

const useCounterStore = creatorFactory(
	persist((set, get) => {
		return {
			...init,
			increment(delta = 1) {
				get().update(get().count + delta)
			},
			decrement(delta = 1) {
				get().update(get().count - delta)
			},
			update(nextState: Count) {
				set(({ _count, history, currentIndex }) => {
					const nextCount = _count.set('value', nextState)
					const nextHistory = history
						.slice(0, currentIndex + 1)
						.push(nextCount)
					return {
						_count: nextCount,
						count: nextState,
						history: nextHistory,
						currentIndex: nextHistory.size - 1,
					}
				})
			},
			reset() {
				set(() => init)
			},
			undo() {
				if (!get().canUndo()) return
				const { currentIndex, history } = get()
				const newIndex = currentIndex - 1
				const previousState = history.get(newIndex)
				set({
					_count: previousState,
					count: previousState!.get('value'),
					currentIndex: newIndex
				})
			},
			redo() {
				if (!get().canRedo()) return;
				const { currentIndex, history } = get()
				const newIndex = currentIndex + 1
				const nextState = history.get(newIndex)
				set({
					_count: nextState,
					count: nextState!.get('value'),
					currentIndex: newIndex
				})
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
		partialize: (state) => ({
			_count: state._count.toJS(),
			history: state.history.toJS(),
			count: state.count,
			currentIndex: state.currentIndex,
		}),
		storage: createJSONStorage(() => localStorage, { reviver })
	})
)

export default useCounterStore