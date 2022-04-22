import React, { useEffect, useState } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { setStateToFBResponse } from "../firebase/util";
import Nav from "../components/Nav";
import ArticleCard from "../components/ArticleCard";
import Loading from "../components/Loading";

initializeFirebaseApp();
const db = firestoreDb();

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loads all the articles in the db
    async function load() {
      try {
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, orderBy("title"));
        const querySnapshot = await getDocs(q);
        // const querySnapshot = await getDocs(collection(db, "articles"));
        setStateToFBResponse(querySnapshot, setArticles);
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
        {articles?.map((article, index) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </>
  );
}
