// vitest.config.ts

import path from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: "node",
		passWithNoTests: true,
		include: [
			"tests/api/**/*.{test,spec}.ts",
			"tests/components/**/*.{test,spec}.tsx",
			"tests/unit/**/*.{test,spec}.ts",
			"features/**/__tests__/**/*.{test,spec}.ts",
		],
		exclude: ["**/node_modules/**", "**/tests/e2e/**", "**/workers/**"],
		coverage: {
			provider: "v8",
			enabled: true,
			reporter: ["text", "json", "html"],
			include: [
				"app/api/**/*",
				"app/console/_hooks/**/*.ts",
				"components/**/*",
				"features/**/*.ts",
				"lib/**/*.ts",
			],
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
