// app/api/upload/route.ts
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/lib/auth/server";
import { r2 } from "@/lib/r2";

export async function POST(request: Request) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// 从请求中获取二进制数据
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		// 转换成 Buffer 以便 S3 SDK 处理
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = `avatars/${session.user.id}/${uuidv4()}.jpg`;

		// 后端直接执行上传命令，不通过预签名 URL
		await r2.send(
			new PutObjectCommand({
				Bucket: process.env.UPLOAD_R2_BUCKET_NAME,
				Key: fileName,
				ContentType: file.type,
				Body: buffer,
			}),
		);

		// 返回最终的可访问地址
		return NextResponse.json({
			fileUrl: `${process.env.UPLOAD_R2_PUBLIC_URL}/${fileName}`,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
