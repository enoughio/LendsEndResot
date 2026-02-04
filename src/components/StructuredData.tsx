export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    name: "Land's End Resort",
    alternateName: 'Sumiran Forest Resort',
    description: 'Eco resort in Sumiran Forest, Bhopal with 600 acres of pristine nature, AQI <10, and sustainable living.',
    url: 'https://landsend.bharatstorytellers.com',
    telephone: '+91-8871317382',
    email: 'landsend.sumiran@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8C93+JP9, Bhopal Rd',
      addressLocality: 'Bhopal',
      addressRegion: 'Madhya Pradesh',
      postalCode: '462038',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '23.2193',
      longitude: '77.4538',
    },
    image: 'https://landsend.bharatstorytellers.com/gallery/room1.jpeg',
    priceRange: '$$',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4.8',
      bestRating: '5',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Forest',
        value: '300 acres',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Water Bodies',
        value: '90 acres',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Organic Farms',
        value: '100 acres',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air Quality Index',
        value: 'Less than 10',
      },
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://landsend.bharatstorytellers.com/booking',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'LodgingReservation',
        name: 'Resort Booking',
      },
    },
    sameAs: [
      'https://www.facebook.com/sumiran.org',
      'https://www.instagram.com/sumiran.forest',
      'https://twitter.com/sumiran_forest',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
