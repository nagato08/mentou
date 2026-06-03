type JsonLdProps = {
  data: object | object[];
};

/**
 * Injects JSON-LD structured data into HTML.
 * Server component - rendered statically in HTML.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
