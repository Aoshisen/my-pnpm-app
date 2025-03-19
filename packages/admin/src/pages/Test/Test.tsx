import { CSSProperties } from "react";
import { randomInt, hierarchy, pack, HierarchyNode, descending, randomGeometri, randomUniform, randomLogNormal } from "d3";
function createData() {
	const randomFunc = randomLogNormal(0, 1)
	const list = Array.from({ length: 100 }).fill(".").map(() => randomFunc()).map((i, d) => ({ id: d, value: i }))
	const data = hierarchy(
		{
			name: "parent",
			children: list
		}
	) as HierarchyNode<unknown>;

	return pack().size([800, 800]).padding(2)(data.sum(d => d.value)).sort((a, b) => descending(a.value, b.value));
}
const Test = () => {
	const data = createData();
	const className = "pos-absolute border-black  border  rounded-full"
	const circleClassName = " border-black  border  rounded-full";
	return (
		<div className="position-relative w-max m-x-auto m-t-10">
			<div style={{ width: 800, height: 800 }} className={circleClassName}></div>
			{
				data.children?.map((item) => {
					const styles = {
						width: item.r * 2,
						height: item.r * 2,
						left: item.x - item.r,
						top: item.y - item.r,
					} as CSSProperties;
					return <div key={item.data?.id}
						className={className}
						style={styles}
					></div>

				})
			}

		</div >
	)
}
export default Test;