const benefits = [
  {
    title: "Stylish bouquets by florists",
    description:
      "At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. Each bouquet is a unique masterpiece, carefully designed to exceed your expectations.",
  },
  {
    title: "On-time delivery",
    description:
      "Never miss a moment with our on-time flower delivery service. We understand the importance of timely deliveries, ensuring your beautiful arrangements arrive exactly when you need them, every single time.",
  },
  {
    title: "Safe payment",
    description:
      "You can feel secure when placing an order with us, as we use industry-standard security measures and encrypted payment processing to protect your personal information and ensure a safe transaction.",
  },
  {
    title: "Subscription by your needs",
    description:
      "With our subscription service tailored to your specific needs, you can enjoy regular deliveries of fresh, beautiful bouquets at intervals that suit your lifestyle. Perfect for treating yourself or someone special.",
  },
];

function BenefitBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-l border-[#121212] px-8 py-10 md:px-10 md:py-12 last:border-b-0">
      <h3 className="text-[32px] md:text-[38px] font-medium leading-[1.2] text-[#121212] mb-4">
        {title}
      </h3>
      <p className="text-[16px] leading-[1.4] text-[rgba(18,18,18,0.9)]">
        {description}
      </p>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto border-t border-b border-[#121212]">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - "Why choose us?" Title */}
        <div className="md:w-1/2 flex-shrink-0 border-b md:border-b-0 md:border-r border-[#121212]">
          <div className="px-8 py-12 md:px-[80px] md:py-[80px]">
            <h2 className="text-[40px] md:text-[50px] font-semibold leading-[1.2] text-[#121212]">
              Why choose us?
            </h2>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="md:w-1/2 flex-shrink-0">
          {benefits.map((benefit, index) => (
            <BenefitBlock
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
