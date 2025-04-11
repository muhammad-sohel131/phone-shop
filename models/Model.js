const { Type } = require('lucide-react');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const phoneSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  rating: { type: Number },
  image: { type: String },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  description: { type: String },
  releaseDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  specs: {
    display: { type: String },
    resolution: { type: String },
    processor: { type: String },
    variants: [{ type: Object }],
    battery: { type: String },
    os: { type: String },
    weight: { type: String },
    dimensions: { type: String },
    camera: { type: Object },
    features: { type: Object },
    colors: [{ type: Object }]
  }
});

// Cart Schema
const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
  updatedAt: { type: Date, default: Date.now }
});

// CartItem Schema
const cartItemSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  phoneId: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
  quantity: { type: Number, required: true },
  color: { type: String },
  storage: { type: String }
});

// Order Schema
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"], default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

// OrderItem Schema
const orderItemSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  phoneId: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
  quantity: { type: Number, required: true },
  color: { type: String },
  storage: { type: String },
  price: { type: Number, required: true }
});

// Review Schema
const reviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phoneId: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
  rating: { type: Number, required: true },
  title: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  helpfulCount: { type: Number, default: 0 }
});

// Wishlist Schema
const wishlistSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  phoneIds: [{ type: Schema.Types.ObjectId, ref: 'Phone' }],
  createdAt: { type: Date, default: Date.now }
});

// Discussion Schema
const discussionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 }
});

// Reply Schema
const replySchema = new Schema({
  discussionId: { type: Schema.Types.ObjectId, ref: 'Discussion', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  helpfulCount: { type: Number, default: 0 }
});

// Notification Schema
const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ["ORDER_UPDATE", "NEW_PHONE", "DISCOUNT", "REVIEW_REPLY"], required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Analytics Schema
const analyticsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ["VIEW_PHONE", "ADD_TO_CART", "PURCHASE", "WRITE_REVIEW"], required: true },
  phoneId: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
  timestamp: { type: Date, default: Date.now }
});

// Models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema);
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
const OrderItem = mongoose.models.OrderItem || mongoose.model('OrderItem', orderItemSchema);
const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
const Discussion = mongoose.models.Discussion || mongoose.model('Discussion', discussionSchema);
const Reply = mongoose.models.Reply || mongoose.model('Reply', replySchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);

module.exports = {
  User,
  Phone,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Wishlist,
  Discussion,
  Reply,
  Notification,
  Analytics
};