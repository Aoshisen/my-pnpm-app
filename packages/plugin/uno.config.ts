import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
	presets: [presetWind3()],
	rules: [],
	content: {
		filesystem: [
			'**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
		],
	},
})