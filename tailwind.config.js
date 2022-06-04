module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			body: ['"Nunito Sans"'],
		},
		extend: {
			colors: {
				"color-primary": "#211E1F",
				"color-secondary": "#54595F",
				"color-text": "#7A7A7A",
				"color-accent": "#E8A901",
				"color-b09c1d7": "#EFBE38",
			},
		},
		transitionProperty: {
			width: "width",
		},
	},
	plugins: [],
};
