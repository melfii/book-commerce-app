import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

if (!process.env.NEXT_PUBLIC_SERVICE_DOMAIN || !process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error(
      "Missing environment variables: NEXT_PUBLIC_SERVICE_DOMAIN or NEXT_PUBLIC_API_KEY"
    );
  }

export const client = createClient({
    serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN,
    apiKey: process.env.NEXT_PUBLIC_API_KEY
})

export const getAllBooks = async () => {
    const allBooks = await client.getList<BookType>({
        endpoint: "bookcommerce",
        customRequestInit: {
            cache: "no-store"
        }
    })

    return allBooks;
}

export const getDetailBook = async (contentId: string) => {
    const detailBook = await client.getListDetail<BookType>({
        endpoint: "bookcommerce",
        contentId,
        customRequestInit: {
            cache: "no-store"
        }
    })

    return detailBook;
}