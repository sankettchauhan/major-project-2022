import { addDoc, collection } from "firebase/firestore";
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

export const addArticle = (article) =>
  addDoc(collection(db(), "articles"), article);

export const addSection = (section) =>
  addDoc(collection(db(), "sections"), section);

export const testAddArticle = (article) =>
  addDoc(collection(db(), "test_articles"), article);

export const testAddSection = (section) =>
  addDoc(collection(db(), "test_sections"), section);

// load - setloading,
