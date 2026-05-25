// @ts-nocheck
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";

const Sites = {
	slug: "sites",
	orderable: true,
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "keywords",
			type: "array",
			fields: [
				{
					name: "keyword",
					type: "text",
					required: true,
				},
			],
		},
		{
			name: "previewUrl",
			type: "text",
			required: true,
		},
		{
			name: "webUrl",
			type: "text",
			required: true,
		},
		{
			name: "sourceUrl",
			type: "text",
			required: true,
		},
		{
			name: "isDeveloping",
			type: "checkbox",
			defaultValue: false,
		},
	],
};

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || "",
	collections: [Sites],
	globals: [],
	localization: {
		locales: ["en", "zh"],
		defaultLocale: "en",
		fallback: true,
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL || "",
		},
		schemaName: "payload",
		push: true,
	}),
});
