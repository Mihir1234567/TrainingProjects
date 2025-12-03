# Architecture & Flow Diagrams

## 🏗️ Component Architecture

```
App.jsx
├── Router Configuration
│   └── Route: /product/:productId → ProductDetailPage
│
└── ProductDetailPage.jsx (NEW)
    ├── State Management
    │   ├── product (from URL param)
    │   ├── selectedFormat
    │   ├── quantity
    │   ├── isWishlisted
    │   └── isLoading
    │
    ├── Hooks Used
    │   ├── useParams() → Get productId
    │   ├── useNavigate() → Back button
    │   └── useRecentlyViewed() → Track views
    │
    └── UI Sections
        ├── Header (Back Navigation)
        ├── Image Section (Left)
        │   ├── Product Image
        │   ├── Discount Badge
        │   └── Sold Out Overlay
        │
        ├── Details Section (Right)
        │   ├── Category Badge
        │   ├── Title & Author
        │   ├── Star Ratings
        │   ├── Price Display
        │   ├── Format Selector
        │   ├── Quantity Control
        │   ├── Action Buttons
        │   ├── Wishlist Button
        │   └── Social Buttons
        │
        ├── Description Section
        └── Details Section
            ├── Information Grid
            └── Availability Info
```

---

## 🔄 Data Flow Diagram

```
productsData.js
    │
    ├─ ALL_PRODUCTS Array
    │  ├─ id: 1
    │  ├─ title: "Product Name"
    │  ├─ author: "Author Name"
    │  ├─ price: 299.95
    │  ├─ discount: 15
    │  ├─ imageUrl: "..."
    │  └─ ... other properties
    │
    ↓
ProductCard Component (on Home/Collection)
    │
    ├─ User clicks card
    │
    ├─ onClick Handler:
    │  ├─ Call: onViewProduct(product)
    │  │   └─ Tracked in Recently Viewed
    │  │
    │  └─ navigate(/product/{id})
    │
    ↓
URL Changes: /product/1
    │
    ↓
ProductDetailPage Route Activates
    │
    ├─ useParams() extracts productId
    │
    ├─ useEffect() finds product in ALL_PRODUCTS
    │
    ├─ addRecentlyViewed(product)
    │
    └─ Component renders with product data
```

---

## 🎯 User Interaction Flow

```
START: User Views Home/Collection Page
    │
    ├─ Sees Product Cards
    │  (Rendered from ProductCarousel)
    │
    │ User Action: Click on Product Card
    │
    ├─ ProductCard onClick Triggered
    │
    ├─ [Parallel Actions]
    │  ├─ onViewProduct callback fired
    │  │   └─ Product added to Recently Viewed
    │  │
    │  └─ navigate(`/product/${productId}`)
    │      └─ URL changes to /product/1
    │
    ├─ Browser navigates to new URL
    │
    ├─ React Router matches /product/:productId
    │
    ├─ ProductDetailPage component mounts
    │
    ├─ useParams() extracts productId from URL
    │
    ├─ useEffect() runs:
    │  ├─ Searches ALL_PRODUCTS for matching id
    │  ├─ Sets product state
    │  ├─ Calls addRecentlyViewed(product)
    │  └─ Sets loading to false
    │
    ├─ Component renders with full details
    │
    └─ User sees Product Detail Page
       ├─ Product image
       ├─ Title, author, rating
       ├─ Price & stock status
       ├─ Format selector
       ├─ Quantity control
       ├─ Action buttons
       └─ Product specifications
```

---

## 📊 State Management

```
ProductDetailPage Component State:

┌─ product: Object
│  ├─ id: number
│  ├─ title: string
│  ├─ author: string
│  ├─ price: number
│  ├─ discount: number
│  ├─ rating: number
│  ├─ reviewCount: number
│  ├─ imageUrl: string
│  ├─ isSoldOut: boolean
│  ├─ category: string
│  ├─ format: string
│  └─ description: string
│
├─ selectedFormat: string
│  └─ Updated when user clicks format button
│
├─ quantity: number
│  └─ Updated by +/- buttons or input
│
├─ isWishlisted: boolean
│  └─ Toggled by wishlist button
│
└─ isLoading: boolean
   └─ Set to false after product found
```

---

## 🔗 Routing Flow

```
App.jsx Routes:
│
├─ / → Home
├─ /leftSidebar → BookstorePage
├─ /collections/categories → CategoryLanding
├─ /collections/books → CollectionsBooks
├─ /productPageClassic → ProductLayoutClassic
├─ /productPageScrollFixed → ProductLayoutScrollFixed
├─ /productPageLeftThumbs → ProductLayoutLeftThumbs
├─ /productPageRightThumbs → ProductLayoutRightThumbs
├─ /productPageWithoutThumbs → ProductLayoutWithoutThumbs
├─ /typeWithVideo → TypeWithVideo
│
└─ /product/:productId → ProductDetailPage ← NEW
   │
   └─ Example URLs:
      ├─ /product/1
      ├─ /product/2
      ├─ /product/3
      └─ /product/N
```

---

## 🎨 UI Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                           │
│ < Back Button                                                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬─────────────────────────────────┐
│                              │ Category Badge                  │
│                              │ Product Title                   │
│                              │ by Author Name                  │
│                              │ ⭐ 4.5 (127 reviews)           │
│                              │                                 │
│     PRODUCT IMAGE            │ Price: ₹299.95                 │
│     (500x600px)              │ Original: ₹400                 │
│                              │ Discount: -15%                │
│   ┌─────────────┐           │ Stock: In Stock                │
│   │ -15% Badge  │           │                                │
│   └─────────────┘           │ Format:                        │
│                              │ [Hardcover] [Paperback] [eBook]│
│                              │                                 │
│                              │ Quantity: [−] 1 [+]            │
│                              │                                 │
│                              │ [Add to Cart Button]           │
│                              │ [Buy Now Button]               │
│                              │ [Add to Wishlist Button]       │
│                              │                                 │
│                              │ Share:                        │
│                              │ [f] [𝕏] [P] [in]              │
└──────────────────────────────┴─────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ DESCRIPTION SECTION                                             │
│ About this book                                                │
│ Lorem ipsum dolor sit amet...                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PRODUCT DETAILS                                                 │
│ ┌─────────────────────────────┬─────────────────────────────┐ │
│ │ Information                 │ Availability                │ │
│ │ Title: The Wedding People   │ Status: In Stock            │ │
│ │ Author: Alice Hoffman       │ Discount: -15%              │ │
│ │ Category: Fiction           │ Rating: 4.5/5               │ │
│ │ Format: Hardcover           │                             │ │
│ │ Price: ₹299.95             │                             │ │
│ └─────────────────────────────┴─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Event Handlers

```
ProductDetailPage Event Handlers:

1. handleCardClick() [ProductCard]
   │
   ├─ onViewProduct(product)
   │  └─ Calls addRecentlyViewed hook
   │
   └─ navigate(`/product/${product.id}`)
      └─ Router changes URL

2. handleAddToCart() [Detail Page]
   │
   ├─ Validates format & quantity
   │
   └─ [To be connected to cart logic]

3. handleBuyNow() [Detail Page]
   │
   ├─ Validates format & quantity
   │
   └─ [To be connected to checkout]

4. Quantity Controls
   │
   ├─ handleDecrement()
   │  └─ setQuantity(max(1, quantity - 1))
   │
   ├─ handleIncrement()
   │  └─ setQuantity(quantity + 1)
   │
   └─ handleInputChange()
      └─ setQuantity(number)

5. Format Selection
   │
   └─ setSelectedFormat(format)
      └─ Updates on button click

6. Wishlist Toggle
   │
   └─ setIsWishlisted(!isWishlisted)
      └─ Toggles heart icon state
```

---

## 📱 Responsive Breakpoints

```
Mobile (xs) - < 640px
│
├─ Single column layout
├─ Image takes full width
├─ Details section below
└─ Buttons: Full width

Tablet (md) - 640px to 1024px
│
├─ Two columns starting at md:
├─ Image left (33%)
├─ Details right (67%)
├─ Buttons: Full width in details
└─ Adjusted spacing/padding

Desktop (lg) - > 1024px
│
├─ Full two column grid
├─ Image left (50%)
├─ Details right (50%)
├─ Optimal spacing
└─ Comfortable reading widths
```

---

## 🎯 Component Props & State Summary

### ProductCard Props:

```javascript
{
  product: {
    id: number,
    title: string,
    author: string,
    price: number,
    // ... other product properties
  },
  onViewProduct: function,
  variant: "default" | "small"
}
```

### ProductDetailPage Internal State:

```javascript
{
  product: ProductObject | null,
  selectedFormat: string,
  isWishlisted: boolean,
  quantity: number,
  isLoading: boolean
}
```

---

## 🔀 URL Parameter Flow

```
User clicks: /product/1
    │
    ↓
URL Pattern Matches: /product/:productId
    │
    ↓
useParams() returns: { productId: "1" }
    │
    ↓
parseInt(productId) = 1
    │
    ↓
ALL_PRODUCTS.find(p => p.id === 1)
    │
    ↓
Returns: Product object with id=1
    │
    ↓
Component state updated
    │
    ↓
Page renders with product data
```

---

## 📋 Integration Checklist

```
✅ ProductDetailPage.jsx created
✅ Import added to App.jsx
✅ Route added to App.jsx
✅ ProductCard.jsx updated with navigation
✅ useRecentlyViewed integration
✅ URL parameter handling
✅ Error handling (product not found)
✅ Responsive design
✅ All styling complete
✅ Social share buttons included
✅ Wishlist functionality
✅ Quantity controls
✅ Format selection
✅ Add to Cart button
✅ Buy Now button
✅ Back navigation
```

This completes the product detail page implementation architecture!
