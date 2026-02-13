const config = {
	theme: {
		extend: {
			keyframes: {
				"fade-out-highlight": {
					"0%": { backgroundColor: "rgb(220 252 231 / 0.6)" }, // green-100 with opacity
					"100%": { backgroundColor: "transparent" },
				},
				rainbow: {
					"0%": { "background-position": "0%" },
					"100%": { "background-position": "200%" },
				},
			},
			animation: {
				"fade-out-highlight": "fade-out-highlight 3s ease-out forwards",
				rainbow: "rainbow var(--speed, 2s) infinite linear",
			},
		},
	},
	// ...
};
