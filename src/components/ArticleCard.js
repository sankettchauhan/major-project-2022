import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArticleCard({ title, id, dateCreated, tags }) {
  const navigate = useNavigate();
  const handleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };
  return (
    <>
      <div className="block mb-2">
        <a
          className="border-b-2 text-xl cursor-pointer"
          onClick={() => handleClick(id)}
        >
          {title}
        </a>
      </div>
    </>
  );
}
