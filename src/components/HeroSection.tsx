import Image from 'next/image';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 1,
    label: 'Fresh Flowers',
    image: '/images/hero/fresh-flowers.jpg',
    imageFirst: false,
  },
  {
    id: 2,
    label: 'Live Plants',
    image: '/images/hero/live-plants.jpg',
    imageFirst: true,
  },
  {
    id: 3,
    label: 'Dried Flowers',
    image: '/images/hero/dried-flowers.jpg',
    imageFirst: false,
  },
  {
    id: 4,
    label: 'Fresheners',
    image: '/images/hero/fresheners.jpg',
    imageFirst: true,
  },
  {
    id: 5,
    label: 'Aroma Candels',
    image: '/images/hero/aroma-candles.jpg',
    imageFirst: false,
  },
];

function CategoryRow({
  category,
}: {
  category: { id: number; label: string; image: string; imageFirst: boolean };
}) {
  return (
    <div
      className={cn(
        'flex flex-row border-b border-primary',
        category.imageFirst ? 'flex-row-reverse' : ''
      )}
    >
      {/* Text Side */}
      <div className={cn(
        "w-1/2 p-4 md:p-6 flex flex-col items-center justify-between aspect-square border-b md:border-b-0 border-primary",
        category.imageFirst ? "border-l border-l-0" : "border-l border-primary"
      )}>
        <span className="text-4xl font-medium leading-tight text-center text-primary">
          {category.label}
        </span>
        <button className="flex items-center gap-1 text-base font-semibold tracking-wide text-primary">
          {category.imageFirst ? (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shop now
            </>
          ) : (
            <>
              Shop now
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Image Side */}
      <div className="w-1/2 aspect-square relative">
        <Image
          src={category.image}
          alt={category.label}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="w-full mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Left Section - 720px */}
        <div className="lg:flex-shrink-0 lg:sticky lg:top-[73px] border-r-0 lg:border-r border-primary">
          <div className="px-8 lg:px-20 py-12 lg:py-20 border-b border-primary">
            <h1 className="text-4xl lg:text-6xl font-semibold leading-tight tracking-tight text-primary">
              Kyiv LuxeBouquets<sup className="text-2xl lg:text-4xl font-medium ml-1">®</sup>
            </h1>
            <p className="mt-4 text-base lg:text-lg text-primary-muted leading-relaxed">
              Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our{' '}
              <span className="italic">Online Flower</span>{' '}
              <span className="italic">Delivery Service</span>
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Hero Image - left half */}
            <div className="w-full lg:w-1/2 border-b lg:border-b-0 border-primary">
              <div className="relative aspect-[4/3] lg:aspect-square">
                <Image
                  src="/images/hero/hero.jpg"
                  alt="Hero flowers"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Description text - right half */}
            <div className="w-full lg:w-1/2 flex items-end border-l border-primary">
              <div className="p-4 lg:p-6">
                <p className="text-sm text-primary-muted leading-tight">
                  Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - 5 category rows */}
        <div className="flex-1">
          {categories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
