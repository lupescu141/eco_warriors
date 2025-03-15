/// POST

type Post = {
  post_id: number;
  username: string;
  title: string;
  description: string;
  post_image: string;
  created_at: string;
};

const mockdata: Post[] = [
  {
    post_id: 1,
    username: "Mart77",
    title: "Why to recycle",
    description: "lorem",
    post_image: "kuva.jpg",
    created_at: "10:30 20.2.2025",
  },
  {
    post_id: 2,
    username: "Pekka",
    title: "Biowaste",
    description: "How to reduce biowaste?",
    post_image: "kuva.jpg",
    created_at: "16:0 1.2.2025",
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
