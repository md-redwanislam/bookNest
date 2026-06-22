import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Ratings from "../components/books/Ratings";
import { useCart } from "../hooks/useCart";

const GetSingleBook = () => {
  let { bookId } = useParams();
  const [book, setBook] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get/${bookId}`,
        );
        setBook(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [bookId]);

  return (
    <div className="p-4 bg-gray-100">
      {book && book.length > 0 && (
        <div className="lg:max-w-6xl max-w-xl mx-auto">
          <>
            <title>{book?.[0]?.title || "Book Details"}</title>

            <meta
              name="description"
              content={book?.[0]?.description || "Book information"}
            />

            <link
              rel="canonical"
              href={`${import.meta.env.VITE_CLIENT_URL}/book/${book?.[0]?._id}`}
            />

            {/* Open Graph */}
            <meta property="og:type" content="book" />
            <meta property="og:title" content={book?.[0]?.title} />
            <meta property="og:description" content={book?.[0]?.description} />
            <meta property="og:image" content={book?.[0]?.coverImage} />
            <meta
              property="og:url"
              content={`${import.meta.env.VITE_CLIENT_URL}/book/${book?.[0]?._id}`}
            />
            <meta property="og:site_name" content="Your Book Store" />

            {/* Twitter/X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={book?.[0]?.title} />
            <meta name="twitter:description" content={book?.[0]?.description} />
            <meta name="twitter:image" content={book?.[0]?.coverImage} />

            {/* SEO */}
            <meta name="robots" content="index,follow" />
          </>
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
            <div className="w-full lg:sticky top-0">
              <div className="flex flex-col gap-4">
                <div className="bg-white shadow-sm p-2">
                  <img
                    src={book[0].coverImage}
                    alt="Product"
                    className="w-full  aspect-11/8 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {book[0]?.title}
                </h3>
                <h2 className="text-md sm:text-xl font-medium text-slate-900">
                  BY {book[0]?.author}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <Ratings rating={book[0]?.ratings} />
                  <span className="text-slate-500">|</span>
                  <p className="text-sm text-slate-500">{book[0]?.category}</p>
                  <span className="text-slate-500">|</span>
                  <p className="text-sm text-slate-500">
                    {book[0]?.numReviews} Reviews
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-slate-500 mt-1 text-sm">
                    {book[0]?.description}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2 mt-6">
                  <h4 className="text-primary text-2xl sm:text-3xl font-semibold">
                    ${book[0]?.price}
                  </h4>
                </div>
              </div>

              <hr className="my-6 border-gray-300" />

              <div>
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() =>
                      addToCart(book[0]._id, book[0].price, book[0].title)
                    }
                    type="button"
                    className="px-4 py-3 w-[45%] cursor-pointer border border-gray-300 bg-white hover:bg-cyan-800 text-slate-900 text-sm font-medium"
                  >
                    Add to cart
                  </button>
                  {/* <button
                  type="button"
                  className="px-4 py-3 w-[45%] cursor-pointer border border-purple-600 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium"
                >
                  Buy it now
                </button> */}
                </div>
              </div>

              <hr className="my-6 border-gray-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSingleBook;
