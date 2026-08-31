// ── Edit everything about the restaurant here ─────────────────────────────
// Hours, phone, address, socials. The whole site reads from this file.

export const site = {
  name: "Piccolino Italian Kitchen",
  tagline: "A family table at the Jersey Shore",

  phone: "(732) 270-2020",
  phoneHref: "tel:+17322702020",

  // Toast online ordering — commission-free, goes straight to the restaurant.
  // This is the PRIMARY order link everywhere on the site.
  // ⚠️ Click this once to confirm it's the right store page before launch.
  orderUrl:
    "https://order.toasttab.com/online/piccolino-italian-kitchen-llc-1177-fischer-blvd-suite-2",

  // Third-party delivery — deliberately secondary: these charge commission,
  // so the site always points at Toast first.
  delivery: [
    {
      name: "DoorDash",
      href: "https://www.doordash.com/store/piccolino-italian-kitchen-toms-river-24665820/",
    },
    {
      name: "Uber Eats",
      href: "https://www.ubereats.com/store/piccolino-italian-kitchen-llc/PWLrdRLKTjuSmBuMu6BRDg",
    },
  ],

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

  socials: [
    { name: "Instagram", href: "https://www.instagram.com/piccolinoitaliankitchen/" },
    {
      name: "Facebook",
      href: "https://www.facebook.com/p/Piccolino-Italian-Kitchen-100087486537906/",
    },
    { name: "TikTok", href: "https://www.tiktok.com/@piccolinoitaliankitchen" },
  ],
};
