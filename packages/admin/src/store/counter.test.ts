import { describe, it, expect, beforeEach } from 'vitest'
import useCounterStore from './counter'

describe('Counter Store', () => {
	beforeEach(() => {
		useCounterStore.getState().reset()
	})

	describe('基础计数操作', () => {
		it('should increment counter', () => {
			const { increment } = useCounterStore.getState()
			increment(1)
			expect(useCounterStore.getState().count).toBe(1)
		})

		it('should decrement counter', () => {
			const { decrement } = useCounterStore.getState()
			decrement(1)
			expect(useCounterStore.getState().count).toBe(-1)
		})

		it('should update counter directly', () => {
			const { update } = useCounterStore.getState()
			update(10)
			expect(useCounterStore.getState().count).toBe(10)
		})

		it('should reset counter', () => {
			const { increment, reset } = useCounterStore.getState()
			increment(5)
			reset()
			const state = useCounterStore.getState()
			expect(state.count).toBe(0)
			expect(state.currentIndex).toBe(0)
			expect(state.history.size).toBe(1)
		})
	})

	describe('历史记录管理', () => {
		it('should record history when updating', () => {
			const { increment } = useCounterStore.getState()
			increment(1)
			increment(1)
			const { history } = useCounterStore.getState()
			expect(history.size).toBe(3) // 初始状态 + 两次增加
		})

		it('should undo changes', () => {
			const { increment, undo } = useCounterStore.getState()
			increment(1)
			increment(2)
			undo()
			expect(useCounterStore.getState().count).toBe(1)
		})

		it('should redo changes', () => {
			const { increment, undo, redo } = useCounterStore.getState()
			increment(1)
			increment(2)
			undo()
			redo()
			expect(useCounterStore.getState().count).toBe(3)
		})

		it('should handle canUndo correctly', () => {
			const { increment, canUndo } = useCounterStore.getState()
			expect(canUndo()).toBe(false)
			increment(1)
			expect(canUndo()).toBe(true)
		})

		it('should handle canRedo correctly', () => {
			const { increment, undo, canRedo } = useCounterStore.getState()
			increment(1)
			expect(canRedo()).toBe(false)
			undo()
			expect(canRedo()).toBe(true)
		})
	})

	describe('复杂操作场景', () => {
		it('should handle undo/redo after new changes', () => {
			const { increment, undo,  update } = useCounterStore.getState()
			increment(1) // count: 1
			increment(2) // count: 3
			undo()      // count: 1
			update(5)   // count: 5
			expect(useCounterStore.getState().canRedo()).toBe(false)
			expect(useCounterStore.getState().count).toBe(5)
		})

		it('should maintain correct history size', () => {
			const { increment, undo, update } = useCounterStore.getState()
			increment(1)
			increment(2)
			undo()
			update(5)
			expect(useCounterStore.getState().history.size).toBe(3)
		})
	})

})