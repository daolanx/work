import Footer from "@/features/landing/components/footer";
import Header from "@/features/landing/components/header";
import MotionProvider from "@/features/landing/components/motion-provider";

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
