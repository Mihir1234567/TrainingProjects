import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import ALL_PRODUCTS from "../components/productsData"; // REMOVED
import CustomCarousel from "../components/product/CustomCarousel";
import QuickViewDrawer from "../components/QuickViewDrawer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ADDED
import { createOrder } from "../api/orderService"; // ADDED
import { SHIPPING_DATA } from "../data/shippingData";
import { useProducts } from "../hooks/useProducts"; // Added for carousel

const CartPage = () => {
  const navigate = useNavigate();
  const { user, openLoginModal } = useAuth(); // Correct place

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const [note, setNote] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Shipping State
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [zipSuccess, setZipSuccess] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Derived state for available provinces based on selected country
  const availableStates = useMemo(() => {
    const country = SHIPPING_DATA.countries.find(
      (c) => c.code === shippingCountry
    );
    return country ? country.states : [];
  }, [shippingCountry]);

  const handleEstimateShipping = () => {
    setZipError("");
    setZipSuccess(false);
    setShippingCost(0);

    if (!shippingCountry) {
      setZipError("Please select a country.");
      return;
    }
    if (!shippingProvince) {
      setZipError("Please select a province/state.");
      return;
    }
    if (!shippingZip) {
      setZipError("Please enter a zip code.");
      return;
    }

    const country = SHIPPING_DATA.countries.find(
      (c) => c.code === shippingCountry
    );
    const state = country?.states.find((s) => s.code === shippingProvince);

    if (state) {
      // Check if the entered zip code exists in the state's zipcodes array
      // We'll do a case-insensitive check and trim whitespace
      const isValid = state.zipcodes.some(
        (z) =>
          z.toLowerCase().replace(/\s/g, "") ===
          shippingZip.toLowerCase().replace(/\s/g, "")
      );

      if (isValid) {
        setZipSuccess(true);
        setShippingCost(state.shippingRate || 0);
      } else {
        setZipError("Invalid zip code for the selected state.");
      }
    } else {
      setZipError("Invalid state selection.");
    }
  };

  // Calculations
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const total = subtotal + shippingCost;

  const freeShippingThreshold = 1000;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleQuantityChange = (id, format, delta) => {
    updateQuantity(id, format, delta);
  };

  const handleRemove = (id, format) => {
    removeFromCart(id, format);
  };

  const handleViewProduct = (product) => navigate(`/product/${product.id}`);

  const handleCheckout = async () => {
    if (!user) {
      openLoginModal();
      return;
    }

    // Existing Checkout Logic (Mock)
    try {
      // Create order in backend
      const orderData = {
        products: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          format: item.format,
          price: item.price,
        })),
        totalAmount: total,
        shippingInfo: {
          address: "123 Test St", // Placeholder
          city: "Test City",
          country: shippingCountry || "USA",
          zipCode: shippingZip || "12345",
        },
      };

      // Call API (Already imported)
      await createOrder(orderData);

      // Clear Cart
      clearCart();

      // Redirect
      navigate("/my-orders"); // or confirmation page
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      {/* MAIN CART CONTENT */}
      <div className="mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1300px] font-sans text-[#1D4A34] w-full">
        {/* PAGE TITLE */}
        <h1 className="text-3xl sm:text-5xl font-serif text-center mb-6">
          Your cart
        </h1>

        {/* FREE SHIPPING BAR */}
        <div className="max-w-xl mx-auto text-center mb-10 px-2">
          <p className="text-gray-500 mb-2 text-sm">
            {amountForFreeShipping > 0
              ? `Spend $${amountForFreeShipping.toFixed(
                  2
                )} more and get free shipping!`
              : "You've unlocked free shipping!"}
          </p>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* PRODUCT HEADER (desktop) */}
        <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_1fr] border-b border-gray-200 pb-3 mb-8 text-xs font-semibold tracking-wider text-gray-500 uppercase">
          <span>Product</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Total</span>
        </div>

        {/* CART ITEMS */}
        <div className="space-y-10 border-b border-gray-200 pb-10 mb-10">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.format}`}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] items-center gap-6"
              >
                {/* PRODUCT INFO */}
                <div className="flex gap-4">
                  <div className="w-24 h-32 sm:h-36 border rounded overflow-hidden bg-gray-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg text-gray-900 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Format: {item.format}
                    </p>

                    {/* REMOVE (desktop) */}
                    <button
                      onClick={() => handleRemove(item.id, item.format)}
                      className="hidden md:block text-xs text-gray-400 underline mt-2 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* QUANTITY CONTROL */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center border rounded px-3 py-1 bg-white">
                    <button
                      className="px-2"
                      onClick={() =>
                        handleQuantityChange(item.id, item.format, -1)
                      }
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="px-2"
                      onClick={() =>
                        handleQuantityChange(item.id, item.format, 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE (mobile) */}
                  <button
                    onClick={() => handleRemove(item.id, item.format)}
                    className="md:hidden text-xs text-gray-400 underline mt-2"
                  >
                    Remove
                  </button>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right font-medium text-[#3AB757] text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* NOTE + SHIPPING */}
        <div className="mb-10">
          {/* NOTE */}
          <div className="mb-10">
            <label className="block text-xs font-bold text-gray-900 uppercase mb-3">
              Add Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add Note"
              className="w-full border rounded p-4 text-sm h-28 resize-none"
            />
          </div>

          {/* SHIPPING ESTIMATOR */}
          <div>
            <p className="text-sm text-gray-500 mb-4">Get shipping estimates</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Country
                </label>
                <select
                  value={shippingCountry}
                  onChange={(e) => {
                    setShippingCountry(e.target.value);
                    setShippingProvince(""); // Reset province when country changes
                    setShippingZip("");
                    setZipError("");
                    setZipSuccess(false);
                    setShippingCost(0);
                  }}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="">Select Country</option>
                  {SHIPPING_DATA.countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Province
                </label>
                <select
                  value={shippingProvince}
                  onChange={(e) => {
                    setShippingProvince(e.target.value);
                    setShippingZip("");
                    setZipError("");
                    setZipSuccess(false);
                    setShippingCost(0);
                  }}
                  className="w-full border rounded px-3 py-2 text-sm"
                  disabled={!shippingCountry}
                >
                  <option value="">Select Province</option>
                  {availableStates.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={shippingZip}
                  onChange={(e) => {
                    setShippingZip(e.target.value);
                    setZipError("");
                    setZipSuccess(false);
                    setShippingCost(0);
                  }}
                  className={`w-full border rounded px-3 py-2 text-sm ${
                    zipError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  placeholder="Enter Zip Code"
                />
              </div>
            </div>

            {/* ESTIMATE BUTTON */}
            <button
              onClick={handleEstimateShipping}
              className="bg-[#1D4A34] text-white text-sm font-bold py-2 px-6 rounded-full hover:bg-[#153626] transition-colors"
            >
              Estimate
            </button>

            {/* ERROR / SUCCESS MESSAGES */}
            <div className="mt-4">
              {zipError && (
                <p className="text-sm text-red-500 font-medium">{zipError}</p>
              )}
              {zipSuccess && (
                <div className="text-sm">
                  <p className="text-green-600 font-medium">Valid Zip Code!</p>
                  <p className="text-[#3AB757] font-bold">
                    Shipping Rate: ${shippingCost.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CHECKOUT BOX — NOW UNDER ESTIMATE */}
        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg w-full mb-16">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-serif">Subtotal</span>
            <span className="text-lg font-serif">
              ${subtotal.toFixed(2)} USD
            </span>
          </div>

          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
            <span className="text-lg font-serif">Shipping</span>
            <span className="text-lg font-serif">
              {shippingCost > 0
                ? `$${shippingCost.toFixed(2)} USD`
                : "$0.00 USD"}
            </span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold font-serif">Total</span>
            <span className="text-xl font-bold font-serif text-[#3AB757]">
              ${total.toFixed(2)} USD
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Taxes calculated at checkout
          </p>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <label htmlFor="terms" className="ml-2 text-sm">
              I agree with the{" "}
              <a href="#" className="underline">
                terms and conditions
              </a>
            </label>
          </div>

          <button
            onClick={handleCheckout}
            disabled={!termsAccepted}
            className={`w-full py-4 rounded-full font-bold text-white ${
              termsAccepted ? "bg-[#3AB757]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Checkout
          </button>

          <div className="flex justify-center mt-6 opacity-75">
            <img
              src="/src/assets/pay.webp"
              className="h-6 w-auto"
              alt="Payment Methods"
            />
          </div>
        </div>

        <QuickViewDrawer
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          product={quickViewProduct}
        />
      </div>

      {/* FULL-WIDTH CAROUSEL */}
      <div className="w-full mt-16 bg-white">
        <ProductsCarouselWrapper
          onViewProduct={handleViewProduct}
          setQuickViewProduct={setQuickViewProduct}
        />
      </div>
    </>
  );
};

// Start Helper Component
const ProductsCarouselWrapper = ({ onViewProduct, setQuickViewProduct }) => {
  const { products } = useProducts();
  const { cart } = useCart();

  // Logic to find related products
  const relatedProducts = useMemo(() => {
    if (!products) return [];

    // 1. Get IDs of items in cart to exclude them
    const cartIds = new Set(cart.map((item) => item.id));

    // 2. Determine target category from the first item in the cart
    let targetCategory = null;
    if (cart.length > 0) {
      // We need to look up the full product details because cart items might not have 'category'
      const firstCartItemFull = products.find((p) => p.id === cart[0].id);
      if (firstCartItemFull) {
        targetCategory = firstCartItemFull.category;
      }
    }

    // 3. Filter and Sort
    let filtered = products.filter((p) => !cartIds.has(p.id));

    if (targetCategory) {
      // Prioritize same category
      filtered.sort((a, b) => {
        const aMatch = a.category === targetCategory ? 1 : 0;
        const bMatch = b.category === targetCategory ? 1 : 0;
        return bMatch - aMatch; // Descending (matches first)
      });
    }

    return filtered.slice(0, 8);
  }, [products, cart]);

  return (
    <CustomCarousel
      title={cart.length > 0 ? "You may also like" : "Popular Titles"}
      products={relatedProducts}
      onViewProduct={onViewProduct}
      showBrowseButton={false}
      titleCenter={true}
      onQuickView={(p) => setQuickViewProduct(p)}
    />
  );
};
// End Helper Component

export default CartPage;
