import { BASE_URL } from "@/constants/keys";
import { META } from "@/constants/metadata";
import { Organization, WithContext } from "schema-dts";

const JsonLd = () => {
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default JsonLd;
