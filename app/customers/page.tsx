import { pageMetadata } from "@/lib/constants";
import Container from "@/components/layout/Container";
import PageCTA from "@/components/ui/PageCTA";
import CustomerCard from "@/components/ui/CustomerCard";

export const metadata = pageMetadata(
  "Customers",
  "See how leading companies use Pair to deliver personalized, on-brand customer experiences at scale."
);

type Story = {
  company: string;
  slug?: string;
  logoSrc?: string;
  imageSrc: string;
  metricLabel: string;
  metricValue: string;
  tagline: string;
  hideLogo?: boolean;
  naturalLogo?: boolean;
  zoomOut?: boolean;
  zoomIn?: boolean;
  largerLogo?: boolean;
  objectTop?: boolean;
  brandColor?: string;
};

const featured: Story = {
  company: "Flare Fitness",
  slug: "flare-fitness",
  logoSrc: "/logos/flare-fitness-white.png",
  imageSrc: "/photos/customers/flare-fitness.jpg",
  metricLabel: "Resolution rate",
  metricValue: "89%",
  tagline: "How Flare Fitness uses AI to support members around the clock.",
  naturalLogo: true,
  largerLogo: true,
};

const stories: Story[] = [
  {
    company: "Cinescape",
    slug: "cinescape",
    logoSrc: "/logos/cinescape.png",
    imageSrc: "/photos/customers/cinescape.jpg",
    metricLabel: "Accuracy",
    metricValue: "100%",
    tagline: "How Cinescape gives cinema guests instant answers with AI.",
  },
  {
    company: "Provin",
    slug: "provin",
    logoSrc: "/logos/provin.png",
    imageSrc: "/photos/customers/provin.jpg",
    metricLabel: "Campaigns automated",
    metricValue: "85%",
    tagline: "How Provin scales technical support with AI.",
  },
  {
    company: "ktech",
    slug: "ktech",
    logoSrc: "/logos/ktech.png",
    imageSrc: "/photos/customers/ktech.jpg",
    metricLabel: "Enrollment increase",
    metricValue: "41%",
    tagline: "How ktech reaches students faster and streamlines admissions.",
  },
  {
    company: "Boutiqaat",
    slug: "boutiqaat",
    logoSrc: "/logos/boutiqaat.png",
    imageSrc: "/photos/customers/boutiqaat.jpg",
    metricLabel: "Customer satisfaction",
    metricValue: "4.8/5",
    tagline: "How Boutiqaat is reimagining beauty commerce with AI.",
    largerLogo: true,
    zoomIn: true,
  },
  {
    company: "CCK",
    slug: "cck",
    logoSrc: "/logos/cck.png",
    imageSrc: "/photos/customers/cck-face.jpg",
    metricLabel: "Customer satisfaction",
    metricValue: "90%",
    tagline: "How CCK keeps service quality high as it scales with AI.",
    zoomIn: true,
  },
  {
    company: "Macro",
    slug: "macro",
    logoSrc: "/logos/macro.png",
    imageSrc: "/photos/customers/macro.jpg",
    metricLabel: "Faster response",
    metricValue: "75%",
    tagline: "How Macro delivers compliant client service with AI.",
  },
  {
    company: "Flash",
    slug: "flash",
    logoSrc: "/logos/flash.png",
    imageSrc: "/photos/customers/flash.jpg",
    metricLabel: "Auto-resolution",
    metricValue: "82%",
    tagline: "How Flash gives every delivery a real-time update with AI.",
  },
  {
    company: "Yaqoub Al-Sanea",
    slug: "yaqoub-al-sanea",
    logoSrc: "/logos/yaqoub-alsanea.png",
    imageSrc: "/photos/customers/yaqoub-al-sanea.jpg",
    metricLabel: "Conversion increase",
    metricValue: "45%",
    tagline: "How Yaqoub Al-Sanea brings the in-store experience online with AI.",
  },
  {
    company: "Yiswa",
    slug: "yiswa",
    logoSrc: "/logos/yiswa.png",
    imageSrc: "/photos/customers/yiswa.jpg",
    metricLabel: "Capacity increase",
    metricValue: "5x",
    tagline: "How Yiswa scaled support to thousands of users with AI.",
  },
  {
    company: "The Burrow",
    logoSrc: "/logos/the-burrow.png",
    imageSrc: "/photos/customers/the-burrow.jpg",
    metricLabel: "Customer satisfaction",
    metricValue: "4.9/5",
    tagline: "How The Burrow makes every guest feel at home with AI.",
  },
  {
    company: "Banta Furniture",
    logoSrc: "/logos/banta-furniture.svg",
    imageSrc: "/photos/customers/banta-furniture.jpg",
    metricLabel: "Conversion increase",
    metricValue: "60%",
    tagline: "How Banta Furniture brings showroom service online with AI.",
  },
  {
    company: "Future Kid",
    logoSrc: "/logos/future-kid.png",
    imageSrc: "/photos/customers/future-kid.jpg",
    metricLabel: "Customer satisfaction",
    metricValue: "4.9/5",
    tagline: "How Future Kid keeps every visit fun with AI.",
    largerLogo: true,
  },
];

export default function CustomersPage() {
  return (
    <>
      <div className="pt-12 bg-white" />
      <section className="pt-32 pb-16 bg-white">
        <Container narrow>
          <h1 className="text-[32px] leading-[36px] md:text-[44px] md:leading-[48px] font-normal text-sierra-text-dark mb-4 max-w-3xl">
            Our customers
          </h1>
          <p className="text-[13px] md:text-lg text-sierra-gray max-w-2xl">
            Pair is trusted by industry leaders with millions of customers.
          </p>
        </Container>
      </section>
      <section className="pb-20 bg-white">
        <Container narrow>
          <CustomerCard {...featured} featured />
        </Container>
      </section>
      <section className="py-20 bg-white">
        <Container narrow>
          <div className="mb-14 max-w-2xl">
            <h2 className="text-[28px] leading-[1.15] md:text-[44px] md:leading-[1.05] font-normal text-sierra-text-dark">
              Pair touches every moment that matters.
            </h2>
            <p className="mt-4 text-[14px] md:text-base text-sierra-gray">
              Better customer experiences. Better business outcomes. Every time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {stories.map((s) => (
              <CustomerCard key={s.company} {...s} />
            ))}
          </div>
        </Container>
      </section>
      <PageCTA narrow />
    </>
  );
}
