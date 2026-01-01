import FadeInWrapper from "@/components/landing/fadeIn-wrapper";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section>
      <FadeInWrapper className="text-center ">
        <h1 className=" py-6 text-4xl font-medium  text-balance sm:text-5xl md:text-6xl lg:text-7xl !leading-[1.15] ">
          Intuitive Landing Page Builder for {" "}
          <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text ">
            Revenue Growth
          </span>
        </h1>
        <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
          Design high-performance landing pages that load instantly and convert consistently.
          <br className="hidden md:block" />
          <span className="hidden md:block">
           Simple, Fast, Intuitive.
          </span>
        </p>
        <RainbowButton className="px-8 py-6  text-xl" asChild>
          <Link href="#" className="group inline-flex items-center">
            Start Building for Free
            <ArrowRightIcon className="w-4 h-4  transition-all duration-200 group-hover:translate-x-1" />
          </Link>
        </RainbowButton>
      </FadeInWrapper>

      <FadeInWrapper
        delay={0.2}
        className="relative pt-20 pb-20 md:py-32 px-2 bg-transparent w-full "
      >
        {/* <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div> */}
        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
          <Image
            src="/landing/dashboard-dark.svg"
            alt="Dashboard"
            width={1200}
            height={1200}
            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
          />
          <div className="absolute  -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
          <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
        </div>
      </FadeInWrapper>
    </section>
  );
}
