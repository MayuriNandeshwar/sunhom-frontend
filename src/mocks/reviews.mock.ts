import type { Review } from "@/types/review";

/**
 * MOCK DATA. These are sample reviews written for design purposes, not real
 * customer feedback. Replace with real reviews from the backend before
 * relying on this section publicly (see services/public/reviews.api.ts).
 */
export const MOCK_REVIEWS: Review[] = [
  {
    id: "r-013",
    customerName: "Priya S.",
    rating: 5,
    title: "Fills the whole room",
    body: "The fragrance is warm and never overpowering. I lit it for an hour in the evening and the living room smelled lovely until morning. The packaging felt special too.",
    createdAt: "2026-09-18",
  },
  {
    id: "r-012",
    customerName: "Rohan M.",
    rating: 5,
    title: "A gift that landed perfectly",
    body: "Bought this for my sister's housewarming and she has not stopped talking about it. Beautiful jar, beautiful scent, and it arrived well wrapped.",
    createdAt: "2026-09-02",
  },
  {
    id: "r-011",
    customerName: "Ananya K.",
    rating: 4,
    title: "Lovely scent, slow burn",
    body: "Burns evenly and slowly, which I love. The scent is gentle rather than loud. I would have liked a slightly stronger throw, but I will happily reorder.",
    createdAt: "2026-08-21",
  },
  {
    id: "r-010",
    customerName: "Meera D.",
    rating: 5,
    title: "Clean burn, no soot",
    body: "No black marks on the jar and no smoke. The wick stayed steady the whole time. You can tell this is hand poured with care.",
    createdAt: "2026-08-09",
  },
  {
    id: "r-009",
    customerName: "Karan P.",
    rating: 5,
    title: "Worth every rupee",
    body: "Comparing it with the imported candles I used to buy, this one holds its own and then some. The soy wax gives such a smooth, calming scent.",
    createdAt: "2026-07-27",
  },
  {
    id: "r-008",
    customerName: "Sneha R.",
    rating: 3,
    title: "Pretty, but quite subtle",
    body: "The jar is gorgeous and the scent is pleasant, but I found the throw lighter than expected in a larger room. It works well in a bedroom or study.",
    createdAt: "2026-07-14",
  },
  {
    id: "r-007",
    customerName: "Aditi N.",
    rating: 5,
    title: "Already reusing the jar",
    body: "Once the candle finished I cleaned the jar and it now holds my hair clips. Lovely that nothing goes to waste.",
    createdAt: "2026-06-30",
  },
  {
    id: "r-006",
    customerName: "Vikram J.",
    rating: 5,
    title: "My go-to for evenings",
    body: "I light this while reading after work. The scent settles the mind without giving me a headache, which is rare with candles.",
    createdAt: "2026-06-11",
  },
  {
    id: "r-005",
    customerName: "Isha T.",
    rating: 4,
    title: "Gentle and calming",
    body: "A soft, comforting fragrance that does not feel artificial. Dispatch was quick. One star off only because I wish it came in a larger size.",
    createdAt: "2026-05-23",
  },
  {
    id: "r-004",
    customerName: "Neha B.",
    rating: 5,
    title: "Smells like a boutique hotel",
    body: "Guests asked where I bought it. It burns clean and the whole house smelled wonderful for hours after I blew it out.",
    createdAt: "2026-05-04",
  },
  {
    id: "r-003",
    customerName: "Arjun V.",
    rating: 5,
    title: "Really well made",
    body: "Even melt pool from the first burn, no tunnelling. Great to see a proudly Indian brand getting the details right.",
    createdAt: "2026-04-16",
  },
  {
    id: "r-002",
    customerName: "Pooja G.",
    rating: 5,
    title: "Luxury at a fair price",
    body: "The glass jar, the label, the scent: everything feels considered. I have ordered two more for friends.",
    createdAt: "2026-03-29",
  },
  {
    id: "r-001",
    customerName: "Tanvi L.",
    rating: 5,
    title: "Cosy in a jar",
    body: "Exactly what I wanted for monsoon evenings. Warm, soft and long lasting. Will be buying again.",
    createdAt: "2026-02-20",
  },
];
