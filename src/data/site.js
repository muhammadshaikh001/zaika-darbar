// Editable business configuration for Zaika Darbar.
// Update these fields to change site-wide content.

export const SITE = {
  name: "Zaika Darbar",
  tagline: "Bold Flavour, Straight from the Tandoor.",
  logo: "/logo.png",
  
  description:
  "A warm neighbourhood restaurant serving Mughlai, Arabian, North Indian and Chinese favourites.",

  footerLocation: "Vishala Circle · Juhapura · Ahmedabad",

  address: {
    line1: "Zaika Darbar Opp. Vishala, Vishala Circle, Sanklit Nagar",
    locality: "Juhapura",
    city: "Ahmedabad",
    state: "Gujarat",
    postal: "380055",
    country: "India",
    landmark: "Opposite Vishala, Vishala Circle",
  },
  phoneDisplay: "099786 46786",
  phoneE164: "+919978646786",
  whatsappE164: "919978646786",
  hoursLabel: "Open Daily · 6:30 AM – 11:00 PM",
  hoursOpen: "06:30",
  hoursClose: "23:00",
  priceRange: "₹200–₹400 per person",
  rating: { value: 4.1, count: 756 },
  services: ["Dine-in", "Takeaway", "No-contact Delivery", "Table Reservation"],
  cuisines: ["Mughlai", "Arabian", "North Indian", "Chinese"],
  swiggyUrl: "https://www.swiggy.com/", // client-editable placeholder
  googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Zaika+Darbar+Vishala+Circle+Ahmedabad",
  googleMapsEmbed:
    "https://www.google.com/maps?q=Vishala+Circle+Sanklit+Nagar+Juhapura+Ahmedabad&output=embed",
  googleDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Vishala+Circle+Sanklit+Nagar+Juhapura+Ahmedabad",
  social: {
    instagram: "#",
    facebook: "#",
  },
};

export const tel = () => `tel:${SITE.phoneE164}`;
export const wa = (msg = `Hi ${SITE.name}, I'd like to place an order.`) =>
  `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(msg)}`;
