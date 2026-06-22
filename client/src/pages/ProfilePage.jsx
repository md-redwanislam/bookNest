import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [order, setOrder] = useState([]);
  const { api } = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/order/get-my-orders`,
        );
        setOrder(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <>
        <>
          <title>My Orders | BookNest</title>

          <meta
            name="description"
            content="View and manage your order history, track purchases, and review previous book orders at BookNest."
          />

          <link
            rel="canonical"
            href={`${import.meta.env.VITE_CLIENT_URL}/profile`}
          />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="My Orders | BookNest" />
          <meta
            property="og:description"
            content="View your order history and purchase details."
          />
          <meta
            property="og:url"
            content={`${import.meta.env.VITE_CLIENT_URL}/profile`}
          />

          {/* Twitter/X */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="My Orders | BookNest" />
          <meta
            name="twitter:description"
            content="Manage your BookNest order history."
          />

          {/* Important */}
          <meta name="robots" content="noindex,nofollow,noarchive,nosnippet" />
        </>
      </>
      <div className="max-w-5xl mx-auto">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-2xl font-semibold text-slate-900">
            Order History
          </h3>
          <p className="text-[15px] text-slate-600 mt-3">
            Easily view and manage all your previous orders.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {order?.length > 0 ? (
            order.map((item) => (
              <div
                key={item._id}
                className="border border-gray-300 rounded-md p-6"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <span className="text-sm text-white px-3 py-1.5 bg-green-600 rounded-md">
                      {item.orderStatus}
                    </span>
                    <p className="text-[15px] text-slate-600 mt-6">
                      Order ID: <span>#{item._id.slice(0, 10)} </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <h4 className="text-md text-slate-900 font-semibold mt-6">
                      Total items {item.items.length}
                    </h4>
                    <h4 className="text-md text-slate-900 font-semibold mt-6">
                      ${Number(item.totalAmount).toFixed(2)}
                    </h4>
                  </div>
                </div>
                <hr className="my-4 border-gray-300" />
                {item.items.map((product) => (
                  <div key={product.book._id} className="space-y-4">
                    <div className="grid sm:grid-cols-3 gap-6 items-center">
                      <div className="sm:col-span-2">
                        <div className="flex sm:items-center gap-4 max-sm:flex-col">
                          <div className="w-24 h-24 shrink-0">
                            <img
                              src={product.book.coverImage}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="max-w-md">
                            <h3 className="text-base font-medium text-slate-900">
                              {product.book.title} by
                              <span> {product.book.author} </span>
                            </h3>
                            <h3 className="text-base font-semibold text-slate-900 mt-2">
                              ${product.book.price} * {product.quantity}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
