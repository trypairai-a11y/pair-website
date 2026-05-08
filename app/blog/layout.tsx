import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata(
  "Blog",
  "Product updates, customer stories, and research from the Pair team."
);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
