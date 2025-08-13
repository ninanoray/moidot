import JsonLd from "@/script/jsonLd";
import Home from ".";

export default async function home() {
  return (
    <>
      <JsonLd />
      <Home />
    </>
  );
}
