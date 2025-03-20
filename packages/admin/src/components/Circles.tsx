import { CSSProperties, FC } from "react";
import { hierarchy, pack, descending, randomLogNormal, scaleLinear, interpolateNumber } from "d3";

type CirclesProps = {
	size: number
}
export const Circles: FC<CirclesProps> = ({ size = 400 }) => {
	const data = createData().slice(1);
	const className = "pos-absolute  border rounded-full clear-both";

	function createData() {
		const randomFunc = randomLogNormal(0, 1);
		const MIN = 3;
		const MAX = 40;
		const list = Array.from({ length: 100 }).fill(".").map(() => randomFunc()).map((i, d) => ({ id: d, value: i }));
		const largest_one = Math.max(...list.map(item => item.value));
		const compareValuesDescending = (a, b) => descending(a.value, b.value);
		const singleValue = (d) => {
			const i = interpolateNumber(MIN, MAX)
			return i(d.value / largest_one);
		}
		const root = hierarchy({ children: list }).sum(singleValue).sort(compareValuesDescending);
		const p = pack().size([size, size]).padding(2);
		return p(root).descendants();
	}


	function getStyle(item) {
		const colorScale = scaleLinear()
			.domain([0, Math.max(...data.map(item => item.value))])
			.range(["white", "gray"]);
		const styles = {
			width: item.r * 2,
			height: item.r * 2,
			left: item.x - item.r,
			top: item.y - item.r,
			backgroundColor: colorScale(item.value) as unknown, // Set background color based on depth
		} as CSSProperties;
		return styles;
	}


	return (
		<div className="position-relative" style={{
			width: size,
			height: size
		}}>
			{
				data?.map((item) => {
					return <div
						key={item.data?.id}
						className={className}
						style={getStyle(item)}
					/>
				})
			}
		</div>
	);
}