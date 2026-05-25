// app/layout.tsx
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// 核心：直接返回 children，不要写 <html> 和 <body>！
	return children;
}
