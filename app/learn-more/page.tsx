import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

export default function LearnMorePage() {
  return (
    <>
      <PageHero tag="Contact" title="Get in touch" description="Discover how Pair can transform your customer experience. Fill out the form and our team will be in touch shortly." />
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-sierra-text-dark mb-2">First name</label>
                  <input type="text" className="w-full rounded-lg border border-sierra-divider px-4 py-3 text-sm text-sierra-text focus:outline-none focus:border-sierra-green" />
                </div>
                <div>
                  <label className="block text-sm text-sierra-text-dark mb-2">Last name</label>
                  <input type="text" className="w-full rounded-lg border border-sierra-divider px-4 py-3 text-sm text-sierra-text focus:outline-none focus:border-sierra-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-sierra-text-dark mb-2">Work email</label>
                <input type="email" className="w-full rounded-lg border border-sierra-divider px-4 py-3 text-sm text-sierra-text focus:outline-none focus:border-sierra-green" />
              </div>
              <div>
                <label className="block text-sm text-sierra-text-dark mb-2">Company</label>
                <input type="text" className="w-full rounded-lg border border-sierra-divider px-4 py-3 text-sm text-sierra-text focus:outline-none focus:border-sierra-green" />
              </div>
              <div>
                <label className="block text-sm text-sierra-text-dark mb-2">How can we help?</label>
                <textarea rows={4} className="w-full rounded-lg border border-sierra-divider px-4 py-3 text-sm text-sierra-text focus:outline-none focus:border-sierra-green resize-none" />
              </div>
              <button type="submit" className="w-full rounded-full bg-sierra-green px-8 py-3.5 text-sm font-normal text-white hover:bg-sierra-green-light transition-colors">
                Submit
              </button>
              <p className="text-xs text-sierra-gray text-center">
                By submitting, you agree to our privacy policy. We&apos;ll get back to you within one business day.
              </p>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
