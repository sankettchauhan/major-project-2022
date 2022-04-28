import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeArticleCard({ article, sections }) {
  const { title, id } = article;
  const content = sections?.map(({ content }) => content.join(" "));
  console.log("sections from card: ", sections);
  const navigate = useNavigate();
  return (
    <div className=" duration-500 border-2 border-[#FCD900] bg-[#FCD900] rounded-xl my-4 p-8">
      <h1 className="text-3xl tracking-wide capitalize font-[gt-super] mb-2">
        {title}
      </h1>
      <h2 className="text-xl font-light text-ellipsis overflow-hidden line-clamp">
        {content?.join(" ")}
      </h2>
      <button
        onClick={() => navigate(`/article/${id}`)}
        className="text-xl font-light border-b-[1px] border-black mt-4"
      >
        View entire article
      </button>
    </div>
  );
}
