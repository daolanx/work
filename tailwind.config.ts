const config = {
	theme: {
		extend: {
			keyframes: {
				"fade-out-highlight": {
					"0%": { backgroundColor: "rgb(220 252 231 / 0.6)" }, // green-100 with opacity
					"100%": { backgroundColor: "transparent" },
				},
			},
			animation: {
				"fade-out-highlight": "fade-out-highlight 3s ease-out forwards",
			},
		},
	},
	// ...
};
