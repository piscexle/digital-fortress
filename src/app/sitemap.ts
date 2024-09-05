import { appConfig } from '@/config/appConfig';
import { MetadataRoute } from 'next';

// type Route = {
//   url: string;
//   lastModified: string;
// };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routeLocal = ['', '/tim-kiem', '/about-us', '/faqs'].map((route) => ({
    url: `${appConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // const productsPromise = getProducts({}).then((products) =>
  //   products.map((product) => ({
  //     url: `${baseUrl}/product/${product.handle}`,
  //     lastModified: product.updatedAt
  //   }))
  // );

  // const pagesPromise = getPages().then((pages) =>
  //   pages.map((page) => ({
  //     url: `${baseUrl}/${page.handle}`,
  //     lastModified: page.updatedAt
  //   }))
  // );

  // let fetchedRoutes: Route[] = [];

  // try {
  //   fetchedRoutes = (await Promise.all([collectionsPromise, productsPromise, pagesPromise])).flat();
  // } catch (error) {
  //   throw JSON.stringify(error, null, 2);
  // }

  // ...fetchedRoutes
  return [...routeLocal];
}
