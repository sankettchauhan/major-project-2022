const LOCAL_STORAGE_AUTH_KEY = "major-project-user";

export const makeDateReadable = (date) => {
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const useAuth = () => {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
};

export const saveUser = (token) => {
  // save JWT in local storage
  console.log(token);
  return localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
};
