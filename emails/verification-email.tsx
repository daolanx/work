import EmailTemplate from "./email-template";

export default function VerificationEmail({ url, userName }) {
	return (
		<EmailTemplate
			body="Welcome to the platform! Please verify your email to get started."
			buttonText="Verify Email"
			previewText="Verify your account access"
			title="Verify Email"
			url={url}
			userName={userName}
		/>
	);
}
