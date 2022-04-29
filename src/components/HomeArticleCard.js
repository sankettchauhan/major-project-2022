import { useNavigate } from "react-router-dom";

export default function HomeArticleCard({ article, sections }) {
  const { title, id } = article;
  const content = sections?.map(({ content }) => content.join(" "));
  console.log("sections from card: ", sections);
  const navigate = useNavigate();
  return (
    <div
      className="border-[1px] border-black rounded-xl my-4 p-8 
    transition-[background-size] duration-500 bg-gradient-to-r from-[#FCD900] to-yellow/10"
    >
      <h1 className="text-3xl tracking-wide capitalize font-[gt-super] mb-2">
        {title}
      </h1>
      <h2 className="text-xl font-light text-ellipsis overflow-hidden line-clamp">
        {content?.join(" ")}
      </h2>
      <button
        onClick={() => navigate(`/article/${id}`)}
        className="text-xl font-light border-b-[1px] border-black mt-4 px-[0.5px] flex justify-end
        transition-[background-size] duration-500 z-10 bg-gradient-to-r from-white to-white bg-no-repeat bg-[length:0] hover:bg-[length:100%]"
      >
        View entire article
      </button>
    </div>
  );
}
