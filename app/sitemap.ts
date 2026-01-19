import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kelfino.my.id'

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
  ]
}