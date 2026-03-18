import Link from 'next/link';

const demos = [
  {
    id: 'flower-shop',
    title: 'Flower Shop',
    description: 'E-commerce landing page for a luxury flower shop with services, reviews, and contact sections.',
    href: '/flower-shop',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-8">Demo List</h1>
        <div className="grid gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.href}
              className="block p-6 border border-primary hover:bg-primary hover:text-white transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2">{demo.title}</h2>
              <p className="text-primary-muted">{demo.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
