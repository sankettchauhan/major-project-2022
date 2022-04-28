import { getAuth, signOut } from "firebase/auth";
import { decodeToken } from "react-jwt";

const LOCAL_STORAGE_AUTH_KEY = "major-project-user";

export const makeDateReadable = (date) => {
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date.seconds * 1000).toLocaleDateString(undefined, options);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
};

export const saveUser = (token) => {
  // save JWT in local storage
  console.log(token);
  return localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};

export const getUser = () => {
  const token = getToken();
  const decodedToken = decodeToken(token);
  return decodedToken;
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};

export const sortSectionCompareFunction = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

export const handleSignOut = async (navigate) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    removeTokenFromLocalStorage();
    navigate("/auth");
  } catch (error) {
    console.error(error);
  }
};
