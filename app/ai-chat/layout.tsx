import { Bot } from "lucide-react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col h-screen">
      <header className="w-full border-b-gray-300 p-4 mb-2 border-b-1 flex items-center sticky top-0 bg-white dark:bg-background">
        <Bot className="mr-2 text-current" />
        <h1 className="text-2xl font-bold  bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          AI Chat
        </h1>
      </header>
      {children}
      <footer>
        <p className="text-sm p-4 text-gray-600 ">
          &copy; {new Date().getFullYear()} Dax INC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
