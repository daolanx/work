import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";

export function IconGithub() {
	return (
		<Link
			className="transition-colors hover:opacity-70"
			href="https://github.com/daolanx"
			rel="noopener noreferrer"
			style={{ color: "var(--color-on-surface)" }}
			target="_blank"
		>
			<RxGithubLogo className="h-5 w-5" />
			<span className="sr-only">GitHub</span>
		</Link>
	);
}
