# Product Detail Page - Testing & Verification Guide

## 🧪 Complete Testing Guide

---

## Phase 1: Basic Navigation Testing

### Test 1.1: Click Product Card from Home Page

**Steps:**

1. Navigate to home page (/)
2. Locate any product card in "This week's highlights" carousel
3. Click on the product card

**Expected Result:**

-   ✅ Page navigates to `/product/{id}` (check URL bar)
-   ✅ Product detail page loads
-   ✅ No console errors
-   ✅ Product information displays

**Debug if fails:**

-   Check App.jsx has route `/product/:productId`
-   Check ProductCard.jsx has `useNavigate` hook
-   Check ProductDetailPage.jsx is imported in App.jsx

---

### Test 1.2: Click Product Card from Collections

**Steps:**

1. Navigate to Collections (/collections/books)
2. Click on any product card
3. Verify navigation

**Expected Result:**

-   ✅ Routes to product detail page
-   ✅ Product data displays correctly
-   ✅ Same component used for all sources

---

### Test 1.3: Click Product Card from Category

**Steps:**

1. Navigate to Category Landing
2. Click on product card
3. Verify navigation

**Expected Result:**

-   ✅ Routes to product detail page
-   ✅ Works across all page sources

---

## Phase 2: Data Display Testing

### Test 2.1: Product Image

**Steps:**

1. On product detail page
2. Observe the product image section

**Expected Result:**

-   ✅ Image displays in large format
-   ✅ Correct product image shows
-   ✅ Image is properly centered
-   ✅ Aspect ratio maintained (2:3)

**Check:**

```
Is image URL: product.imageUrl ✓
Is size correct: w-full aspect-[2/3] ✓
```

---

### Test 2.2: Product Information

**Steps:**

1. On product detail page
2. Check all text information

**Expected Result:**

-   ✅ Title displays correctly
-   ✅ Author name shows
-   ✅ Category badge visible
-   ✅ Price shows correctly
-   ✅ Original price shows (if discounted)
-   ✅ Discount percentage badge visible (if applicable)
-   ✅ Star rating displays
-   ✅ Review count shows
-   ✅ Stock status shows (In Stock / Out of Stock)

**Verify data:**

```
Title: product.title ✓
Author: product.author ✓
Category: product.category ✓
Price: ₹{product.price} ✓
Discount: {product.discount}% ✓
Rating: {product.rating}/5 ✓
Reviews: ({product.reviewCount}) ✓
Stock: {product.isSoldOut ? "Out of Stock" : "In Stock"} ✓
```

---

### Test 2.3: Discount Badge

**Steps:**

1. Navigate to product with discount (e.g., product id 1)
2. Verify discount badge

**Expected Result:**

-   ✅ Badge shows only if product.discount exists
-   ✅ Badge displays correct percentage
-   ✅ Badge positioned in top-left
-   ✅ Red background with white text

**Test with:**

-   Product with discount (should show)
-   Product without discount (should not show)

---

### Test 2.4: Sold Out Overlay

**Steps:**

1. Find product with isSoldOut: true
2. Navigate to its detail page

**Expected Result:**

-   ✅ Semi-transparent overlay appears
-   ✅ "SOLD OUT" text displays in center
-   ✅ Image still visible behind overlay
-   ✅ Buttons disabled

---

## Phase 3: Interactive Controls Testing

### Test 3.1: Format Selection

**Steps:**

1. On product detail page
2. Click each format button
3. Observe state change

**Expected Result:**

-   ✅ Hardcover button selectable
-   ✅ Paperback button selectable
-   ✅ eBook button selectable
-   ✅ Only one format selected at a time
-   ✅ Selected format highlighted (dark background)
-   ✅ Unselected formats have light border
-   ✅ selectedFormat state updates

---

### Test 3.2: Quantity Controls

**Steps:**

1. On product detail page
2. Test increment button (+ button)
3. Test decrement button (- button)
4. Test direct input

**Expected Result - Increment:**

-   ✅ Quantity increases by 1
-   ✅ Value updates in display
-   ✅ Can increment to any number

**Expected Result - Decrement:**

-   ✅ Quantity decreases by 1
-   ✅ Minimum quantity is 1 (doesn't go below)
-   ✅ Value updates in display

**Expected Result - Direct Input:**

-   ✅ Can type number directly
-   ✅ Invalid/negative numbers converted to 1
-   ✅ Updates on blur or Enter

```javascript
// Verify logic:
- Decrement: setQuantity(Math.max(1, quantity - 1)) ✓
- Increment: setQuantity(quantity + 1) ✓
- Input: setQuantity(Math.max(1, parseInt(e.target.value) || 1)) ✓
```

---

### Test 3.3: Wishlist Toggle

**Steps:**

1. On product detail page
2. Click "Add to Wishlist" button
3. Observe changes
4. Click again to toggle

**Expected Result - First Click:**

-   ✅ Button text changes to "Added to Wishlist"
-   ✅ Heart icon fills with red
-   ✅ Button background changes to light red
-   ✅ Button border turns red

**Expected Result - Second Click:**

-   ✅ Button text reverts to "Add to Wishlist"
-   ✅ Heart icon becomes outline (not filled)
-   ✅ Button background reverts
-   ✅ Button border returns to gray

---

## Phase 4: Action Button Testing

### Test 4.1: Add to Cart Button

**Steps:**

1. On product detail page
2. Select format (optional, defaults to first)
3. Set quantity
4. Click "Add to Cart"

**Expected Result:**

-   ✅ Button is clickable
-   ✅ Console logs message with product name and quantity
-   ✅ Button disabled if product isSoldOut
-   ✅ Button shows disabled styling

**Log Example:**

```
"Added 2 of "The Wedding People" to cart"
```

**To Connect:**
Open ProductDetailPage.jsx, find handleAddToCart():

```javascript
const handleAddToCart = () => {
    // Replace console.log with your cart logic:
    // - Add to Redux store
    // - Send to backend
    // - Update local state
    // Example:
    // dispatch(addToCart({
    //     productId: product.id,
    //     quantity: quantity,
    //     format: selectedFormat
    // }));
};
```

---

### Test 4.2: Buy Now Button

**Steps:**

1. On product detail page
2. Set format and quantity
3. Click "Buy Now"

**Expected Result:**

-   ✅ Button is clickable
-   ✅ Console logs message
-   ✅ Button disabled if product isSoldOut
-   ✅ Has secondary styling (outline)

**To Connect:**

```javascript
const handleBuyNow = () => {
    // Add your checkout flow here
    // Example:
    // navigate('/checkout', {
    //     state: { productId, quantity, format }
    // });
};
```

---

## Phase 5: Navigation Testing

### Test 5.1: Back Button

**Steps:**

1. Navigate from home to product detail
2. Click "Back" button on detail page
3. Verify navigation

**Expected Result:**

-   ✅ Returns to previous page
-   ✅ Page scroll position preserved (if browser default)
-   ✅ No console errors

**Debug:**
Check button uses `useNavigate()` and `navigate(-1)`

---

### Test 5.2: Direct URL Access

**Steps:**

1. Type directly in URL bar: `/product/1`
2. Press Enter

**Expected Result:**

-   ✅ Product detail page loads
-   ✅ Correct product displays
-   ✅ No navigation needed

**Test with different IDs:**

-   `/product/1` → Should show product with id 1
-   `/product/5` → Should show product with id 5
-   `/product/999` → Should redirect to home (product not found)

---

### Test 5.3: Product Not Found

**Steps:**

1. Navigate to `/product/9999` (non-existent product)
2. Observe behavior

**Expected Result:**

-   ✅ Redirects to home page (/)
-   ✅ No errors in console
-   ✅ Graceful error handling

---

## Phase 6: Recently Viewed Integration

### Test 6.1: Product Added to Recently Viewed

**Steps:**

1. Click product card from home
2. Navigate to detail page
3. Check Recently Viewed sidebar
4. Refresh page
5. Check sidebar again

**Expected Result:**

-   ✅ Product appears in Recently Viewed after visiting detail page
-   ✅ Product persists in sidebar after page refresh
-   ✅ Correct product shows (title, image, etc.)

---

## Phase 7: Responsive Design Testing

### Test 7.1: Mobile View (< 640px)

**Steps:**

1. Open browser DevTools
2. Set viewport to 375px width
3. Navigate to product detail page
4. Observe layout

**Expected Result:**

-   ✅ Single column layout
-   ✅ Image stacks above details
-   ✅ Buttons full width
-   ✅ Text readable
-   ✅ All controls accessible
-   ✅ No horizontal scroll

**Test Elements:**

-   [ ] Product image
-   [ ] Product title
-   [ ] Format selector
-   [ ] Quantity controls
-   [ ] Buttons
-   [ ] Product details section

---

### Test 7.2: Tablet View (640px - 1024px)

**Steps:**

1. Set viewport to 768px width
2. Observe layout

**Expected Result:**

-   ✅ Two column layout
-   ✅ Image on left (~50%)
-   ✅ Details on right (~50%)
-   ✅ Proper spacing
-   ✅ All content visible

---

### Test 7.3: Desktop View (> 1024px)

**Steps:**

1. Set viewport to 1440px width
2. Observe layout

**Expected Result:**

-   ✅ Full two column grid
-   ✅ Large product image
-   ✅ Comfortable details panel
-   ✅ All buttons properly sized
-   ✅ No layout issues

---

## Phase 8: Accessibility Testing

### Test 8.1: Keyboard Navigation

**Steps:**

1. On product detail page
2. Press Tab repeatedly
3. Navigate through all interactive elements

**Expected Result:**

-   ✅ Tab focuses format buttons
-   ✅ Tab focuses quantity buttons
-   ✅ Tab focuses Add to Cart button
-   ✅ Tab focuses Buy Now button
-   ✅ Tab focuses Wishlist button
-   ✅ Tab focuses social share buttons
-   ✅ Tab focuses back button

---

### Test 8.2: Focus Indicators

**Steps:**

1. Click on each interactive element
2. Verify focus styling

**Expected Result:**

-   ✅ All buttons show focus ring
-   ✅ Focus ring is visible and distinct
-   ✅ Focus management works

---

## Phase 9: Browser Compatibility

### Test 9.1: Chrome

-   [ ] Page loads correctly
-   [ ] All features work
-   [ ] No console errors

### Test 9.2: Firefox

-   [ ] Page loads correctly
-   [ ] All features work
-   [ ] No console errors

### Test 9.3: Safari

-   [ ] Page loads correctly
-   [ ] All features work
-   [ ] No console errors

### Test 9.4: Edge

-   [ ] Page loads correctly
-   [ ] All features work
-   [ ] No console errors

---

## Phase 10: Performance Testing

### Test 10.1: Load Time

**Steps:**

1. Open DevTools Network tab
2. Navigate to product detail page
3. Check load time

**Expected Result:**

-   ✅ Page loads in < 2 seconds
-   ✅ No major resource bottlenecks

---

### Test 10.2: Image Performance

**Steps:**

1. Check image file sizes
2. Verify images load correctly
3. Check for missing images

**Expected Result:**

-   ✅ Images load quickly
-   ✅ No broken image links
-   ✅ Proper image formats

---

## 🐛 Debug Checklist

### If Product Card Click Doesn't Navigate:

-   [ ] Check browser console for errors
-   [ ] Verify ProductCard.jsx has `useNavigate` import
-   [ ] Verify handleCardClick function exists
-   [ ] Verify navigate call is correct: `navigate(/product/${product.id})`
-   [ ] Check App.jsx has `/product/:productId` route
-   [ ] Clear browser cache and hard refresh

### If Product Detail Page Doesn't Load:

-   [ ] Check URL is `/product/{number}`
-   [ ] Verify productId exists in ALL_PRODUCTS
-   [ ] Check ProductDetailPage.jsx is imported in App.jsx
-   [ ] Check browser console for errors
-   [ ] Verify useParams() is being called

### If Data Doesn't Display:

-   [ ] Check product object is not null
-   [ ] Verify ALL_PRODUCTS has correct data
-   [ ] Check console.log(product) to see actual object
-   [ ] Verify JSX matches product properties

### If Buttons Don't Work:

-   [ ] Check handleAddToCart function is defined
-   [ ] Check handleBuyNow function is defined
-   [ ] Click button and check console output
-   [ ] Verify onClick handlers are properly bound

### If Navigation Has Issues:

-   [ ] Check useNavigate hook is imported
-   [ ] Verify navigate() is being called correctly
-   [ ] Check React Router setup in App.jsx
-   [ ] Clear browser history if needed

---

## ✅ Final Sign-Off Checklist

-   [ ] All Phase 1-10 tests pass
-   [ ] No console errors
-   [ ] No console warnings
-   [ ] Product images display
-   [ ] All buttons clickable
-   [ ] Navigation works
-   [ ] Responsive on mobile/tablet/desktop
-   [ ] Keyboard navigation works
-   [ ] Recently viewed tracks product
-   [ ] Graceful error handling
-   [ ] Ready for production

---

## 📊 Test Result Template

```markdown
## Product Detail Page Test Results

**Date**: ****\_\_\_****
**Tester**: ****\_\_\_****
**Browser**: ****\_\_\_****
**Device**: ****\_\_\_****

### Phase 1: Navigation

-   [ ] PASS: Product card click
-   [ ] PASS: Collections click
-   [ ] PASS: Category click

### Phase 2: Data Display

-   [ ] PASS: Image displays
-   [ ] PASS: Title correct
-   [ ] PASS: Price correct
-   [ ] PASS: Discount badge
-   [ ] PASS: Rating displays

### Phase 3: Interactive Controls

-   [ ] PASS: Format selection
-   [ ] PASS: Quantity controls
-   [ ] PASS: Wishlist toggle

### Phase 4: Action Buttons

-   [ ] PASS: Add to Cart
-   [ ] PASS: Buy Now

### Phase 5-10: Other Tests

-   [ ] PASS: Navigation
-   [ ] PASS: Recently Viewed
-   [ ] PASS: Responsive
-   [ ] PASS: Accessibility
-   [ ] PASS: Browser compatibility
-   [ ] PASS: Performance

### Overall Result: ✅ PASS / ❌ FAIL

### Notes:

---
```

---

**Testing Guide Complete!**

Use this guide to thoroughly test the product detail page implementation.
