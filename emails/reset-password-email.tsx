import EmailTemplate from "./email-template";

export default function ResetPasswordEmail({ url, userName }) {
	return (
		<EmailTemplate
			body="We received a request to reset your password. Click the button below to secure your account:"
			buttonText="Reset Password"
			previewText="Password reset request"
			title="Reset Password"
			url={url}
			userName={userName}
		/>
	);
}
