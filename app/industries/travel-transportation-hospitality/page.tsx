import { pageMetadata } from "@/lib/constants";
import IndustryPage from "@/components/ui/IndustryPage";

export const metadata = pageMetadata(
  "Travel and hospitality",
  "AI agents for booking management, loyalty programs, and concierge experiences from booking to checkout."
);

export default function Page() {
  return <IndustryPage industry="Travel and hospitality" description="Deliver exceptional guest experiences from booking to checkout with AI agents that understand the art of hospitality." useCases={[
    { title: "Booking management", description: "Help travelers search, book, modify, and cancel reservations across flights, hotels, and rental cars seamlessly." },
    { title: "Loyalty programs", description: "Enable members to check points, redeem rewards, understand tier benefits, and get personalized travel offers." },
    { title: "Concierge services", description: "Provide personalized recommendations for dining, activities, and local experiences tailored to each guest's preferences." },
  ]} />;
}
