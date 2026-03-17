export default function AboutSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto border-t border-b border-[#121212]">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - "About us" Title */}
        <div className="md:w-[720px] flex-shrink-0 border-b md:border-b-0 md:border-r border-[#121212]">
          <div className="px-8 py-12 md:px-[80px] md:py-[80px]">
            <h2 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-[#121212]">
              About us
            </h2>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-[720px] flex-shrink-0 border-b md:border-b-0 border-[#121212]">
          <div className="px-8 py-12 md:px-[80px] md:py-[80px] flex flex-col gap-16">
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              {/* Overline Label */}
              <span className="text-[14px] font-medium leading-[1.2] uppercase text-[#121212]">
                Our story
              </span>

              {/* Title */}
              <h3 className="text-[32px] md:text-[38px] font-medium leading-[1.2] text-[#121212]">
                Kyiv LuxeBouquets
              </h3>

              {/* Description */}
              <p className="text-[16px] leading-[1.4] text-[rgba(18,18,18,0.9)]">
                We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone's day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.
              </p>
            </div>

            {/* Button */}
            <button className="w-[175px] h-[56px] border border-[#121212] px-6 py-4 text-[16px] font-medium uppercase tracking-[0.48px] text-[#121212] hover:bg-[#121212] hover:text-white transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
