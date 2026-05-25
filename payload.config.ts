// @ts-nocheck
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

const Media = {
	slug: "media",
	upload: {
		imageSizes: [
			{
				name: "thumbnail",
				width: 300,
				height: 200,
				position: "centre",
			},
			{
				name: "card",
				width: 1200,
				height: 514,
				position: "centre",
			},
		],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
};

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
			type: "text",
			localized: true,
		},
		{
			name: "preview",
			type: "upload",
			relationTo: "media",
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
	collections: [Media, Sites],
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
	plugins: [
		s3Storage({
			enabled: true,
			collections: {
				media: {
					generateFileURL: ({ filename, size }) => {
						const base = "https://demo.daolanx.com/media";
						if (size) {
							const ext = filename.split(".").pop();
							const name = filename.replace(/\.[^.]+$/, "");
							return `${base}/${name}_${size}.${ext}`;
						}
						return `${base}/${filename}`;
					},
				},
			},
			bucket: "uploads",
			config: {
				region: "auto",
				endpoint: process.env.UPLOAD_R2_ENDPOINT,
				credentials: {
					accessKeyId: process.env.UPLOAD_R2_ACCESS_KEY_ID,
					secretAccessKey: process.env.UPLOAD_R2_SECRET_ACCESS_KEY,
				},
				requestChecksumCalculation: "WHEN_REQUIRED",
				responseChecksumValidation: "WHEN_REQUIRED",
			},
			acl: "public-read",
			disableLocalStorage: true,
		}),
	],
});
