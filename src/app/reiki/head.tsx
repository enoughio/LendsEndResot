export default function Head() {
  const title = "Reiki Level One Workshop at Land's End | Sumiran Forest, Bhopal";
  const description =
    "Join Dr. Paula Horan for a two-day Reiki Level One workshop at Land's End, Sumiran Forest near Bhopal. Learn Reiki in an intimate forest setting with meals, stay, and certification included.";
  const canonical = "https://landsend.storyretreat.in/reiki";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Reiki workshop, Reiki Level One, Dr. Paula Horan, Bhopal retreat, Sumiran Forest, healing retreat, certification"
      />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Land's End" />
      <meta property="og:image" content="https://landsend.storyretreat.in/events/paula-horan.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://landsend.storyretreat.in/events/paula-horan.jpg" />
    </>
  );
}