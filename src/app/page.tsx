import Image from 'next/image';
import Link from 'next/link';

const demos = [
  {
    id: 'flower-shop',
    title: 'Flower Shop',
    description: 'E-commerce landing page for a luxury flower shop featuring hero section, services, reviews, contact form, and footer with newsletter signup.',
    href: '/flower-shop',
    image: '/images/hero/hero.jpg',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Embla Carousel'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Demo Gallery</h1>
          <p className="text-lg text-primary-muted">A collection of showcase projects built with modern web technologies</p>
        </header>

        <div className="grid gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.href}
              className="group block bg-white border-2 border-primary overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] h-48 sm:h-64 overflow-hidden">
                <Image
                  src={demo.image}
                  alt={demo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-primary px-6 py-3 font-semibold text-lg">
                    View Demo →
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-primary mb-1">{demo.title}</h2>
                <p className="text-sm text-primary-muted mb-3">{demo.description}</p>
                <div className="flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-primary-muted">
          <p>Built with Next.js 16, React 19, Tailwind CSS v4</p>
        </footer>
      </div>
    </main>
  );
}
