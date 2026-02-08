import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
	region: "auto",
	endpoint: process.env.UPLOAD_R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.UPLOAD_R2_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.UPLOAD_R2_SECRET_ACCESS_KEY as string,
	},
	requestChecksumCalculation: "WHEN_REQUIRED",
	responseChecksumValidation: "WHEN_REQUIRED",
});
