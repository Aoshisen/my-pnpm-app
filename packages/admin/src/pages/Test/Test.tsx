import useCounterStore from "../../store/counter";

const Test = () => {
	const {
		count,
		increment,
		decrement,
		reset,
		undo,
		redo,
		canUndo,
		canRedo
	} = useCounterStore()

	return (
		<div>
			<h2>当前值: {count}</h2>
			<button onClick={() => increment(1)}>+1</button>
			<button onClick={() => decrement(1)}>-1</button>
			<button onClick={reset}>重置</button>
			<button onClick={undo} disabled={!canUndo()}>撤销</button>
			<button onClick={redo} disabled={!canRedo()}>重做</button>
		</div>
	)
}
export default Test;