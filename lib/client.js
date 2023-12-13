import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: 'vfgs4hnz',
  dataset: 'production',
  apiVersion: '2023-12-12',
  token: process.env.NEXT_APP_SANITY_TOKEN,
  useCdn: false
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);