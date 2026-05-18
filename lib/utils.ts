import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ValidationError } from "@/lib/errors";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validate<T>(
	schema: {
		safeParse: (
			v: unknown,
		) =>
			| { success: false; error: { message: string } }
			| { success: true; data: T };
	},
	data: unknown,
): T {
	const result = schema.safeParse(data);
	if (!result.success) throw new ValidationError(result.error.message);
	return result.data;
}
