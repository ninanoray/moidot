import { BASE_URL } from "@/constants/keys";
import { META } from "@/constants/metadata";
import Script from "next/script";
import { Organization, WithContext } from "schema-dts";

const JsonLdScript = () => {
  const structuredData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: BASE_URL,
    sameAs: ["https://moidot.com", "https://github.com/ninanoray/moidot"],
    logo: BASE_URL + META.ogImage,
    name: "Moidot",
    description: META.description,
    email: "hiru2128@gmail.com",
  };
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
      strategy="beforeInteractive"
    />
  );
};

export default JsonLdScript;
