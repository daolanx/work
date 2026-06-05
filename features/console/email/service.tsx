import { Resend } from "resend";
import ResetPasswordEmail from "./components/reset-password-email";
import VerificationEmail from "./components/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const isProd = process.env.NODE_ENV === "production";
const FROM_EMAIL = "Indie Console <support@daolanx.com>";

async function send({
	to,
	subject,
	react,
}: {
	to: string;
	subject: string;
	react: React.ReactElement;
}) {
	console.log(`🚀 Sending email to: ${to}...`);

	try {
		const { data, error } = await resend.emails.send({
			from: FROM_EMAIL,
			to,
			subject,
			react,
		});

		if (error) {
			// 这里会告诉你为什么失败（比如：Domain not verified）
			console.error("❌ Resend Error:", error);
			return;
		}

		console.log("✅ Email sent successfully:", data?.id);
	} catch (err) {
		console.error("💥 Unexpected Error:", err);
	}
}

export const sendVerificationEmail = async (
	user: { email: string; name?: string | null },
	url: string,
) => {
	if (!isProd) {
		console.log("--- [DEV] Verification Email ---");
		console.log(`To: ${user.email}`);
		console.log(`URL: ${url}`);
		console.log("---------------------------------");
		return;
	}
	try {
		await send({
			to: user.email,
			subject: "Indie Console: Verify Your Email",
			react: <VerificationEmail url={url} userName={user.name ?? ""} />,
		});
	} catch (err) {
		console.error("Error sending verification email:", err);
	}
};

export const sendPasswordResetEmail = async (
	user: { email: string; name?: string | null },
	url: string,
) => {
	if (!isProd) {
		console.log("--- [DEV] Password Reset Link ---");
		console.log(`To: ${user.email}`);
		console.log(`URL: ${url}`);
		console.log("---------------------------------");
		return;
	}
	try {
		await send({
			to: user.email,
			subject: "Indie Console: Reset Password",
			react: <ResetPasswordEmail url={url} userName={user.name ?? ""} />,
		});
	} catch (err) {
		console.error("Error sending password reset email:", err);
	}
};
