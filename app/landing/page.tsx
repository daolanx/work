import FadeInWrapper from "@/components/landing/fadeIn-wrapper";
import { ArrowRightIcon } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="section-max-width-wrapper">
      {/* Hero Section */}
      <section className="section-max-width-wrapper">
        <FadeInWrapper className="text-center">
          <h1 className=" py-6 text-4xl font-medium  text-balance sm:text-5xl md:text-6xl lg:text-7xl !leading-[1.15] ">
            Build Landing Page with{" "}
            <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text ">
              Fast Speed
            </span>
          </h1>
          <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
            Effortlessly build your landing page with It.
            <br className="hidden md:block" />
            <span className="hidden md:block">
              Faster, Simper, and Effective .
            </span>
          </p>
          <RainbowButton asChild>
            <Link href="#" className="group inline-flex items-center">
              Start creating for free
              <ArrowRightIcon className="w-4 h-4  transition-all duration-200 group-hover:translate-x-1" />
            </Link>
          </RainbowButton>
        </FadeInWrapper>
      </section>
      {/* Feature Section */}
      <section>Feature Section</section>
      {/* Process Section */}
      <section>Process Section</section>
      {/* Price Section */}
      <section>Price Section</section>
      {/* Companies Section */}
      <section>Copmainers Section</section>
      {/* User Section */}
      <section>User Section</section>
      {/* Reviews Section */}
      <section>Reviews Section</section>
      {/* CTA Section */}
      <section>CTA Section</section>
    </main>
  );
}
