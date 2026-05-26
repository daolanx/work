// @ts-nocheck -- needed because payload generate:types uses a tsx version that can't parse import type
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { revalidatePath } from "next/cache";
import { buildConfig } from "payload";

if (!process.env.PAYLOAD_SECRET) throw new Error("PAYLOAD_SECRET is missing");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing");

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
	hooks: {
		afterChange: [
			async () => {
				revalidatePath("/");
			},
		],
		afterDelete: [
			async () => {
				revalidatePath("/");
			},
		],
	},
	fields: [
		{
			name: "preview",
			type: "upload",
			relationTo: "media",
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
		{
			name: "keywords",
			type: "text",
		},
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			localized: true,
		},
	],
};

const Tiers = {
	slug: "tiers",
	orderable: true,
	admin: {
		useAsTitle: "type",
	},
	hooks: {
		afterChange: [
			async () => {
				revalidatePath("/landing");
			},
		],
		afterDelete: [
			async () => {
				revalidatePath("/landing");
			},
		],
	},
	fields: [
		{
			name: "variantId",
			type: "text",
			required: true,
		},
		{
			name: "priceMonthly",
			type: "number",
			required: true,
			min: 0,
		},
		{
			name: "priceAnnually",
			type: "number",
			required: true,
			min: 0,
		},
		{
			name: "type",
			type: "select",
			required: true,
			unique: true,
			options: ["free", "pro", "max"],
		},
	],
};

export default buildConfig({
	secret: String(process.env.PAYLOAD_SECRET),
	collections: [Media, Sites, Tiers],
	globals: [],
	localization: {
		locales: ["en", "zh"],
		defaultLocale: "en",
		fallback: true,
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL,
		},
		schemaName: "payload",
		push: true,
	}),
	plugins: [
		s3Storage({
			enabled: true,
			collections: {
				media: {
					prefix: "medias",
					generateFileURL: ({ filename, size }) => {
						const baseUrl =
							process.env.NEXT_PUBLIC_SITE_URL || "https://demo.daolanx.com";
						if (size && typeof filename === "string") {
							const lastDot = filename.lastIndexOf(".");
							if (lastDot === -1)
								return `${baseUrl}/medias/${filename}_${size}`;
							const name = filename.substring(0, lastDot);
							const ext = filename.substring(lastDot + 1);
							return `${baseUrl}/medias/${name}_${size}.${ext}`;
						}
						return `${baseUrl}/medias/${filename}`;
					},
				},
			},
			bucket: process.env.UPLOAD_R2_BUCKET || "uploads",
			config: {
				region: "auto",
				endpoint: process.env.UPLOAD_R2_ENDPOINT,
				credentials: {
					accessKeyId: String(process.env.UPLOAD_R2_ACCESS_KEY_ID),
					secretAccessKey: String(process.env.UPLOAD_R2_SECRET_ACCESS_KEY),
				},
				requestChecksumCalculation: "WHEN_REQUIRED",
				responseChecksumValidation: "WHEN_REQUIRED",
			},
			acl: "public-read",
			disableLocalStorage: true,
		}),
	],
});
