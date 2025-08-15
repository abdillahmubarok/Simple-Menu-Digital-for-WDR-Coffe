# **App Name**: WDR Coffee Digital Menu

## Core Features:

- Interactive Menu: Display interactive digital menu with categorized items (Coffee, Non-Coffee, Snacks, Add-ons) pulled from local data.
- Local Cart Persistence: Shopping cart functionality with item quantity adjustments and optional notes, saved locally to the browser.
- Checkout Form: Checkout form for customer name and Indonesian phone number with validation.
- WhatsApp Order Submission: Generates a pre-formatted WhatsApp message with order details, customer info, and table number (if available), redirecting the user to WhatsApp to send the message.
- Persistent Cart: Utilizes localStorage for persistent storage of the shopping cart, ensuring data is retained across sessions until checkout.
- Real-time Calculation: Dynamically updates the shopping cart total and item subtotals in real-time as items are added, removed, or quantities are adjusted.
- Phone Number Normalization: Normalizes phone numbers in the app, ensuring proper formatting for international use and improving data accuracy and reliability

## Style Guidelines:

- Primary color: Earthy Brown (#A67B5B) evoking the rich color of coffee beans.
- Background color: Soft Beige (#F5F5DC) providing a warm, neutral canvas.
- Accent color: Warm Orange (#D2691E) for highlighting key interactive elements.
- Body and headline font: 'PT Sans' (sans-serif) for a balance of modern look and a little warmth or personality.
- Minimal, line-art icons representing coffee, snacks, and other menu categories. Ensure these icons are accessible via appropriate aria-labels.
- Mobile-first responsive design using a dynamic grid layout: 2 columns on mobile, 3 on tablet, and 4 on desktop. Sticky footer bar for cart summary and checkout on mobile.
- Subtle transitions and animations on item add/remove from cart, and during the checkout process. Use fade-in/out effects or smooth sliding animations for drawer/slide-over cart interactions.