import { createClient } from "microcms-js-sdk";
import type {
  MicrocmsQueries,
  MicrocmsImage,
  MicrocmsListContent,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicrocmsImage;
} & MicrocmsListContent;

// export type Category = {
//   name: string;
// };

// export type News = {
//   id: string;
//   title: string;
//   category: {
//     name: string;
//   };
//   publishedAt: string;
//   createdAt: string;
// };

export type Category = {
  name: string;
} & MicrocmsListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicrocmsImage;
  category: Category;
} & MicrocmsListContent;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getMemberList = async (queries?: MicrocmsQueries) => {
  const listData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return listData;
};

export const getNewsList = async (queries?: MicrocmsQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};
