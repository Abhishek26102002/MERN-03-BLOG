import React from 'react';
import './NewsGrid.css'; // Optional CSS file for styling

const articles = [
  {
    id: 1,
    title: "Nvidia RTX 5090 vs RTX 4090: What are the Upgrades?",
    author: "Arjun Sha",
    time: "4 hours ago",
    image: "path_to_image_1",
  },
  {
    id: 2,
    title: "Ghost of Tsushima Anime Announced; Coming to Crunchyroll in 2027",
    author: "Aparna Ukil",
    time: "4 hours ago",
    image: "path_to_image_2",
  },
  {
    id: 3,
    title: "Samsung Confirms Galaxy Unpacked Date: Here’s When Galaxy S25 Series Will Launch",
    author: "Abubakar Mohammed",
    time: "4 hours ago",
    image: "path_to_image_3",
  },
  {
    id: 4,
    title: "Nvidia GeForce RTX 5090: Everything You Need to Know",
    author: "Arjun Sha",
    time: "7 hours ago",
    image: "path_to_image_4",
  },
  {
    id: 5,
    title: "Nvidia RTX 5090 Reveal Showcases ‘Blackwell’ Series With Triple the AI Performance",
    author: "Ishan Adhikary",
    time: "7 hours ago",
    image: "path_to_image_5",
  },
  {
    id: 6,
    title: "Xbox Prime: Microsoft’s Next-Gen Console Rumored to Launch in 2026",
    author: "Upanishad Sharma",
    time: "20 hours ago",
    image: "path_to_image_6",
  },
  {
    id: 7,
    title: "All Video Games Coming out in 2025: Release Schedule",
    author: "Upanishad Sharma",
    time: "1 day ago",
    image: "path_to_image_7",
  },
];

const NewsCard = ({ article }) => (
  <div className="news-card">
    <img src={article.image} alt={article.title} className="news-image" />
    <div className="news-details">
      <h3 className="news-title">{article.title}</h3>
      <p className="news-author">{article.author}</p>
      <p className="news-time">{article.time}</p>
    </div>
  </div>
);

const NewsGrid = () => (
  <div className="news-grid">
    {articles.map((article) => (
      <NewsCard key={article.id} article={article} />
    ))}
  </div>
);

export default NewsGrid;
