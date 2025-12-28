import Link from "next/link";
import FadeInWrapper from "./fadeIn-wrapper";

export function Footer() {
  return (
    <footer className="section-max-width-wrapper border-t  pt-8  md:pb-0 px-6 lg:px-8 mt-8">
      <div className="grid gap-8 xl:grid-cols-3  w-full">
        <div className="grid-cols-2 gap-8 grid  xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <FadeInWrapper delay={0.2}>
              <div className="">
                <h3 className="text-base font-medium ">Product</h3>
                <ul className="mt-4 text-sm ">
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Integration
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
            <FadeInWrapper delay={0.3}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium ">
                  Integrations
                </h3>
                <ul className="mt-4 text-sm ">
                  <li className="">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Twitter
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <FadeInWrapper delay={0.4}>
              <div className="">
                <h3 className="text-base font-medium ">Resources</h3>
                <ul className="mt-4 text-sm ">
                  <li className="mt-2">
                    <Link
                      href="/resources/blog"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/resources/help"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
            <FadeInWrapper delay={0.5}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium ">Company</h3>
                <ul className="mt-4 text-sm ">
                  <li className="">
                    <Link
                      href=""
                      className="hover:text-foreground transition-all duration-300"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/privacy"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/terms"
                      className="hover:text-foreground transition-all duration-300"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeInWrapper>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 py-2 md:py-4 md:flex md:items-center md:justify-between w-full">
        <FadeInWrapper delay={0.6}>
          <p className="text-sm ">
            &copy; {new Date().getFullYear()} Dax INC. All rights reserved.
          </p>
        </FadeInWrapper>
      </div>
    </footer>
  );
}

export default Footer;
