import Footer from "./_components/footer";
import Header from "./_components/header";
import MotionProvider from "./_components/motion-provider";

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<MotionProvider>
			<Header />
			{children}
			<Footer />
		</MotionProvider>
	);
}
