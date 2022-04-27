import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import Loading from "../components/Loading";
import { getUser, makeDateReadable, sortSectionCompareFunction } from "../util";
import BlobBackground from "../components/BlobBackground";
import { decodeToken, useJwt } from "react-jwt";
import { useLocation, useNavigate } from "react-router-dom";
import { setStateToFBResponse } from "../firebase/util";

initializeFirebaseApp();
const db = firestoreDb();

export default function Article() {
  const [article, setArticle] = useState({});
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user_id } = getUser();
  console.log("user id: ", user_id);

  const nav = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log("article: ", article);
  console.log("sections: ", sections);
  console.log("sorted sections: ", sections.sort(sortSectionCompareFunction));

  useEffect(() => {
    //    needs content from article and section collections
    async function load() {
      //  get article id
      const articleId = location.pathname.split("/")[2];
      try {
        const articleDocRef = doc(db, "new_articles", articleId);
        const articleDocSnap = await getDoc(articleDocRef);

        if (!articleDocSnap.exists) {
          // doc.data() will be undefined in this case
          console.log("No such doc exists!!");
        }
        setArticle(articleDocSnap.data());

        const sectionsRef = collection(db, "sections");
        const q = query(sectionsRef, where("articleId", "==", articleId));
        const querySnapshot = await getDocs(q);
        // const querySnapshot = await getDocs(collection(db, "articles"));
        setStateToFBResponse(querySnapshot, setSections);
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
    if (sections.length > 0)
      setSections((sections) => sections.sort(sortSectionCompareFunction));
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <div>
        <BlobBackground />
        <Nav />
        <div className="mx-80 pt-20 capitalize text-4xl mb-8 overflow-hidden">
          <h3 className="text-2xl text-center text-gray-500 mb-3">
            Published on {makeDateReadable(article.dateCreated)}
          </h3>
          <h1 className="text-4xl font-bold text-center">{article?.title}</h1>
          {/* sections */}
          {sections.map((section, index) => {
            return (
              <>
                <h2
                  className="text-3xl font-semibold mt-8"
                  key={`article-${section.articleId}-section-${index + 1}`}
                >
                  {section.title}
                </h2>
                {section.content.map((p, index) => (
                  <p
                    className="text-xl mt-3 normal-case font-serif"
                    key={`para-${index + 1}`}
                  >
                    {p}
                  </p>
                ))}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
