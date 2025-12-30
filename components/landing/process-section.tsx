import FadeInWrapper from "@/components/landing/fadeIn-wrapper";
import { BarChart3Icon, FolderOpenIcon, WandSparklesIcon } from "lucide-react";

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

export default function ProcessSection() {
  return (
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
  );
}
