import { useRef, useState } from "react";
import Nav from "../components/Nav";
import { addArticle, testAddArticle, testAddSection } from "../firebase/util";
import { getUser } from "../util";
import Swal from "sweetalert2";
import BlobBackground from "../components/BlobBackground";
import CardNewArticle from "../components/CardNewArticle";
import CardNewSection from "../components/CardNewSection";
import { Button } from "../components/Button";

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
    // console.clear();
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
      <BlobBackground />
      <Nav />
      <div className="px-40">
        <h1 className="bold uppercase text-4xl my-4">Add a new article</h1>
        <form className="flex flex-wrap">
          <div className="mr-8 mb-8">
            <CardNewArticle
              articleTitle={articleTitle}
              addArticle={addArticle}
              articleId={articleId}
            />
          </div>
          {articleId && (
            <>
              {sections.map((section, index) => (
                <div className="mr-8 mb-8">
                  <CardNewSection
                    section={section}
                    disabled={true}
                    stepNumber={index + 2}
                  />
                </div>
              ))}
              {addNewSection && (
                <>
                  <div className="mr-8 mb-8">
                    <CardNewSection
                      sectionTitleRef={sectionTitle}
                      sectionContentRef={sectionContent}
                      sectionOrderRef={sectionOrder}
                      stepNumber={sections.length + 2}
                      addSection={addSection}
                    />
                  </div>
                </>
              )}
              <div>
                <Button onClick={handleAddNewSection}>
                  + Add another section
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
