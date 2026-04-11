import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

export default function EventsPage() {
  return (
    <>
      <PageHero
        tag="Events"
        title="Events"
        description="Join us at upcoming events or watch past sessions on demand."
      />
      <section className="py-16 bg-white">
        <Container>
        </Container>
      </section>
    </>
  );
}
