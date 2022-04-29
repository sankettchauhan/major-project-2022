import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

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

export const getArticles = async () => {
  const articles = [];

  const articlesRef = collection(db(), "new_articles");
  const q = query(articlesRef, orderBy("title"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    articles.push({ ...data, id });
  });
  return articles;
};

export const retrieveArticle = (id) => getDoc(doc(db(), "new_articles", id));

// get sections of an article
export const getSections = async (articleId) => {
  const sections = [];

  const sectionsRef = collection(db(), "sections");
  const q = query(
    sectionsRef,
    where("articleId", "==", articleId),
    orderBy("order")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    sections.push({ ...data, id });
  });
  return sections;
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
