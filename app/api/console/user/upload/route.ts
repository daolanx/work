/**
 * Upload a file to S3
 */
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { r2 } from "@/features/console/user/lib/r2";
import { authApi } from "@/lib/api-handler";

export const POST = authApi(async (req, { user }) => {
	const formData = await req.formData();
	const file = formData.get("file") as File;

	if (!file) {
		return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const fileName = `avatars/${user.id}/${uuidv4()}.jpg`;

	await r2.send(
		new PutObjectCommand({
			Bucket: process.env.UPLOAD_R2_BUCKET_NAME,
			Key: fileName,
			ContentType: file.type,
			Body: buffer,
		}),
	);

	return NextResponse.json({
		fileUrl: `${process.env.UPLOAD_R2_PUBLIC_URL}/${fileName}`,
	});
});
