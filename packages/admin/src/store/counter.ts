import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Record, List } from 'immutable'

type Counter = {
	value: number,
}

interface CounterStore {
	_count: ReturnType<Record.Factory<Counter>>,
	count: number,
	history: List<ReturnType<Record.Factory<Counter>>>,
	currentIndex: number,
	increment: (e?: number) => void,
	decrement: (e?: number) => void,
	reset: () => void,
	undo: () => void,
	redo: () => void,
	canUndo: () => boolean,
	canRedo: () => boolean,
}

const CounterRecord = Record<Counter>({
	value: 0
})

const useCounterStore = create<CounterStore>()(
	persist((set, get) => ({
		_count: CounterRecord(),
		count: 0,
		history: List([CounterRecord()]),
		currentIndex: 0,

		increment(delta = 1) {
			set((state) => {
				const newCount = state._count.set('value', state._count.get("value") + delta)
				const newHistory = state.history
					.slice(0, state.currentIndex + 1)
					.push(newCount)
				return {
					_count: newCount,
					count: newCount.get('value'),
					history: newHistory,
					currentIndex: newHistory.size - 1
				}
			})
		},

		decrement(delta = 1) {
			set((state) => {
				const newCount = state._count.set('value', state._count.get("value") - delta)
				const newHistory = state.history
					.slice(0, state.currentIndex + 1)
					.push(newCount)
				return {
					_count: newCount,
					count: newCount.get('value'),
					history: newHistory,
					currentIndex: newHistory.size - 1
				}
			})
		},

		reset() {
			const initial = CounterRecord()
			set((state) => ({
				_count: initial,
				count: initial.get('value'),
				history: List([initial]),
				currentIndex: 0
			}))
		},

		undo() {
			const { currentIndex, history } = get()
			if (currentIndex > 0) {
				const newIndex = currentIndex - 1
				const previousState = history.get(newIndex)
				set({
					_count: previousState,
					count: previousState?.get('value'),
					currentIndex: newIndex
				})
			}
		},

		redo() {
			const { currentIndex, history } = get()
			if (currentIndex < history.size - 1) {
				const newIndex = currentIndex + 1
				const nextState = history.get(newIndex)
				set({
					_count: nextState,
					count: nextState?.get('value'),
					currentIndex: newIndex
				})
			}
		},

		canUndo() {
			return get().currentIndex > 0
		},

		canRedo() {
			const { currentIndex, history } = get()
			return currentIndex < history.size - 1
		},
	}), {
		name: "counter-storage"
	})
)

export default useCounterStore