import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";

export function IconGithub() {
	return (
		<Link
			className="hover:text-primary"
			href="https://github.com/daolanx"
			rel="noopener noreferrer"
			target="_blank"
		>
			<RxGithubLogo className="h-5 w-5" />
			<span className="sr-only">GitHub</span>
		</Link>
	);
}
