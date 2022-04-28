import React, { useEffect, useState } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getArticles, setStateToFBResponse } from "../firebase/util";
import Nav from "../components/Nav";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";

initializeFirebaseApp();
const db = firestoreDb();

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("articles: ", articles);

  useEffect(() => {
    // loads all the articles in the db
    async function load() {
      try {
        const articlesFromFB = await getArticles();
        console.log("articles from FB: ", articlesFromFB);
        setArticles(articlesFromFB);
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
        <h1 className="text-4xl capitalize mb-4 font-[gt-super]">
          List of articles
        </h1>
        {articles?.map((article, index) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </>
  );
}
