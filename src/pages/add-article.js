import { useRef, useState } from "react";
import Nav from "../components/Nav";
import { addArticle, testAddArticle, testAddSection } from "../firebase/util";
import { getUser } from "../util";
import Swal from "sweetalert2";

export default function AddArticle() {
  const articleTitle = useRef("");
  const sectionTitle = useRef("");
  const sectionContent = useRef([]);
  const sectionOrder = useRef(null);
  const [articleId, setArticleId] = useState("");
  const [sections, setSections] = useState([]);
  const [addNewSection, setAddNewSection] = useState(true);

  const addArticle = async (e) => {
    e.preventDefault();
    console.clear();
    const swal = await Swal.fire({
      titleText: "Are you sure you want to continue?",
      text: `You are creating an article with title "${articleTitle.current.value}". You can only edit it later on, after adding all sections to the article.`,
      icon: "warning",
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showDenyButton: true,
    });

    if (!swal.isConfirmed) return;

    console.log("swal object: ", swal);
    console.log("swal is confirmed?: ", swal.isConfirmed);

    const { user_id } = getUser();
    const article = {
      title: articleTitle.current.value,
      dateCreated: new Date(),
      userId: user_id,
      //   id - auto generated
    };
    console.log("article from form: ", article);

    const articleInFB = await testAddArticle(article);
    // const articleInFB = await addArticle(article);

    console.log("article in FB: ", articleInFB);
    setArticleId(articleInFB.id);
  };

  const addSection = async (e) => {
    e.preventDefault();
    console.clear();
    const swal = await Swal.fire({
      titleText: "Are you sure you want to continue?",
      text: `You are creating a section with title "${sectionTitle.current.value}". You can only edit it later on, after adding all sections to the article.`,
      icon: "warning",
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showDenyButton: true,
    });

    if (!swal.isConfirmed) return;
    // TODO: convert content string to array
    const section = {
      title: sectionTitle.current.value,
      content: sectionContent.current.value,
      order: sectionOrder.current.value,
      // get article id after creation of document in firebase
      articleId: articleId,
    };
    console.clear();
    console.log("section from form: ", section);

    const sectionInFB = await testAddSection(section);
    setSections((state) => state.concat(section));
    setAddNewSection(false);
    // const aectionInFB = await addArticle(section);

    console.log("section in FB: ", sectionInFB);
    console.log("sections in state: ", sections);
  };

  const handleAddNewSection = (e) => {
    e.preventDefault();
    setAddNewSection(true);
  };

  return (
    <>
      <Nav />
      <form className="flex flex-col container">
        <div className="flex flex-col">
          <p>
            You have to create an article first, then you can add different
            sections to it.
          </p>
          <input
            type="text"
            placeholder="Enter title of article here"
            ref={articleTitle}
          />
          <button onClick={addArticle} disabled={articleId}>
            Create Article
          </button>
        </div>
        {articleId && (
          <>
            {sections.map((section, index) => (
              <>
                <input
                  type="text"
                  placeholder="Enter title of section here"
                  value={section.title}
                  disabled
                />
                <textarea
                  placeholder="Enter content of section here"
                  value={section.content}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Enter order of section here"
                  value={section.order}
                  disabled
                />
              </>
            ))}
            {addNewSection && (
              <>
                <input
                  type="text"
                  placeholder="Enter title of section here"
                  ref={sectionTitle}
                />
                <textarea
                  ref={sectionContent}
                  placeholder="Enter content of section here"
                />
                <input
                  type="text"
                  ref={sectionOrder}
                  placeholder="Enter order of section here"
                />
                <button onClick={addSection}>Create section</button>
              </>
            )}
            <button onClick={handleAddNewSection}>Add another section</button>
          </>
        )}
      </form>
    </>
  );
}
