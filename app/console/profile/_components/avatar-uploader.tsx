"use client";

import type React from "react";
import { useRef, useState } from "react";
import ReactCrop, {
	type Crop,
	centerCrop,
	makeAspectCrop,
	type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { IconLoader2, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface AvatarUploaderProps {
	src?: string | null;
	fallbackName?: string;

	onSave: (url: string) => Promise<any>;
}

export function AvatarUploader({
	src,
	fallbackName = "IO",
	onSave,
}: AvatarUploaderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState("");
	const [crop, setCrop] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [isUploading, setIsUploading] = useState(false);

	const imgRef = useRef<HTMLImageElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// 1. Handle File Selection
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgSrc(reader.result?.toString() || "");
				setIsOpen(true);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	// 2. Handle Upload Logic
	const handleUpload = async () => {
		if (!imgRef.current || !completedCrop) return;
		setIsUploading(true);

		try {
			// Create Blob from Canvas
			const blob = await getCroppedImg(imgRef.current, completedCrop);
			if (!blob) throw new Error("Failed to create image blob");

			// Upload to Server
			const formData = new FormData();
			formData.append("file", blob, "avatar.jpg");

			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Upload failed");
			}

			const { fileUrl } = await res.json();

			// Update User Record
			await onSave(fileUrl);

			setIsOpen(false);
			toast.success("Avatar updated");
		} catch (err: any) {
			console.error(err);
			toast.error(err.message || "Failed to upload avatar");
		} finally {
			setIsUploading(false);
			// Reset input to allow re-uploading the same file if needed
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	return (
		<>
			<div className="flex items-center gap-6">
				<div className="group relative h-24 w-24">
					<Avatar className="h-full w-full border-2 border-slate-100 shadow-sm">
						<AvatarImage className="object-cover" src={src || ""} />
						<AvatarFallback className="font-medium text-slate-400 text-xl">
							{fallbackName?.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					{/* Hover Overlay Button */}
					<button
						className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-all duration-200 disabled:cursor-not-allowed group-hover:opacity-100"
						disabled={isUploading}
						onClick={() => fileInputRef.current?.click()}
						type="button"
					>
						{isUploading ? (
							<IconLoader2 className="h-6 w-6 animate-spin text-white" />
						) : (
							<IconUpload className="h-6 w-6 scale-90 text-white transition-transform group-hover:scale-100" />
						)}
					</button>
				</div>

				{/* Hidden Input */}
				<input
					accept="image/*"
					className="hidden"
					onChange={handleFileSelect}
					ref={fileInputRef}
					type="file"
				/>
			</div>

			{/* Crop Dialog */}
			<Dialog onOpenChange={setIsOpen} open={isOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Adjust Avatar</DialogTitle>
					</DialogHeader>
					<div className="flex justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 p-6">
						{imgSrc && (
							<ReactCrop
								aspect={1}
								circularCrop
								className="max-h-[50vh]"
								crop={crop}
								onChange={(_, p) => setCrop(p)}
								onComplete={(c) => setCompletedCrop(c)}
							>
								<Image
									alt="Avatar Crop"
									className="block max-w-full"
									onLoad={(e) => {
										const { width, height } = e.currentTarget;
										setCrop(centerAspectCrop(width, height, 1));
									}}
									ref={imgRef}
									src={imgSrc}
								/>
							</ReactCrop>
						)}
					</div>
					<DialogFooter>
						<Button
							disabled={isUploading}
							onClick={() => setIsOpen(false)}
							variant="ghost"
						>
							Cancel
						</Button>
						<Button disabled={isUploading} onClick={handleUpload}>
							{isUploading && (
								<IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Save Changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

function centerAspectCrop(
	mediaWidth: number,
	mediaHeight: number,
	aspect: number,
) {
	return centerCrop(
		makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
		mediaWidth,
		mediaHeight,
	);
}

async function getCroppedImg(
	image: HTMLImageElement,
	crop: PixelCrop,
): Promise<Blob | null> {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	canvas.width = crop.width;
	canvas.height = crop.height;

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height,
	);

	return new Promise((resolve) => {
		canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
	});
}
