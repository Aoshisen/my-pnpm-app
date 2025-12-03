import * as d3 from "d3";

export const width = 400;
const k = width / 200;
const r = d3.randomUniform(k, k * 4);
const n = 4;
export const data = Array.from({ length: 200 }, (_, i) => ({ r: r(), group: i && (i % n + 1) }));
