import FadeInWrapper from "@/components/landing/fadeIn-wrapper";
import Image from "next/image";

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


export default function CompanySection() {
  return (  <section>
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
        </section>);
}