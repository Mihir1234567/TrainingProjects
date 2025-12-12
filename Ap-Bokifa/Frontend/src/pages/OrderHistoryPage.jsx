import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/orderService";
import { motion } from "framer-motion";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
        // Check API structure: { success: true, count: N, data: [...] }
        if (response.data && response.data.data) {
          setOrders(response.data.data);
        } else if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1D4A34]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F9FA] text-center px-4">
        <div className="text-red-500 text-xl font-medium mb-4">{error}</div>
        <Link
          to="/"
          className="text-[#1D4A34] underline hover:text-[#153e2b] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1D4A34]">Order History</h1>
            <p className="text-gray-500 mt-2">
              Track your past purchases and status.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-medium text-[#1D4A34] hover:underline"
          >
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#1D4A34] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#153e2b] transition-all transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wide">
                        Order Placed
                      </span>
                      <span className="font-medium text-gray-900">
                        {new Date(order.dateOrdered).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wide">
                        Total Amount
                      </span>
                      <span className="font-medium text-[#1D4A34]">
                        ${order.totalAmount?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500 text-xs uppercase tracking-wide">
                        Order ID
                      </span>
                      <span className="font-mono text-gray-600">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  {order.products.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0"
                    >
                      <img
                        src={item.product?.imageUrl || "/placeholder-book.png"}
                        alt={item.product?.title || "Product"}
                        className="w-16 h-24 object-cover rounded shadow-sm bg-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 font-medium truncate">
                          {item.product?.title || "Unknown Product"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.product?.author || "Unknown Author"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Qty: {item.quantity} | Format:{" "}
                          {item.format || "Standard"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">
                          ${(item.price || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
