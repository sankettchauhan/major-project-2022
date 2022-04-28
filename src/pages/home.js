import React, { useEffect, useState } from "react";
import { getArticles, getSections } from "../firebase/util";
import Nav from "../components/Nav";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  console.log("articles: ", articles);
  console.log("sections: ", sections);

  useEffect(() => {
    async function load() {
      try {
        const articlesFromFB = await getArticles();
        console.log("articles from FB: ", articlesFromFB);
        setArticles(articlesFromFB);

        setSections({});
        articles.forEach(async ({ id }) => {
          console.log("getting sections..");
          const sectionsFromFB = await getSections(id);
          console.log("sections from FB: ", sectionsFromFB);
          setSections((oldState) => ({ ...oldState, [id]: sectionsFromFB }));
        });
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Nav />
      {/* container */}
      <div className="px-40 mt-6">
        <div></div>
        {articles?.map((article, index) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </>
  );
}
