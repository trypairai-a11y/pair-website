import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata(
  "Resources",
  "Whitepapers, case studies, guides, and webinars from the Pair team."
);

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
