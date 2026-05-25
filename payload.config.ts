import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { collections } from "./collections";
import { globals } from "./globals";

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || "",
	collections,
	globals,
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URL || "",
		},
		schemaName: "payload",
	}),
});
