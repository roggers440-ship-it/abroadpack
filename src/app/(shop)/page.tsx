import HomePage from "@/components/HomePage";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd faqs={FAQS} />
      <HomePage />
    </>
  );
}
