"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Sheet({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	className,
	asChild,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger> & {
	asChild?: boolean;
}) {
	return (
		<DialogPrimitive.Trigger
			asChild={asChild}
			className={className}
			data-slot="sheet-trigger"
			{...props}
		/>
	);
}

function SheetClose({
	className,
	asChild,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close> & { asChild?: boolean }) {
	return (
		<DialogPrimitive.Close
			asChild={asChild}
			className={className}
			data-slot="sheet-close"
			{...props}
		/>
	);
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			className={cn(
				"fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
				className,
			)}
			data-slot="sheet-overlay"
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = "right",
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	side?: "top" | "right" | "bottom" | "left";
	showCloseButton?: boolean;
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<DialogPrimitive.Content
				className={cn(
					"fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=left]:data-[state=closed]:-translate-x-full data-[side=left]:data-[state=open]:translate-x-0 data-[side=right]:data-[state=closed]:translate-x-full data-[side=right]:data-[state=open]:translate-x-0 data-[side=bottom]:data-[state=closed]:translate-y-full data-[side=bottom]:data-[state=open]:translate-y-0 data-[side=top]:data-[state=closed]:-translate-y-full data-[side=top]:data-[state=open]:translate-y-0 data-[side=bottom]:inset-x-0 data-[side=top]:inset-x-0 data-[side=left]:inset-y-0 data-[side=right]:inset-y-0 data-[side=top]:top-0 data-[side=right]:right-0 data-[side=bottom]:bottom-0 data-[side=left]:left-0 data-[side=bottom]:h-auto data-[side=left]:h-full data-[side=right]:h-full data-[side=top]:h-auto data-[side=left]:w-3/4 data-[side=right]:w-3/4 data-[side=bottom]:border-t data-[side=left]:border-r data-[side=top]:border-b data-[side=right]:border-l data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
					className,
				)}
				data-side={side}
				data-slot="sheet-content"
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close asChild data-slot="sheet-close">
						<Button
							className="absolute top-3 right-3"
							size="icon-sm"
							variant="ghost"
						>
							<XIcon />
							<span className="sr-only">Close</span>
						</Button>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col gap-0.5 p-4", className)}
			data-slot="sheet-header"
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			data-slot="sheet-footer"
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			className={cn("font-medium text-base text-foreground", className)}
			data-slot="sheet-title"
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			className={cn("text-muted-foreground text-sm", className)}
			data-slot="sheet-description"
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
};
