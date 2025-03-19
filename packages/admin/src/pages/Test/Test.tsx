//@see https://github.com/antfu/antfu.me/blob/7d6ca921dcedeca58f60ff518557f1edc55b1615/scripts/sponsors-circles.ts
import { CSSProperties } from "react";
import { hierarchy, pack, descending, randomLogNormal } from "d3";

function createData() {
	const randomFunc = randomLogNormal(0, 3)
	const list = Array.from({ length: 1000 }).fill(".").map(() => randomFunc()).map((i, d) => ({ id: d, value: i }))
	const root = hierarchy({ children: list }).sum(d => d.value).sort((a, b) => descending(a.value, b.value))
	const p = pack().size([800, 800]).padding(2)
	return p(root).descendants();

}
function getStyle(item) {
	const styles = {
		width: item.r * 2,
		height: item.r * 2,
		left: item.x - item.r,
		top: item.y - item.r,
	} as CSSProperties;
	return styles
}

const Test = () => {
	const data = createData().slice(1);
	const className = "pos-absolute border-black  border  rounded-full"
	return (
		<div className="position-relative">
			{
				data?.map((item) => {
					return <div key={item.data?.id}
						className={className}
						style={getStyle(item)}
					></div>

				})
			}

		</div >
	)
}
export default Test;