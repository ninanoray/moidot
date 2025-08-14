import { BASE_URL } from "@/constants/keys";
import { META } from "@/constants/metadata";
import Script from "next/script";
import { Organization, WithContext } from "schema-dts";

const JsonLdScript = () => {
  const structuredData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Moidot",
    url: BASE_URL,
    logo: BASE_URL + META.ogImage,
    founder: [
      { "@type": "Person", name: "김무준" },
      { "@type": "Person", name: "김범수" },
    ],
    sameAs: ["https://github.com/ninanoray/moidot"],
  };
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
      // strategy="beforeInteractive"
    />
  );
};

export default JsonLdScript;
