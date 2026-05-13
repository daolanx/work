import { Resend } from "resend";
import ResetPasswordEmail from "./components/reset-password-email";
import VerificationEmail from "./components/verification-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const isProd = process.env.NODE_ENV === "production";
const FROM_EMAIL = "Indie Console <Dax@daolanx.me>";

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
export const sendVerificationEmail = (user, url: string) => {
	if (!isProd) {
		console.log("--- [DEV] Verification Email ---");
		console.log(`To: ${user.email}`);
		console.log(`URL: ${url}`);
		console.log("---------------------------------");
		return;
	}
	return send({
		to: user.email,
		subject: "Indie Console: Verify Your Email",
		react: <VerificationEmail url={url} userName={user.name ?? ""} />,
	});
};

export const sendPasswordResetEmail = (user, url: string) => {
	if (!isProd) {
		console.log("--- [DEV] Password Reset Link ---");
		console.log(`To: ${user.email}`);
		console.log(`URL: ${url}`);
		console.log("---------------------------------");
		return;
	}
	return send({
		to: user.email,
		subject: "Indie Console: Reset Password",
		react: <ResetPasswordEmail url={url} userName={user.name ?? ""} />,
	});
};
