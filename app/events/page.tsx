import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata(
  "Events",
  "Join Pair at upcoming events or catch up on past sessions on demand."
);

export default function EventsPage() {
  return (
    <>
      <PageHero
        tag="Events"
        title="Events are on the way."
        description="We're putting together our first season of in-person and virtual sessions. Check back soon, or talk to us if you'd like to host one with us."
      />
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sierra-gray text-base leading-relaxed">
              In the meantime, you can read recent customer stories on our{" "}
              <Link href="/blog" className="text-sierra-green hover:underline">
                blog
              </Link>{" "}
              or get in touch via our{" "}
              <Link href="/learn-more" className="text-sierra-green hover:underline">
                contact form
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
