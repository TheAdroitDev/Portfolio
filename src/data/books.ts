export interface BookItem {
  id: string;
  title: string;
  author: string;
  image?: string;
  color?: string;
}

export const books: BookItem[] = [
  // Original previous order preserved exactly
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gītā As It Is",
    author: "A. C. Bhaktivedanta Swami Prabhupāda",
    image: "/books/bhagvadgeeta.png",
  },
  {
    id: "rituals-of-happy-soul",
    title: "Rituals of a Happy Soul",
    author: "Deepanshu Giri",
    image: "/books/happysoul.png",
  },
  {
    id: "48-laws-of-power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    image: "/books/48laws.png",
  },
  {
    id: "mastery",
    title: "Mastery",
    author: "Robert Greene",
    image: "/books/mastery.png",
  },
  {
    id: "art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    image: "/books/artofwar.png",
  },
  {
    id: "ageless-body-timeless-mind",
    title: "Ageless Body, Timeless Mind",
    author: "Deepak Chopra",
    image: "/books/chopra.png",
  },
  {
    id: "limitless",
    title: "Limitless",
    author: "Jim Kwik",
    image: "/books/limitless.png",
  },
  {
    id: "the-laws-of-human-nature",
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    image: "/books/humannature.png",
  },
  {
    id: "show-your-work",
    title: "Show Your Work!",
    author: "Austin Kleon",
    image: "/books/syw.png",
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: "/books/money.png",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    image: "/books/zerotoone.png",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    image: "/books/deepwork.png",
  },

  // Newly added books appended at the end
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    author: "David Goggins",
    image: "/books/goggins.png",
  },
  {
    id: "unfair-advantage",
    title: "The Unfair Advantage",
    author: "Ash Ali & Hasan Kubba",
    image: "/books/advantage.png",
  },
  {
    id: "hyperfocus",
    title: "Hyperfocus",
    author: "Chris Bailey",
    image: "/books/focus.png",
  },
  {
    id: "attitudes-for-winners",
    title: "6 Attitudes for Winners",
    author: "Norman Vincent Peale",
    image: "/books/winners.png",
  },
  {
    id: "make-your-bed",
    title: "Make Your Bed",
    author: "William H. McRaven",
    image: "/books/bed.png",
  },
  {
    id: "attitude-is-everything",
    title: "Attitude Is Everything",
    author: "Jeff Keller",
    image: "/books/attitude.png",
  },
  {
    id: "same-as-ever",
    title: "Same as Ever",
    author: "Morgan Housel",
    image: "/books/same.png",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    image: "/books/habits.png",
  },
];
