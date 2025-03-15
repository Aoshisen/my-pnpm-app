import { Button } from "../../components";
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
			<Button onClick={() => increment(1)}>+1</Button>
			<Button onClick={() => decrement(1)}>-1</Button>
			<Button onClick={reset}>重置</Button>
			<Button onClick={undo} disabled={!canUndo()}>撤销</Button>
			<Button onClick={redo} disabled={!canRedo()}>重做</Button>
		</div>
	)
}
export default Test;