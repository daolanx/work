"use client";

import { Bird, Check, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

import { styles } from "./styles";

interface AIMessageProps {
	children: React.ReactNode;
	onRetry?: () => void;
}

function extractTextFromChildren(children: React.ReactNode): string {
	if (typeof children === "string") return children;
	if (typeof children === "number") return String(children);
	if (!children) return "";

	if (Array.isArray(children)) {
		return children.map(extractTextFromChildren).join("");
	}

	if (
		typeof children === "object" &&
		children !== null &&
		"props" in children
	) {
		const element = children as React.ReactElement<{
			children?: React.ReactNode;
		}>;
		return extractTextFromChildren(element.props.children);
	}

	return "";
}

export function AIMessage({ children, onRetry }: AIMessageProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const text = extractTextFromChildren(children);
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback for older browsers
			const textarea = document.createElement("textarea");
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex gap-4">
				{/* AI Icon */}
				<div
					className="flex size-9 shrink-0 items-center justify-center rounded-lg"
					style={{ background: styles.primary, boxShadow: styles.shadowMd }}
				>
					<Bird className="size-4 text-white" />
				</div>

				{/* Content */}
				<div
					className="flex max-w-[80%] flex-1 flex-col gap-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm px-6 py-4"
					style={{
						background: styles.surfaceLow,
						boxShadow: styles.shadowSm,
					}}
				>
					<div className="flex flex-col gap-6">{children}</div>

					{/* Action buttons - inside bubble, right aligned */}
					<div className="flex items-end justify-end gap-3">
						{onRetry && (
							<button
								className="flex items-center gap-1.5 p-1 transition-colors hover:text-[var(--color-primary)]"
								onClick={onRetry}
								style={{ color: styles.tertiary }}
								title="Regenerate response"
								type="button"
							>
								<RotateCcw className="size-3.5 shrink-0" />
							</button>
						)}
						<button
							className="flex items-center gap-1.5 p-1 transition-colors hover:text-[var(--color-primary)]"
							onClick={handleCopy}
							style={{ color: styles.tertiary }}
							title={copied ? "Copied!" : "Copy to clipboard"}
							type="button"
						>
							{copied ? (
								<Check className="size-3.5 shrink-0 text-green-600" />
							) : (
								<Copy className="size-3.5 shrink-0" />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
