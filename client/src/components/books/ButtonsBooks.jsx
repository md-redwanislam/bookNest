import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

const ButtonsBooks = ({ book }) => {
  const { addToCart, state, updateQuantity, removeItem } = useCart();

  const cartItem = state.items.find(
    (item) =>
      (typeof item.book === "string" ? item.book : item.book?._id) ===
      book._id
  );

  return (
    <div className="grid grid-cols-2 gap-2 mt-3">
      <Link
        to={`/book/${book._id}`}
        className="bg-slate-100 hover:bg-cyan-600 text-white-600 py-2 text-center"
      >
        Details
      </Link>
      {cartItem ? (
        <div className="flex items-center justify-center gap-2">
          {cartItem.quantity === 1 ? (
            <button
              onClick={() => removeItem(cartItem.book)}
              className="w-8 h-8 border border-gray-300 hover:cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                  stroke="#FF532E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => updateQuantity(cartItem.book, "dec")}
              className="w-8 h-8 border border-gray-300 hover:cursor-pointer"
            >
              -
            </button>
          )}
          <span>{cartItem.quantity}</span>
          <button
            onClick={() => updateQuantity(cartItem.book, "inc")}
            className="w-8 h-8 border border-gray-300 hover:cursor-pointer"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            addToCart(book._id, book.price, book.title, book.coverImage)
          }
          className="bg-slate-100 hover:bg-cyan-600 text-white-600 py-2 cursor-pointer"
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ButtonsBooks;
