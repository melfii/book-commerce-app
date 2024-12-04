import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType } from "./types/types";

export default async function Home() {

  const { contents } = await getAllBooks();
  // const session = await getServerSession(nextAuthOptions);
  // const user = session?.user as User;
  const  purchaseBookIds: string[] = [];

  // if(user) {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`);
  //   const purchasesData = await response.json();

  //   purchaseBookIds = purchasesData.map(
  //     (purchaseBook: Purchase) => purchaseBook.bookId 
  //   );
  // }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {contents.map((book:BookType) => (
        <Book
          key={book.id}
          book={book}
          isPurchased={purchaseBookIds.includes(book.id)}
          />
      ))}
    </main>
  );
}
