import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";

const CheckoutModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const { api } = useAxios();
  const { auth } = useAxios();

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());

      if (auth?.authToken) {
        const res = await api.post(
          `${import.meta.env.VITE_BASE_URL}/order/create-checkout-session`,
          { shippingAddress: formObject },
        );
        if (res.data.success) {
          window.location.href = res.data.message.url;
        } else {
          throw new Error(res.data.message || "Login failed");
        }
      } else navigate("/signin");
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-gray-300/60 h-12 rounded-full px-6 text-gray-500/80 placeholder-gray-500/80 outline-none text-sm focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors";

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-8 w-full max-w-md rounded-2xl shadow-xl relative transition-all duration-200 ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12.5 7.5-5 5m0-5 5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13.43a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
              <path
                d="M3.62 8.49c1.97-8.66 14.8-8.65 16.76.01 1.15 5.08-2.01 9.38-4.78 12.04a5.193 5.193 0 0 1-7.21 0c-2.76-2.66-5.92-6.97-4.77-12.05Z"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className="text-2xl text-gray-900 font-medium">
            Shipping Address
          </h2>
          <p className="text-sm text-gray-500/90 mt-1">
            Where should we deliver your order?
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            required
            className={inputClass}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile number"
            required
            className={inputClass}
          />

          <input
            type="text"
            name="addressLine"
            placeholder="Street address"
            required
            className={inputClass}
          />

          <div className="flex gap-3">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className={inputClass}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal code"
              required
              className={inputClass}
            />
          </div>

          <input type="hidden" name="country" value="Bangladesh" />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-colors mt-2 disabled:opacity-50 cursor-pointer font-medium shadow-md shadow-indigo-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Redirecting...
              </span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
