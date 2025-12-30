import FadeInWrapper from "@/components/landing/fadeIn-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function CTASection() {
  return (<section>
        <FadeInWrapper delay={0.1}>
          <div className="flex flex-col items-center justify-center relative w-full text-center">
            <h2 className="py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight  mt-8">
              Step into the future of link management
            </h2>
            <p className="text-muted-foreground mt-6 max-w-md mx-auto">
              Experience the cutting-edge solution that transforms how you
              handle your links. Elevate your online presence with our next-gen
              platform.
            </p>
            <div className="mt-6">
              <Button>
                Get started for free
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </FadeInWrapper>
      </section>);
}