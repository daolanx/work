/**
 * Upload a file to S3
 */
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/features/console/auth/lib/server";
import { r2 } from "@/features/console/user/lib/r2";

export async function POST(request: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Extract file from the multipart form data
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		// Convert file to Buffer for S3 SDK processing
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = `avatars/${session.user.id}/${uuidv4()}.jpg`;

		// Execute the upload command directly from the server (bypassing pre-signed URLs)
		await r2.send(
			new PutObjectCommand({
				Bucket: process.env.UPLOAD_R2_BUCKET_NAME,
				Key: fileName,
				ContentType: file.type,
				Body: buffer,
			}),
		);

		// Return the final publicly accessible URL
		return NextResponse.json({
			fileUrl: `${process.env.UPLOAD_R2_PUBLIC_URL}/${fileName}`,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
