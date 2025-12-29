import FadeInWrapper from "@/components/landing/fadeIn-wrapper";

import { RainbowButton } from "@/components/ui/rainbow-button";
import { BorderBeam } from "@/components/ui/border-beam";
import PriceCard from "@/components/landing/price-card";

import Link from "next/link";
import Image from "next/image";
import { BarChart3Icon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";
import { BentoCard, BentoGrid, CARDS } from "@/components/landing/bento-grid";
import { ArrowRightIcon } from "lucide-react";

export const PROCESS = [
  {
    title: "Organize Your Links",
    description:
      "Efficiently categorize and tag your links for quick access and easy management.",
    icon: FolderOpenIcon,
  },
  {
    title: "Shorten and Customize",
    description:
      "Create concise, branded links that are easy to share and track.",
    icon: WandSparklesIcon,
  },
  {
    title: "Analyze and Optimize",
    description:
      "Gain insights into link performance and optimize for better engagement.",
    icon: BarChart3Icon,
  },
] as const;

export const COMPANIES = [
  {
    name: "Asana",
    logo: "company-01.svg",
  },
  {
    name: "Tidal",
    logo: "company-02.svg",
  },
  {
    name: "Innovaccer",
    logo: "company-03.svg",
  },
  {
    name: "Linear",
    logo: "company-04.svg",
  },
  {
    name: "Raycast",
    logo: "company-05.svg",
  },
  {
    name: "Labelbox",
    logo: "company-06.svg",
  },
];

export default function LandingPage() {
  return (
    <main className="section-max-width-wrapper">
      {/* Hero Section */}
      <section className="section-max-width-wrapper">
        <FadeInWrapper className="text-center ">
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
          <RainbowButton className="px-8 py-6  text-xl" asChild>
            <Link href="#" className="group inline-flex items-center">
              Start creating for free
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
            <BorderBeam size={300} duration={12} delay={9} />
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
      {/* Feature Section */}
      <section>
        <FadeInWrapper delay={0.1}>
          <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
            <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
              Manage Links Like a Pro
            </h2>
            <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
              Linkify is a powerful link management tool that helps you shorten,
              track, and organize all your links in one place.
            </p>
          </div>
        </FadeInWrapper>
        <FadeInWrapper delay={0.2}>
          <BentoGrid className="py-8">
            {CARDS.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </FadeInWrapper>
      </section>
      {/* Process Section */}
      <section>
        <FadeInWrapper delay={0.1}>
          <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
            <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
              Build Just With 3 Steps
            </h2>
            <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
              Follow these simple steps to optimize, organize, and share your
              links with ease.
            </p>
          </div>
        </FadeInWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-8 gap-4 md:gap-8">
          {PROCESS.map((process, id) => (
            <FadeInWrapper delay={0.2 * id} key={id}>
              <div className="group p-4 md:p-8 ring-1 rounded-2xl ring-gray-200">
                <div className="flex flex-col items-start justify-center w-full">
                  <process.icon
                    strokeWidth={1.5}
                    className="w-10 h-10 text-foreground"
                  />
                  <div className="flex flex-col relative items-start">
                    <span className="absolute -top-6 right-0 border-2 border-border text-foreground font-medium text-2xl rounded-full w-12 h-12 flex items-center justify-center pt-0.5">
                      {id + 1}
                    </span>
                    <h3 className="text-base mt-6 font-medium text-foreground">
                      {process.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {process.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInWrapper>
          ))}
        </div>
      </section>
      {/* Price Section */}
      <section>
        <PriceCard />
      </section>
      {/* Companies Section */}
      <section>
        <FadeInWrapper delay={0.4}>
          <div className="py-14">
            <div className="mx-auto px-4 md:px-8">
              <h2 className="text-center text-sm font-medium font-heading text-neutral-400 uppercase">
                Trusted by the best in the industry
              </h2>
              <div className="mt-8">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center items-center">
                  {COMPANIES.map((company) => (
                    <li
                      key={company.name}
                      className="flex items-center justify-center w-full h-20 p-4 rounded-xl bg-gray-600 shadow-sm"
                    >
                      <Image
                        src={`/landing/${company.logo}`}
                        alt={company.name}
                        width={120}
                        height={60}
                        className="max-w-[110px] w-auto h-auto object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeInWrapper>
      </section>
      {/* User Section */}
      <section></section>
      {/* Reviews Section */}
      <section></section>
      {/* CTA Section */}
      <section></section>
    </main>
  );
}
