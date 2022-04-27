import React from "react";

export default function CardNewArticle({
  articleTitle,
  addArticle,
  articleId,
}) {
  return (
    <div className="flex flex-col w-[350px] bg-[#006E7F] text-[#F8CB2E] p-8 rounded-2xl shadow-2xl shadow-[#006E7F] h-[fit-content]">
      <h1 className="text-xl uppercase font-bold mb-2">1. Add article</h1>
      <p className="font-semibold">
        You have to create an article first, then you can add different sections
        to it.
      </p>
      <input
        type="text"
        placeholder="Enter title of article here"
        ref={articleTitle}
        className="placeholder:text-[#F8CB2E] placeholder:font-bold placeholder:text-2xl 
        text-2xl font-bold p-2 my-3 bg-transparent rounded-md outline-1 outline outline-[#F8CB2E]
        active:bg-[#F8CB2E] active:text-[#006E7F]
        focus:bg-[#F8CB2E] focus:text-[#006E7F] 
        disabled:hover:cursor-not-allowed disabled:hover:text-[#F8CB2E] disabled:hover:bg-[#006E7F] disabled:bg-black/20 
        transition duration-300"
        disabled={articleId}
      />
      <button
        onClick={addArticle}
        disabled={articleId}
        className="w-[fit-content] px-4 py-2 outline outline-1 outline-[#F8CB2E] uppercase font-semibold rounded-md mt-3
        hover:bg-[#F8CB2E] hover:text-[#006E7F]
        hover:disabled:text-[#F8CB2E] hover:disabled:bg-[#006E7F]
        disabled:cursor-not-allowed
        transition duration-300"
      >
        Create Article
      </button>
      {articleId && (
        <small className="mt-4">
          You have created an article. You can start creating sections and add
          content to it.
        </small>
      )}
    </div>
  );
}
