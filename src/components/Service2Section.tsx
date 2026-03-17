import Image from 'next/image';

export default function Service2Section() {
  return (
    <section className="w-full max-w-[1440px] mx-auto relative h-[560px] md:h-[640px]">
      <div className="absolute inset-0">
        <Image
          src="/images/service2/service2-bg.png"
          alt="Wedding & Event Decor"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(18,18,18,0.4)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-10 md:py-[80px] md:px-[80px]">
        <div className="flex flex-col gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 items-center text-white">
            <p className="text-[14px] font-medium uppercase">
              service
            </p>
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-center">
                Wedding & Event Decor
              </h2>
              <p className="text-[18px] font-medium leading-[1.4] text-center max-w-[586px]">
                Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life.
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="h-[56px] px-6 border border-white text-[16px] font-medium uppercase tracking-[0.48px] text-white flex items-center justify-center hover:bg-white hover:text-[#121212] transition-colors">
            Inquire Now
          </button>
        </div>
      </div>
    </section>
  );
}
