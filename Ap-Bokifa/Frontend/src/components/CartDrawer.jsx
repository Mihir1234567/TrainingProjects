import React, { useState, useMemo } from "react";
import { X, Minus, Plus, Edit, Truck, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { SHIPPING_DATA } from "../data/shippingData";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { currency } = useCurrency();

  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [showShipping, setShowShipping] = useState(false);

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState("US"); // Default to US for demo
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMessage, setShippingMessage] = useState("");

  // Derived state for available provinces
  const availableStates = useMemo(() => {
    const country = SHIPPING_DATA.countries.find(
      (c) => c.code === shippingCountry
    );
    return country ? country.states : [];
  }, [shippingCountry]);

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const freeShippingThreshold = 1000; // Example threshold from image
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleEstimateShipping = () => {
    setShippingMessage("");
    setShippingCost(0);

    if (!shippingCountry || !shippingProvince || !shippingZip) {
      setShippingMessage("Please fill in all fields.");
      return;
    }

    const country = SHIPPING_DATA.countries.find(
      (c) => c.code === shippingCountry
    );
    const state = country?.states.find((s) => s.code === shippingProvince);

    if (state) {
      const isValid = state.zipcodes.some(
        (z) =>
          z.toLowerCase().replace(/\s/g, "") ===
          shippingZip.toLowerCase().replace(/\s/g, "")
      );

      if (isValid) {
        setShippingCost(state.shippingRate || 0);
        setShippingMessage(
          `There is one shipping rate for your address: Standard: $${(
            state.shippingRate || 0
          ).toFixed(2)}`
        );
      } else {
        setShippingMessage("No shipping rates found for this address.");
      }
    } else {
      setShippingMessage("Invalid state selection.");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2, // Wait for drawer to slide in a bit
      },
    },
  };

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 font-serif text-xl text-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span>
              {cart.reduce((acc, item) => acc + item.quantity, 0)} item
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8">
          {/* Free Shipping Bar */}
          <div className="text-center space-y-3">
            <p className="text-base text-slate-700">
              {amountForFreeShipping > 0 ? (
                <>
                  Spend{" "}
                  <span className="font-bold">
                    ${amountForFreeShipping.toFixed(2)}
                  </span>{" "}
                  more and get free shipping!
                </>
              ) : (
                "You've unlocked free shipping!"
              )}
            </p>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Cart Items */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
          >
            {cart.length === 0 ? (
              <motion.p
                variants={itemVariants}
                className="text-center text-gray-500 py-10 text-lg"
              >
                Your cart is empty.
              </motion.p>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.format}`}
                  variants={itemVariants}
                  className="flex gap-5 group"
                >
                  <div className="w-24 h-36 shrink-0 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-slate-900 leading-tight pr-2 text-lg">
                        {item.title}
                      </h4>
                      <span className="font-bold text-[#027A36] text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {item.format}
                      {item.discount > 0 && (
                        <span className="ml-1 text-red-500">
                          (-{item.discount}%)
                        </span>
                      )}
                    </p>
                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.format, -1)
                          }
                          className="p-2 hover:bg-gray-50 text-gray-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-base text-gray-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.format, 1)
                          }
                          className="p-2 hover:bg-gray-50 text-gray-500"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.format)}
                        className="text-sm text-gray-400 underline hover:text-red-500"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-5 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative">
          {/* Action Toggles */}
          <div className="flex gap-8 text-base font-medium text-slate-700 mb-5">
            <button
              onClick={() => {
                setShowNote(!showNote);
                setShowShipping(false);
              }}
              className={`flex items-center gap-2 transition-colors ${
                showNote
                  ? "text-black font-bold"
                  : "hover:text-[#027A36] underline decoration-gray-300 underline-offset-4"
              }`}
            >
              <Edit size={18} />
              Add note
            </button>
            <button
              onClick={() => {
                setShowShipping(!showShipping);
                setShowNote(false);
              }}
              className={`flex items-center gap-2 transition-colors ${
                showShipping
                  ? "text-black font-bold"
                  : "hover:text-[#027A36] underline decoration-gray-300 underline-offset-4"
              }`}
            >
              <Truck size={18} />
              Shipping
            </button>
          </div>

          {/* Main Footer Content (Subtotal & Buttons) */}
          <div
            className={`space-y-5 transition-opacity duration-200 ${
              showNote || showShipping
                ? "opacity-0 invisible"
                : "opacity-100 visible"
            }`}
          >
            {/* Totals */}
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-2xl font-medium text-slate-900 font-serif">
                  Subtotal:
                </span>
                <span className="text-3xl font-bold text-slate-900">
                  ${subtotal.toFixed(2)} USD
                </span>
              </div>
              <p className="text-sm text-gray-500 italic">
                Taxes and shipping calculated at checkout
              </p>
            </div>

            {/* Disclaimer Marquee */}
            <div className="border-t border-dashed border-gray-200 pt-3 overflow-hidden">
              <p className="text-sm text-gray-500 leading-relaxed animate-marquee">
                All charges are billed in USD. While the content of your cart is
                currently displayed in VND, the checkout will use USD at the
                most current exchange rate.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button className="w-full bg-[#027A36] hover:bg-black text-white font-bold py-4 rounded-full transition-colors uppercase tracking-widest text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                Checkout
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full bg-[#027A36] hover:bg-black text-white font-bold py-4 rounded-full transition-colors uppercase tracking-widest text-base text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Overlays */}
          {/* Note Overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 top-[4rem] bg-white p-5 z-10 transition-all duration-300 transform ${
              showNote
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full flex flex-col space-y-4">
              <label className="text-sm font-bold uppercase text-slate-900 tracking-wider">
                Add Order Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="How can we help you?"
                className="flex-1 w-full border border-gray-300 rounded-lg p-4 text-base focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none bg-gray-50"
              />
              <button
                onClick={() => setShowNote(false)}
                className="w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-colors uppercase text-sm tracking-widest"
              >
                Save
              </button>
            </div>
          </div>

          {/* Shipping Overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 top-[4rem] bg-white p-5 z-10 transition-all duration-300 transform ${
              showShipping
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full flex flex-col space-y-4 overflow-y-auto">
              <h3 className="text-sm font-bold uppercase text-slate-900 tracking-wider mb-1">
                Get Shipping Estimates
              </h3>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="text-sm text-gray-500 block mb-1.5 font-medium">
                    Country
                  </label>
                  <select
                    value={shippingCountry}
                    onChange={(e) => {
                      setShippingCountry(e.target.value);
                      setShippingProvince("");
                    }}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-base bg-white focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Country</option>
                    {SHIPPING_DATA.countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1.5 font-medium">
                    Province
                  </label>
                  <select
                    value={shippingProvince}
                    onChange={(e) => setShippingProvince(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-base bg-white focus:ring-1 focus:ring-black outline-none"
                    disabled={!shippingCountry}
                  >
                    <option value="">Select Province</option>
                    {availableStates.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1.5 font-medium">
                    Zip code
                  </label>
                  <input
                    type="text"
                    value={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-3 text-base focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
                {shippingMessage && (
                  <div className="p-4 bg-gray-50 rounded text-sm text-slate-700 border border-gray-100">
                    {shippingMessage}
                  </div>
                )}
              </div>

              <button
                onClick={handleEstimateShipping}
                className="w-full bg-[#027A36] text-white font-bold py-4 rounded-full hover:bg-black transition-colors uppercase text-sm tracking-widest mt-auto"
              >
                Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
