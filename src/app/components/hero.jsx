import { useState, useEffect } from "react";
import CardsSlider from "./CardsSlider";
import NewsSlider from "./newsSlider";
import VerticalSlider from "./verticaleSlider";
import { axiosInstance } from "@/lib/axios.js";

const newsItems = [
  {
    id: 1,
    title: "Hot News",
    category: "News",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Make sure you have this image in your public folder
    description:
      "“Slow Horses,” the popular spy drama, has been renewed for a fifth season, much to the delight of its dedicated fanbase. The highly anticipated fourth season is set to premiere on September 4, 2024, promising more thrilling storylines and complex characters that viewers have come to love. Notable cast members, including the acclaimed Gary Oldman and Cillian Murphy, will continue to bring depth and intrigue to the series.",
    date: "25 July",
  },
  {
    id: 2,
    title: "New Series Launch",
    category: "Updates",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "Prepare for an epic journey! The highly anticipated new sci-fi series 'Cosmic Odyssey' is set to debut on October 15, 2024. Featuring groundbreaking special effects and a star-studded cast, it promises to redefine the genre.",
    date: "20 July",
  },
  {
    id: 3,
    title: "Season Finale Announced",
    category: "Breaking",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "The thrilling fantasy series 'Realm of Shadows' will conclude its third season with a spectacular two-part finale on September 10, 2024. Don't miss the dramatic conclusion!",
    date: "18 July",
  },
  {
    id: 4,
    title: "Exclusive Interview",
    category: "Insights",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "Dive deep into the mind of the director behind 'The Silent City' in our exclusive interview. Learn about the inspirations, challenges, and future plans for the critically acclaimed show.",
    date: "15 July",
  },
  {
    id: 1,
    title: "Hot News",
    category: "News",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Make sure you have this image in your public folder
    description:
      "“Slow Horses,” the popular spy drama, has been renewed for a fifth season, much to the delight of its dedicated fanbase. The highly anticipated fourth season is set to premiere on September 4, 2024, promising more thrilling storylines and complex characters that viewers have come to love. Notable cast members, including the acclaimed Gary Oldman and Cillian Murphy, will continue to bring depth and intrigue to the series.",
    date: "25 July",
  },
  {
    id: 2,
    title: "New Series Launch",
    category: "Updates",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "Prepare for an epic journey! The highly anticipated new sci-fi series 'Cosmic Odyssey' is set to debut on October 15, 2024. Featuring groundbreaking special effects and a star-studded cast, it promises to redefine the genre.",
    date: "20 July",
  },
  {
    id: 3,
    title: "Season Finale Announced",
    category: "Breaking",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "The thrilling fantasy series 'Realm of Shadows' will conclude its third season with a spectacular two-part finale on September 10, 2024. Don't miss the dramatic conclusion!",
    date: "18 July",
  },
  {
    id: 4,
    title: "Exclusive Interview",
    category: "Insights",
    image: "https://fr.web.img2.acsta.net/pictures/22/03/29/12/33/0773860.jpg", // Example image
    description:
      "Dive deep into the mind of the director behind 'The Silent City' in our exclusive interview. Learn about the inspirations, challenges, and future plans for the critically acclaimed show.",
    date: "15 July",
  },
];

export default function Hero() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [recommendationsSeries, setRecommendationsSeries] = useState([]);



useEffect(() => {
  const fetchAll = async () => {
    try {
      const [dataOfBannerSeries, dataOfRecommendations] = await Promise.all([
        axiosInstance.get("/trending/tv/day", { params: { language: "en-US", page: 1 } }),
        axiosInstance.get("/tv/1399/recommendations", { params: { language: "en-US", page: 1 } }),
      ]);

      // handle banner slider data
      const formattedSeries = dataOfBannerSeries.data.results.slice(0, 10).map((series) => ({
        id: series.id,
        title: series.name,
        imdbRating: series.vote_average,
        genres: series.genre_ids,
        description: series.overview,
        type: "tv",
        imageUrl: `https://image.tmdb.org/t/p/w780${series.backdrop_path}`,
      }));
      setPopularSeries(formattedSeries);

      // handle recommendations series
      const formattedRecommendations = dataOfRecommendations.data.results.map((serie) => ({
        id:serie.id,
        title: serie.name,
        year: serie.first_air_date?.slice(0, 4),
        rating: serie.vote_average,
        genres: serie.genre_ids,
        description: serie.overview,
        type: "tv",
        image: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
      }));
      setRecommendationsSeries(formattedRecommendations);

    } catch (err) {
      console.error(err);
    }
  };

  fetchAll();
}, []);
  return (
    <div className="flex flex-wrap xl:flex-nowrap justify-between  gap-4 ">
      <div className="w-[100%] xl:w-[70%] flex flex-col gap-y-5 ">
        <VerticalSlider data={popularSeries} />
        <CardsSlider
          title="Recommandation For You"
          data={recommendationsSeries}
        />
      </div>
      <div className="flex-1 ">
        <NewsSlider newsItems={newsItems} />
      </div>
    </div>
  );
}
