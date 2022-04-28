import React, { useEffect, useState } from "react";
import { getArticles, getSections } from "../firebase/util";
import Nav from "../components/Nav";
import HomeArticleCard from "../components/HomeArticleCard";
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
        articlesFromFB.forEach(async ({ id }) => {
          const sectionsFromFB = await getSections(id);
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
      <Nav bg="bg-[#ffc017]" />
      <div className="flex px-40 bg-[#ffc017]">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-7xl font-[gt-super] tracking-tight mb-4">
            Stay curious.
          </h1>
          <h2 className="text-2xl pr-32 font-[Helvetica]">
            Discover stories, thinking and expertise from writers on any topic.
          </h2>
        </div>
        <div className="flex-1">
          <img src="../read-removebg.png" alt="read" />
        </div>
      </div>
      {/* container */}
      <h1 className=" px-40 mt-8 text-center font-[gt-super] text-6xl">
        Published Articles
      </h1>
      <div className="px-40 mt-6 mb-8 flex gap-8">
        {Object.keys(sections).length > 0 &&
          articles?.map((article, index) => (
            <div className="basis-1/2" key={article.id}>
              <HomeArticleCard
                article={article}
                sections={sections[article.id]}
              />
            </div>
          ))}
      </div>
    </>
  );
}
