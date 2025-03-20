import { Button } from "../components";
import useCounterStore from "../store/counter";

export const Counter = () => {
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
		<div className="h-screen flex flex-items-center flex-justify-center">
			<div className=" shadow-md shadow-gray-2 h-xl w-xl flex flex-items-center flex-justify-center">
				<div>
					<h1 className="text-center m-b-10">当前值: {count}</h1>
					<div className="flex gap-2 flex-items-center">
						<Button onClick={() => increment(1)}>+1</Button>
						<Button onClick={() => decrement(1)}>-1</Button>
						<Button onClick={reset}>重置</Button>
						<Button onClick={undo} disabled={!canUndo()}>撤销</Button>
						<Button onClick={redo} disabled={!canRedo()}>重做</Button>
					</div>
				</div>
			</div>
		</div>
	)
}