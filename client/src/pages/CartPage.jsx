import { useState } from "react";
import { Link } from "react-router-dom";

import CartList from "../components/cart/CartList.jsx";
import CheckoutModal from "../components/checkout/CheckoutModal.jsx";
import { useCart } from "../hooks/useCart.js";

const CartPage = () => {
  const { state, clearCart, updateQuantity, removeItem } = useCart();
  const [showModal, setShowModal] = useState(false);

  if (state.totalItems <= 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 max-w-6xl mx-auto text-center">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-300 mb-6"
        >
          <path
            d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 1 1-8 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Looks like you haven't added any books yet. Browse our collection and
          find your next great read.
        </p>
        <Link
          to="/books"
          className="px-8 py-3 bg-primary hover:bg-cyan-800 text-white font-medium transition"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <>
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}

      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        <>
          <>
            <title>Shopping Cart | BookNest</title>

            <meta
              name="description"
              content="Review the books in your shopping cart and proceed to secure checkout at BookNest."
            />

            <link
              rel="canonical"
              href={`${import.meta.env.VITE_CLIENT_URL}/cart`}
            />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Shopping Cart | BookNest" />
            <meta
              property="og:description"
              content="Review your selected books and complete your purchase at BookNest."
            />
            <meta
              property="og:url"
              content={`${import.meta.env.VITE_CLIENT_URL}/cart`}
            />

            {/* Twitter/X */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Shopping Cart | BookNest" />
            <meta
              name="twitter:description"
              content="Review your selected books and complete your purchase."
            />

            {/* Important: Don't index cart pages */}
            <meta name="robots" content="noindex,nofollow" />
          </>
        </>
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Cart List{" "}
            <span className="text-sm text-indigo-500">
              {state.totalItems > 0 ? state.totalItems : ""}
            </span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Action</p>
          </div>

          {state?.items?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-gray-500 text-sm md:text-base font-medium pt-4"
            >
              <CartList
                item={item}
                clearCart={clearCart}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            </div>
          ))}

          <Link
            to="/books"
            className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
          >
            <svg
              width="15"
              height="11"
              viewBox="0 0 15 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                stroke="#615fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div className="max-w-90 w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="text-gray-500 space-y-3">
            <p className="flex justify-between">
              <span>Total Items</span>
              <span> {state.totalItems} </span>
            </p>
            <p className="flex justify-between">
              <span>Estimated Price</span>
              <span> {state.totalPrice} </span>
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 mt-6 bg-primary hover:bg-cyan-800 text-white font-medium transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
