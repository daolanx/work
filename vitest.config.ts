// vitest.config.ts

import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "node",
		include: [
			"tests/api/**/*.{test,spec}.ts",
			"tests/components/**/*.{test,spec}.tsx",
		],
		exclude: ["**/node_modules/**", "**/tests/e2e/**"],
		coverage: {
			provider: "v8",
			enabled: true,
			reporter: ["text", "json", "html"],
			include: ["app/api/**/*", "components/**/*"],
			exclude: [
				"**/*.test.ts",
				"**/*.test.tsx",
				"src/components/ui/**",
				"node_modules/**",
			],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
});
