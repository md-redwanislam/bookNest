import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import BookList from "../components/books/BookList";
import BookListSkeleton from "../components/books/BookList-Skeleton";
import Pagination from "../components/Pagination";
import { useBook } from "../hooks/useBook";

const BooksPage = () => {
  const { state, dispatch } = useBook();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  // const minPrice = searchParams.get("minPrice");
  // const maxPrice = searchParams.get("maxPrice");
  const categories = searchParams.get("categories");
  const author = searchParams.get("author");

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: "data_fetching" });

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/book/get-all`,
          {
            params: {
              page,
              keyword,
              categories,
              author,
            },
          },
        );

        dispatch({
          type: "data_fetched",
          data: response.data.data,
        });
      } catch (error) {
        dispatch({
          type: "data_fetch_error",
          error: error.message,
        });
      }
    };

    fetchBooks();
  }, [page, keyword, categories, author]);

  const updateParams = (newParams) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...newParams,
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar */}
          <div className="w-full md:max-w-55 shrink-0 shadow-md px-6 py-6 h-fit">
            <div className="flex items-center border-b border-gray-300 pb-3 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

              <button
                onClick={() =>
                  updateParams({
                    categories: "",
                    author: "",
                    keyword: "",
                    page: 1,
                  })
                }
                className="ml-auto text-gray-500 hover:text-red-500 text-lg font-semibold"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <h6 className="text-sm font-semibold text-gray-900 mb-3">
                Categories
              </h6>
              <ul className="space-y-3">
                {[...new Set(state?.books?.map((b) => b.category))].map(
                  (category, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={category}
                        onChange={(e) => {
                          const selected = searchParams.get("categories")
                            ? searchParams.get("categories").split(",")
                            : [];

                          if (e.target.checked) {
                            selected.push(category);
                          } else {
                            const i = selected.indexOf(category);
                            if (i > -1) selected.splice(i, 1);
                          }

                          updateParams({ categories: selected.join(",") });
                        }}
                        className="w-4 h-4"
                      />
                      <label className="text-sm text-gray-600">
                        {category}
                      </label>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <hr className="my-6 border-gray-300" />

            <div>
              <h6 className="text-sm font-semibold text-gray-900 mb-3">
                Authors
              </h6>
              <ul className="space-y-3">
                {[...new Set(state?.books?.map((b) => b.author))].map(
                  (author, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="author"
                        value={author}
                        onChange={(e) =>
                          updateParams({ author: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      <label className="text-sm text-gray-600">{author}</label>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <input
                value={keyword}
                onChange={(e) => updateParams({ keyword: e.target.value })}
                type="text"
                placeholder="Search books, description..."
                className="w-full md:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {state?.loading ? (
                <BookListSkeleton length={8} count={4} />
              ) : (
                state?.books?.map((book) => (
                  <BookList key={book._id} book={book} />
                ))
              )}
            </div>

            <div className="mt-8">
              <Pagination
                page={state?.page}
                totalPages={state?.totalPages}
                onPageChange={(p) =>
                  setSearchParams({
                    ...Object.fromEntries(searchParams),
                    page: p,
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksPage;
