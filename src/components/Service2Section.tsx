import Image from 'next/image';

export default function Service2Section() {
  return (
    <section className="w-full  mx-auto relative h-[560px] md:h-[640px]">
      <div className="absolute inset-0">
        <Image
          src="/images/service2/service2-bg.png"
          alt="Wedding & Event Decor"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-overlay-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 md:py-20 md:px-20">
        <div className="flex flex-col gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 items-center text-white">
            <p className="text-sm font-medium uppercase">
              service
            </p>
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-center">
                Wedding & Event Decor
              </h2>
              <p className="text-lg font-medium leading-relaxed text-center max-w-[586px]">
                Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="h-14 px-6 border border-white text-base font-medium uppercase tracking-widest text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
            Inquire Now
          </button>
        </div>
      </div>
    </section>
  );
}
