export default function AboutSection() {
  return (
    <section className="w-full  mx-auto border-t border-b border-primary">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - "About us" Title */}
        <div className="flex-1 md:sticky md:top-[73px] md:h-fit md:flex-shrink-0 border-b md:border-b-0 md:border-r border-primary">
          <div className="px-8 py-12 md:px-20 md:py-20">
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-primary">
              About us
            </h2>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1  flex-shrink-0 border-b md:border-b-0 border-primary">
          <div className="px-8 py-12 md:px-20 md:py-20 flex flex-col gap-16">
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              {/* Overline Label */}
              <span className="text-sm font-medium leading-tight uppercase text-primary">
                Our story
              </span>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-medium leading-tight text-primary">
                Kyiv LuxeBouquets
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-primary-muted">
                We are a modern local floral studio, which specializes in the design and delivery of unique bouquets. We have the best florists who carefully select each look, our studio cooperates directly with farms for growing different flowers, so we always have fresh flowers, which are collected by our florists in exquisite bouquets. We have a collection of fresh bouquets, collections of dried bouquets, house plants, as well as fragrant candles from luxury brands to create the perfect atmosphere. Make someone's day amazing by sending flowers, plants and gifts the same or next day. Ordering flowers online has never been easier.
              </p>
            </div>

            {/* Button */}
            <button className="w-[175px] h-14 border border-primary px-6 py-4 text-base font-medium uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
