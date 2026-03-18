import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import type * as React from "react";

// --- Shared Styles ---
const main = {
	backgroundColor: "#ffffff",
	fontFamily: "system-ui, -apple-system, sans-serif",
};

const container = {
	margin: "0 auto",
	padding: "40px 20px",
	width: "465px",
	border: "1px solid #e5e7eb",
	borderRadius: "12px",
};

const h1 = {
	color: "#111827",
	fontSize: "24px",
	fontWeight: "700",
	textAlign: "center" as const,
	margin: "0 0 30px",
};

const text = {
	color: "#4b5563",
	fontSize: "16px",
	lineHeight: "24px",
};

const btnContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
};

const baseButton = {
	borderRadius: "8px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "12px 24px",
	display: "inline-block",
};

export const buttonPrimary = { ...baseButton, backgroundColor: "#111827" };
export const buttonPurple = { ...baseButton, backgroundColor: "#9333ea" };

const subtextStyle = {
	color: "#9ca3af",
	fontSize: "14px",
	fontStyle: "italic",
	lineHeight: "20px",
};

const hr = { borderColor: "#e5e7eb", margin: "20px 0" };

const footer = {
	color: "#9ca3af",
	fontSize: "12px",
	textAlign: "center" as const,
};

// --- Component ---
interface BaseEmailProps {
	previewText: string;
	title: string;
	userName: string;
	body: string;
	buttonText: string;
	url: string;
	buttonStyle?: React.CSSProperties;
}

export default function EmailTemplate({
	previewText = "Indie Console Notification",
	title = "Indie Console",
	userName = "User",
	body = "Please take action by clicking the button below.",
	buttonText = "Confirm",
	url = "#",
	buttonStyle = buttonPurple,
}: BaseEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>{title}</Heading>

					<Text style={text}>Hi {userName},</Text>
					<Text style={text}>{body}</Text>

					<Section style={btnContainer}>
						<Button href={url} style={buttonStyle}>
							{buttonText}
						</Button>
					</Section>

					<Text style={subtextStyle}>
						If you didn't request this email, you can safely ignore it.
					</Text>

					<Hr style={hr} />
					<Text style={footer}>
						© 2026 Indie Console. Built for performance.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}
