"use client";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { PASSWORD_RULES } from "@/lib/auth/schemas";

// Enhanced Props to support shadcn/react-hook-form "field"
export type PasswordInputProps = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	name?: string;
	id?: string;
	placeholder?: string;
	hideStrength?: boolean;
	disabled?: boolean;
};

export function PasswordInput({
	value = "",
	onChange,
	onBlur,
	name,
	id,
	placeholder = "Password",
	hideStrength = false,
	disabled = false,
}: PasswordInputProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

	const strength = useMemo(() => {
		return PASSWORD_RULES.map((req) => ({
			met: req.regex.test(value),
			text: req.text,
		}));
	}, [value]);

	const strengthScore = useMemo(
		() => strength.filter((req) => req.met).length,
		[strength],
	);

	const getStrengthColor = (score: number) => {
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-red-500";
		if (score <= 2) return "bg-orange-500";
		if (score === 3) return "bg-amber-500";
		return "bg-emerald-500";
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return "Enter a password";
		if (score <= 2) return "Weak password";
		if (score === 3) return "Medium password";
		return "Strong password";
	};

	const shouldShowRequirements =
		!hideStrength && value.length > 0 && strengthScore < 5;

	return (
		<div className="space-y-3">
			<div className="relative">
				<Input
					className="pe-9"
					disabled={disabled}
					id={id}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					placeholder={placeholder}
					type={isVisible ? "text" : "password"}
					value={value}
				/>
				<button
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-colors hover:text-foreground disabled:opacity-50"
					disabled={disabled}
					onClick={toggleVisibility}
					tabIndex={-1}
					type="button"
				>
					{isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
				</button>
			</div>

			{shouldShowRequirements && (
				<div className="fade-in slide-in-from-top-1 animate-in duration-200">
					<div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-border">
						<div
							className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500`}
							style={{ width: `${(strengthScore / 5) * 100}%` }}
						/>
					</div>
					<p className="mb-2 font-medium text-foreground text-sm">
						{getStrengthText(strengthScore)}:
					</p>
					<ul className="space-y-1.5">
						{strength.map((req) => (
							<li className="flex items-center gap-2" key={req.text}>
								{req.met ? (
									<CheckIcon className="text-emerald-500" size={14} />
								) : (
									<XIcon className="text-muted-foreground/50" size={14} />
								)}
								<span
									className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
								>
									{req.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
