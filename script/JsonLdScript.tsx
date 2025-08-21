import { BASE_URL } from "@/constants/keys";
import { META } from "@/constants/metadata";
import { Organization, WithContext } from "schema-dts";

const JsonLdScript = () => {
  const structuredOrgData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: BASE_URL,
    sameAs: ["https://github.com/ninanoray/moidot"],
    logo: META.icon,
    name: "모이닷",
    description: META.description,
    email: "hiru2128@gmail.com",
  };

  const structuredPersonData = {
    "@context": "http://schema.org",
    "@type": "Person",
    name: "모이닷",
    url: BASE_URL,
    sameAs: ["https://github.com/ninanoray/moidot"],
  };

  return (
    <script
      defer
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredOrgData).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default JsonLdScript;
