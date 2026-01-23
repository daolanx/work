import Footer from "@/app/landing/components/footer";
import Header from "@/app/landing/components/header";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
