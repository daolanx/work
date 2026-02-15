import Footer from "./_components/footer";
import Header from "./_components/header";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
