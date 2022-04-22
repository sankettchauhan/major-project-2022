export const makeDateReadable = (date) => {
  try {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  } catch (error) {
    console.log("Error: ", error);
  }
};
