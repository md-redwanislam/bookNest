import axios from "axios";
import { useEffect } from "react";

import FeaturedSkeleton from "../components/books/Featured-Skeleton";
import LatestBooks from "../components/books/FeaturedBooks";
import { useBook } from "../hooks/useBook";

const HomePage = () => {
  const { state, dispatch } = useBook();

  useEffect(() => {
    dispatch({ type: "data_fetching" });

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get-all`,
        );
        if (response.data.success) {
          // ?Success
          dispatch({
            type: "data_fetched",
            data: response.data.data,
          });
        }
      } catch (error) {
        // *Error

        dispatch({
          type: "data_fetch_error",
          error: error.message,
        });
      }
    };

    fetchBooks();
  }, [dispatch]);

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <meta name="description" content="An e-commerce site." />
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mt-4">
          Discover Your Next Favorite Book
        </h1>
        <p className="max-w-lg text-center text-slate-500 mt-6">
          Explore thousands of books from various genres. Curated just for book
          lovers.
        </p>
      </section>
      <section className="bg-gray-50 py-16 my-10">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            Latest Books
          </h3>
          {state?.loading ? (
            <FeaturedSkeleton length={4} />
          ) : (
            <LatestBooks latestBooks={state?.books?.slice(0, 4)} />
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
