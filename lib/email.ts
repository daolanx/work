import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
	to,
	subject,
	text,
}: {
	to: string;
	subject: string;
	text: string;
}) => {
	const { data, error } = await resend.emails.send({
		from: "Dax <auth@daolanx.me>",
		to,
		subject,
		text,
	});

	if (error) {
		console.error("Send Email Error:", error);
		throw error;
	}

	return data;
};
