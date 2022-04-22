import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { sampleArticle, sampleSections } from "../content";
import Loading from "../components/Loading";
import { makeDateReadable } from "../util";
import BlobBackground from "../components/BlobBackground";

initializeFirebaseApp();
const db = firestoreDb();

export default function Article() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //    needs content from article and section collections
    async function load() {
      //  get article id
      const aId = window.location.pathname.split("/")[2];
      try {
        const docRef = doc(db, "articles", aId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  console.log(article);
  if (loading) return <Loading />;

  return (
    <>
      <div>
        <BlobBackground />
        <Nav />
        <div className="mx-80 pt-20 capitalize text-4xl mb-8 overflow-hidden">
          <h3 className="text-2xl text-center text-gray-500 mb-3">
            Published on {makeDateReadable(sampleArticle.dateCreated)}
          </h3>
          <h1 className="text-4xl font-bold text-center">
            {sampleArticle?.title}
          </h1>
          {/* sections */}
          {sampleSections.map((section, index) => {
            return (
              <>
                <h2 className="text-3xl font-semibold mt-8 ">
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
