import { useEffect, useRef } from "react";
import { BaseWrapper } from "../../components";
import * as d3 from "d3";
import data from "./graph.json"


export default () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Specify the dimensions of the chart.
		const width = 700;
		const height = 700;

		// Specify the color scale.
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		// The force simulation mutates links and nodes, so create a copy
		const links = data.links.map((d) => ({ ...d }));
		const nodes = data.nodes.map((d) => ({ ...d }));

		// Create a simulation with several forces.
		const simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(links).id((d: any) => d.id))
			.force("charge", d3.forceManyBody())
			.force("x", d3.forceX())
			.force("y", d3.forceY());

		// Create the SVG container.
		const svg = d3.create("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [-width / 2, -height / 2, width, height])
			.attr("style", "max-width: 100%; height: auto;");

		// Append SVG to DOM
		containerRef.current.appendChild(svg.node()!);

		// Add lines and circles
		const link = svg.append("g")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 0.6)
			.selectAll("line")
			.data(links)
			.join("line")
			.attr("stroke-width", (d) => Math.sqrt(d.value));

		const node = svg.append("g")
			.attr("stroke", "#fff")
			.attr("stroke-width", 1.5)
			.selectAll("circle")
			.data(nodes)
			.join("circle")
			.attr("r", 5)
			.attr("fill", (d) => color(d.group));

		node.append("title").text((d) => d.id);

		// Drag functions
		function dragstarted(event: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event: any) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		function dragended(event: any) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		// Apply drag behavior
		node.call(
			d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended)
		);

		// Tick handler
		simulation.on("tick", () => {
			link
				.attr("x1", (d: any) => d.source.x)
				.attr("y1", (d: any) => d.source.y)
				.attr("x2", (d: any) => d.target.x)
				.attr("y2", (d: any) => d.target.y);

			node
				.attr("cx", (d: any) => d.x)
				.attr("cy", (d: any) => d.y);
		});

		// Cleanup function
		return () => {
			simulation.stop();
			if (svg.node()) svg.node()!.remove();
		};
	}, []);

	return (
		<BaseWrapper >
			<div className="h-full w-full" ref={containerRef} />
		</BaseWrapper>
	);
};