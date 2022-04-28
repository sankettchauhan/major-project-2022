import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import Loading from "../components/Loading";
import { getUser, makeDateReadable, sortSectionCompareFunction } from "../util";
import BlobBackground from "../components/BlobBackground";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteArticleAndSections,
  getSections,
  setStateToFBResponse,
} from "../firebase/util";
import {
  deleteArticleConfirmationSwal,
  deleteArticleDeclinedSwal,
  deleteArticleErrorSwal,
  deleteArticleSuccessSwal,
} from "../swalUtil";

initializeFirebaseApp();
const db = firestoreDb();

export default function Article() {
  const [article, setArticle] = useState({});
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const articleId = location.pathname.split("/")[2];

  console.log(location);
  console.log("user: ", user);
  console.log("article: ", article);
  console.log("sections: ", sections);

  useEffect(() => {
    //    needs content from article and section collections
    async function load() {
      try {
        const articleDocRef = doc(db, "new_articles", articleId);
        const articleDocSnap = await getDoc(articleDocRef);

        if (!articleDocSnap.exists) {
          // doc.data() will be undefined in this case
          console.log("No such doc exists!!");
        }
        setArticle(articleDocSnap.data());

        const sectionsFromFB = await getSections(articleId);
        console.log("sections from FB: ", sectionsFromFB);
        setSections(sectionsFromFB);

        setUser(getUser());
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
    // sort sections in state because order by query was giving some issues
    if (sections.length > 0)
      setSections((sections) => sections.sort(sortSectionCompareFunction));
  }, [articleId]);
  if (loading) return <Loading />;

  const handleDeleteArticle = async (e) => {
    e.preventDefault();

    // show alert
    const swal = await deleteArticleConfirmationSwal(article.title);
    console.log("article title from handle delete: ", article.title);
    console.log("swal from handle delete: ", swal);
    // if declined so revert
    if (!swal.isConfirmed) {
      deleteArticleDeclinedSwal(article.title);
      return;
    }

    const isArticleDeleted = await deleteArticleAndSections(articleId);
    console.log("is article deleted: ", isArticleDeleted);

    // some error occured
    if (!isArticleDeleted) {
      // error alert
      deleteArticleErrorSwal(article.title);
      return;
    }

    // success alert, nav to home page
    deleteArticleSuccessSwal(article.title);
    navigate("/");
  };

  return (
    <>
      <div>
        <BlobBackground />
        <Nav />
        <div className="mx-80 pt-20 capitalize mb-8 overflow-hidden">
          <h3 className="text-2xl text-center text-gray-500 mb-3">
            Published on {makeDateReadable(article.dateCreated)}
          </h3>
          <h1 className="text-4xl font-bold text-center">{article?.title}</h1>
          <h3 className="text-xl mt-2 text-center text-gray-500 mb-3">
            By {user.name}
          </h3>
          {/* sections */}
          {sections.map((section, index) => {
            return (
              <div
                className="mt-8"
                key={`article-${section.articleId}-section-${index + 1}`}
              >
                <h2 className="text-3xl font-semibold">{section.title}</h2>
                {section.content.map((p, index) => (
                  <p
                    className="text-xl mt-3 normal-case font-serif"
                    key={`para-${index + 1}`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            );
          })}
          {article && (
            <div className="mt-8">
              <button
                className="px-4 py-2 border-2 border-black rounded-md font-semibold uppercase mr-4 hover:bg-black hover:text-white transition"
                onClick={handleDeleteArticle}
              >
                delete article
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
