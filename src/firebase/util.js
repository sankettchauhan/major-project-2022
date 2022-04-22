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

// load - setloading,
