import Image from 'next/image';

export default function ServiceSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto">
      {/* Header - Full Width */}
      <div className="border-t border-b border-l border-r border-[#121212] px-2.5 py-[80px]">
        <h2 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-[#121212] text-center">
          Our Service
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Image */}
        <div className="md:w-1/2 relative aspect-square md:aspect-auto md:h-[560px] border-b md:border-b-0 md:border-r border-[#121212]">
          <Image
            src="/images/service/service-bg.png"
            alt="Flower Subscriptions"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(18,18,18,0.25)]" />
        </div>

        {/* Right Column - Content */}
        <div className="md:w-1/2 flex flex-col justify-center px-8 md:px-[80px] py-10 md:py-[80px] bg-white">
          <div className="flex flex-col gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-6 items-center text-center w-full">
              <p className="text-[14px] font-medium uppercase text-[#121212]">
                service
              </p>
              <div className="flex flex-col gap-4 w-full">
                <h3 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-[#121212]">
                  Flower Subcriptions
                </h3>
                <p className="text-[18px] font-medium leading-[1.4] text-[rgba(18,18,18,0.9)]">
                  Experience the convenience and savings of regular flower deliveries with our flexible subscription service - up to 30% more profitable than one-time purchases.
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="h-[56px] px-6 border border-[#121212] text-[16px] font-medium uppercase tracking-[0.48px] text-[#121212] flex items-center justify-center hover:bg-[#121212] hover:text-white transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
