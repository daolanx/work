import Image from 'next/image';

export default function ServiceSection() {
  return (
    <section className="w-full  mx-auto">
      {/* Header - Full Width */}
      <div className="border border-primary px-2.5 py-20">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary text-center">
          Our Service
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Image */}
        <div className="md:w-1/2 relative aspect-square md:aspect-auto md:h-[560px] border-b md:border-b-0 md:border-r border-primary">
          <Image
            src="/images/service/service-bg.png"
            alt="Flower Subscriptions"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-overlay-medium" />
        </div>

        {/* Right Column - Content */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-10 md:py-20 bg-white">
          <div className="flex flex-col gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-6 items-center text-center w-full">
              <p className="text-sm font-medium uppercase text-primary">
                service
              </p>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
                  Flower Subcriptions
                </h3>
                <p className="text-lg font-medium leading-relaxed text-primary-muted">
                  Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="h-14 px-6 border border-primary text-base font-medium uppercase tracking-widest text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
