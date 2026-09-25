const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function JsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "AbroadPack Nepal",
      description:
        "Packing list builder and curated supply service for Nepali students going abroad.",
      url: BASE,
      telephone: "+977-9840953995",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Putalisadak",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      openingHours: "Su-Fr 10:00-18:00",
      areaServed: "Kathmandu",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
