import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Land's End Resort - Sumiran Forest",
    short_name: "Land's End",
    description: "Experience nature at Land's End Resort in Sumiran Forest, Bhopal. 600 acres of pristine forest with eco-friendly accommodations.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#067C0B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
