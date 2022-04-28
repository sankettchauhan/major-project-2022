import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  initializeFirestore,
  query,
  where,
} from "firebase/firestore";
import { db, firebaseConfig, initializeFirebaseApp } from "./config";

// queryss, setstate
export const setStateToFBResponse = (querySnapshot, setState) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    setState((state) =>
      state.concat([
        {
          id,
          ...data,
        },
      ])
    );
  });
};

export const addArticleInFB = (article) =>
  addDoc(collection(db(), "new_articles"), article);

export const addSectionInFB = (section) =>
  addDoc(collection(db(), "sections"), section);

export const testAddArticle = (article) =>
  addDoc(collection(db(), "test_articles"), article);

export const testAddSection = (section) =>
  addDoc(collection(db(), "test_sections"), section);

export const deleteArticleAndSections = async (articleId) => {
  // delete article with given article id
  // delete sections associated with that articel id
  console.log("article id from delete: ", articleId);
  try {
    const articleDoc = doc(db(), "new_articles", articleId);
    console.log("article doc: ", articleDoc);
    const delDoc = await deleteDoc(articleDoc);
    console.log("del doc: ", delDoc);

    const sectionsRef = collection(db(), "sections");
    const query_sections = query(
      sectionsRef,
      where("articleId", "==", articleId)
    );
    const querySnapshot = await getDocs(query_sections);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc);
    });
    return true;
  } catch (error) {
    console.error("Error in deleting article with id: ", articleId);
    console.log(error);
    return false;
  }
};

// load - setloading,
