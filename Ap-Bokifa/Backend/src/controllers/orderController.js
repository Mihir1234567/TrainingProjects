import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingInfo, note } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No products in order" });
    }

    const order = new Order({
      user: req.user._id, // Assumes auth middleware populates req.user
      products,
      totalAmount,
      shippingInfo,
      note,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      data: savedOrder,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Optional: Get User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "title imageUrl author")
      .sort({
        dateOrdered: -1,
      });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
