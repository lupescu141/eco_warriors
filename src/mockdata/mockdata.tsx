/// POST

type Post = {
  post_id: number;
  username: string;
  title: string;
  description: string;
  post_image: string;
  created_at: string;
  user_id: number;
};

const mockdata: Post[] = [
  {
    post_id: 1,
    username: "Mart77",
    title: "Why to recycle",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "20.2.2025",
    user_id: 1,
  },
  {
    post_id: 2,
    username: "Pekka",
    title: "Biowaste",
    description: "How to reduce biowaste?",
    post_image: "kuva.jpg",
    created_at: "1.2.2025",
    user_id: 2,
  },
  {
    post_id: 3,
    username: "Mart77",
    title: "Plastic waste is bad!",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "3.2.2025",
    user_id: 1,
  },
  {
    post_id: 4,
    username: "Ella92",
    title: "Composting at home",
    description: "Tips and tricks for composting in small spaces.",
    post_image: "compost.jpg",
    created_at: "5.3.2025",
    user_id: 3,
  },
  {
    post_id: 5,
    username: "GreenGuy",
    title: "Reducing plastic use",
    description: "Practical steps to minimize plastic consumption.",
    post_image: "plasticfree.jpg",
    created_at: "10.3.2025",
    user_id: 4,
  },
  {
    post_id: 6,
    username: "SustainableSue",
    title: "DIY eco-friendly products",
    description: "How to make your own natural cleaning supplies.",
    post_image: "diy.jpg",
    created_at: "15.3.2025",
    user_id: 5,
  },
];

//// COMMENTS
type Comment = {
  comment_id: number;
  post_id: number;
  username: string;
  comment_text: string;
  created_at: number;
};

const comments: Comment[] = [
  {
    comment_id: 1,
    post_id: 2,
    username: "Matti",
    comment_text:
      "Kierrättäminen vähentää jätettä ja säästää luonnonvaroja! Muistathan lajitella oikein.",
    created_at: 1710336000,
  },
  {
    comment_id: 2,
    post_id: 1,
    username: "Liisa",
    comment_text:
      "Tiesitkö, että muovin voi kierrättää monella tavalla? Esimerkiksi muovipullot voi palauttaa panttia vastaan!",
    created_at: 1710343200,
  },
  {
    comment_id: 3,
    post_id: 1,
    username: "Pekka",
    comment_text:
      "Biojätteen lajittelu on tärkeää! Se voidaan kompostoida ja hyödyntää esimerkiksi lannoitteena.",
    created_at: 1710350400,
  },
];
export type { Post, Comment };
export { mockdata, comments };
