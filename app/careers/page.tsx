import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";

const openings = [
  { title: "Senior Software Engineer, Agent Runtime", team: "Engineering", location: "San Francisco" },
  { title: "Staff ML Engineer, Conversation Models", team: "Engineering", location: "San Francisco" },
  { title: "Product Manager, Agent Studio", team: "Product", location: "San Francisco" },
  { title: "Product Designer, Agent Experience", team: "Design", location: "San Francisco" },
  { title: "Enterprise Account Executive", team: "Sales", location: "New York" },
  { title: "Solutions Engineer", team: "Solutions", location: "San Francisco" },
  { title: "Technical Writer", team: "Engineering", location: "Remote" },
  { title: "Head of Customer Success", team: "Customer Success", location: "San Francisco" },
];

const benefits = [
  { title: "Competitive compensation", description: "Top-of-market salary, equity, and annual bonuses." },
  { title: "Health & wellness", description: "Premium medical, dental, and vision for you and your family." },
  { title: "Flexible work", description: "Hybrid-friendly with generous remote work flexibility." },
  { title: "Learning budget", description: "Annual budget for conferences, courses, and professional development." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero tag="Careers" title="Join Pair" description="Help us build the future of customer experience. We're looking for curious, ambitious people who want to make AI work for everyone." />
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-8">Open roles</h2>
          <div className="divide-y divide-sierra-divider border border-sierra-divider rounded-2xl overflow-hidden">
            {openings.map((job) => (
              <div key={job.title} className="flex items-center justify-between px-6 py-4 hover:bg-sierra-bg transition-colors cursor-pointer">
                <div>
                  <h3 className="text-sm font-medium text-sierra-text-dark">{job.title}</h3>
                  <p className="text-xs text-sierra-gray mt-0.5">{job.team}</p>
                </div>
                <span className="text-xs text-sierra-gray">{job.location}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16 bg-sierra-bg">
        <Container>
          <h2 className="text-[28px] leading-8 font-normal text-sierra-text-dark mb-8">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6">
                <h3 className="text-sm font-medium text-sierra-text-dark mb-2">{b.title}</h3>
                <p className="text-xs text-sierra-gray leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
