// ── Edit everything about the restaurant here ─────────────────────────────
// Hours, phone, address, socials. The whole site reads from this file.

export const site = {
  name: "Piccolino Italian Kitchen",
  tagline: "A family table at the Jersey Shore",

  phone: "(732) 270-2020",
  phoneHref: "tel:+17322702020",

  address: {
    street: "1177 Fischer Blvd",
    city: "Toms River",
    state: "NJ",
    zip: "08753",
  },

  // Google Maps embed — no API key needed
  mapEmbedSrc:
    "https://www.google.com/maps?q=1177+Fischer+Blvd,+Toms+River,+NJ+08753&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=1177+Fischer+Blvd,+Toms+River,+NJ+08753",

  hours: [
    { days: "Monday – Friday", label: "Lunch", time: "12:00 PM – 3:00 PM" },
    { days: "Monday – Friday", label: "Dinner", time: "5:00 PM – 9:00 PM" },
    { days: "Saturday", label: "Dinner", time: "4:30 PM – 9:00 PM" },
    { days: "Sunday", label: "Closed", time: "—" },
  ],

  // TODO: replace with real profile URLs
  socials: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "Yelp", href: "https://yelp.com" },
  ],
};
