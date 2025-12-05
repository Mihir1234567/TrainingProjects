import mongoose from "mongoose";
import "dotenv/config";
import Blog from "../models/blogModel.js";

const blogData = [
  {
    id: 1,
    image: "/src/assets/BlogImg1.jpg",
    title: "Behind the Scenes with Author Victoria Aveyard",
    date: "October 24, 2024",
    author: "Admin",
    category: "Author Interviews",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg1.jpg",
        alt: "Victoria Aveyard",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "quote",
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. "Writing is the only way I have to explain my own life to myself." - Pat Conroy',
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      { type: "heading", level: 2, text: "The Writing Process" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/555/ffffff?text=Writing+Notes",
            alt: "Writing notes",
          },
          {
            src: "https://placehold.co/600x400/ddd/333?text=Book+Signing",
            alt: "Book signing event",
          },
        ],
      },
      {
        type: "paragraph",
        text: "So we came up with the idea that instead of taking the job to a restricted area of the building, we bring the inspiration to you.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
    ],
  },
  {
    id: 2,
    image: "/src/assets/BlogImg2.jpg",
    title: "5 Attractive Bookstore WordPress Themes",
    date: "October 24, 2024",
    author: "Tech Team",
    category: "Web Design",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg2.jpg",
        alt: "WordPress Themes",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "quote",
        text: '"Digital design is like painting, except the paint never dries." - Neville Brody. Finding the perfect theme is essential for your online presence.',
      },
      { type: "heading", level: 2, text: "Top Design Features" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/333/ffffff?text=Modern+Layout",
            alt: "Modern layout example",
          },
          {
            src: "https://placehold.co/600x400/aaa/000?text=Mobile+Responsive",
            alt: "Responsive design",
          },
        ],
      },
      {
        type: "paragraph",
        text: "We make it quick, easy and convenient for scheduling to save time on your next web project.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
    ],
  },
  {
    id: 3,
    image: "/src/assets/BlogImg3.jpg",
    title: "Top 10 Books to Make It a Great Year",
    date: "October 24, 2024",
    author: "Book Club",
    category: "Recommendations",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg3.jpg",
        alt: "Top 10 Books",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        type: "quote",
        text: '"A room without books is like a body without a soul." - Cicero. These selections will add soul to your year.',
      },
      { type: "heading", level: 2, text: "Why We Chose These" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/777/ffffff?text=Fiction",
            alt: "Fiction Books",
          },
          {
            src: "https://placehold.co/600x400/eee/333?text=Non-Fiction",
            alt: "Non-Fiction Books",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Reading provides a unique escape and a way to learn new perspectives.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
    ],
  },
  {
    id: 4,
    image: "/src/assets/BlogImg4.jpg",
    title: "Author Special: A Q&A with Brené Brown",
    date: "October 24, 2024",
    author: "HALEI",
    category: "TIPS & TRICKS",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "https://placehold.co/1200x600/acacac/ffffff?text=Brene+Brown+Q&A",
        alt: "Woman in a library",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "quote",
        text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid." Abraham Maslow',
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "paragraph",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      { type: "heading", level: 2, text: "Why choose our products" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/555/ffffff?text=Reading+Book",
            alt: "Person reading a book",
          },
          {
            src: "https://placehold.co/600x400/ddd/333?text=Book+Stamper",
            alt: "Book stamper",
          },
        ],
      },
      {
        type: "paragraph",
        text: "So we came up with the idea that instead of taking the job to a restricted area of the building.",
      },
      {
        type: "paragraph",
        text: "We make it quick, easy and convenient for scheduling to save time.",
      },
      {
        type: "paragraph",
        text: "Our promise is to be respectful of you and your home as if it were our own.",
      },
      {
        type: "paragraph",
        text: "We stand behind our work with a one-year guarantee on all labor.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
    ],
  },
  {
    id: 5,
    image: "/src/assets/BlogImg5.jpg",
    title: "Should You Feel Embarrassed For Reading Kids Books?",
    date: "October 24, 2024",
    author: "Reader",
    category: "Opinion",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg5.jpg",
        alt: "Kids Books",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "quote",
        text: '"Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them." - Antoine de Saint-Exupéry',
      },
      { type: "heading", level: 2, text: "The Joy of Simplicity" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/ffcc00/333?text=Nostalgia",
            alt: "Nostalgic books",
          },
          {
            src: "https://placehold.co/600x400/00ccff/ffffff?text=Illustration",
            alt: "Book illustrations",
          },
        ],
      },
      {
        type: "paragraph",
        text: "There is no shame in enjoying a good story, regardless of the target audience.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
    ],
  },
  {
    id: 6,
    image: "/src/assets/BlogImg2.jpg",
    title: "Frankfurt Book Fair: Day 1 Highlights",
    date: "October 24, 2024",
    author: "Industry",
    category: "News",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg2.jpg",
        alt: "Frankfurt Book Fair",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        type: "quote",
        text: "The Frankfurt Book Fair is the world's largest trade fair for books, based on the number of publishing companies represented.",
      },
      { type: "heading", level: 2, text: "Global Publishers Meet" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/888/ffffff?text=Exhibitor+Hall",
            alt: "Exhibition Hall",
          },
          {
            src: "https://placehold.co/600x400/333/ffffff?text=Meeting+Space",
            alt: "Meeting Space",
          },
        ],
      },
      {
        type: "paragraph",
        text: "This event sets the tone for the publishing industry for the coming year.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
    ],
  },
  {
    id: 7,
    image: "/src/assets/BlogImg6.jpg",
    title: "Frankfurt Book Fair: Day 2 Highlights",
    date: "October 25, 2024",
    author: "Industry",
    category: "News",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg6.jpg",
        alt: "Frankfurt Book Fair Day 2",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "quote",
        text: '"Books are a uniquely portable magic." - Stephen King. The fair proves this with thousands of books on display.',
      },
      { type: "heading", level: 2, text: "Emerging Trends" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/222/ffffff?text=Tech+Booth",
            alt: "Technology Booth",
          },
          {
            src: "https://placehold.co/600x400/999/000?text=Indie+Authors",
            alt: "Indie Authors Section",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Innovation in digital publishing was a key theme of the second day.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
    ],
  },
  {
    id: 8,
    image: "/src/assets/BlogImg7.jpg",
    title: "Frankfurt Book Fair: Day 3 Highlights",
    date: "October 26, 2024",
    author: "Industry",
    category: "News",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg7.jpg",
        alt: "Frankfurt Book Fair Day 3",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      },
      {
        type: "quote",
        text: "The public days have begun, and the halls are filled with eager readers from around the world.",
      },
      { type: "heading", level: 2, text: "Public Attendance" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/444/ffffff?text=Cosplay",
            alt: "Cosplay Event",
          },
          {
            src: "https://placehold.co/600x400/bbb/333?text=Crowds",
            alt: "Large Crowds",
          },
        ],
      },
      {
        type: "paragraph",
        text: "The atmosphere is electric as authors meet their fans face to face.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      },
    ],
  },
  {
    id: 9,
    image: "/src/assets/BlogImg3.jpg",
    title: "Frankfurt Book Fair: Closing Ceremony",
    date: "October 27, 2024",
    author: "Industry",
    category: "News",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
    comments: [],
    content: [
      {
        type: "image",
        src: "/src/assets/BlogImg8.jpg",
        alt: "Frankfurt Book Fair Closing",
      },
      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "paragraph",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "quote",
        text: "As the doors close on another successful year, we look forward to the future of storytelling.",
      },
      { type: "heading", level: 2, text: "Awards & Recognition" },
      {
        type: "paragraph",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "image_grid",
        images: [
          {
            src: "https://placehold.co/600x400/goldenrod/ffffff?text=Award",
            alt: "Book Award",
          },
          {
            src: "https://placehold.co/600x400/333/ccc?text=Stage",
            alt: "Main Stage",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Thank you for joining our coverage of this year's Frankfurt Book Fair.",
      },
      {
        type: "paragraph",
        text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      },
    ],
  },
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await Blog.deleteMany({});
    console.log("Cleared existing blogs");

    await Blog.insertMany(blogData);
    console.log("Blogs seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
