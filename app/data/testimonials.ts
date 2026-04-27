export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    avatar: "SM",
    rating: 5,
    text: "Absolutely love my pearl drop earrings! The quality is incredible for the price. I've received so many compliments. Will definitely be ordering more!",
    product: "Pearl Drop Earrings",
    date: "2 weeks ago",
  },
  {
    id: "2",
    name: "Aisha K.",
    avatar: "AK",
    rating: 5,
    text: "The layered gold necklace is even more stunning in person. The packaging was beautiful too — felt like opening a luxury gift. Riva is my new favorite brand!",
    product: "Layered Gold Necklace",
    date: "1 month ago",
  },
  {
    id: "3",
    name: "Emma L.",
    avatar: "EL",
    rating: 4,
    text: "Such a cute mini crossbody bag! Perfect size for going out. The gold hardware gives it such an elevated look. Only wish it came in more colors.",
    product: "Mini Crossbody Bag",
    date: "3 weeks ago",
  },
  {
    id: "4",
    name: "Nora R.",
    avatar: "NR",
    rating: 5,
    text: "I bought the charm bracelet set as a gift for my sister and she absolutely loved it! The quality is amazing and the charms are so delicate and pretty.",
    product: "Charm Bracelet Set",
    date: "1 week ago",
  },
  {
    id: "5",
    name: "Lina T.",
    avatar: "LT",
    rating: 5,
    text: "The cat eye sunglasses are gorgeous! They fit perfectly and the gold accents make them look so expensive. Fast shipping too. 10/10 recommend Riva!",
    product: "Cat Eye Sunglasses",
    date: "2 months ago",
  },
  {
    id: "6",
    name: "Maya J.",
    avatar: "MJ",
    rating: 4,
    text: "Love the velvet scrunchie pack! The colors are beautiful and they don't leave creases in my hair. Great value for a pack of four.",
    product: "Velvet Scrunchie Pack",
    date: "1 month ago",
  },
  {
    id: "7",
    name: "Zara H.",
    avatar: "ZH",
    rating: 5,
    text: "The crystal headband made me feel like a princess at my best friend's wedding! So many guests asked where I got it. Thank you Riva! ✨",
    product: "Crystal Headband",
    date: "3 weeks ago",
  },
  {
    id: "8",
    name: "Dina A.",
    avatar: "DA",
    rating: 5,
    text: "I'm obsessed with the tennis bracelet! It looks exactly like the high-end versions but at a fraction of the price. The sparkle is unreal!",
    product: "Tennis Bracelet",
    date: "2 weeks ago",
  },
];
