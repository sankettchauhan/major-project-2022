import React from "react";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "../util";

export default function Footer() {
  const navigate = useNavigate();
  const articleLinks = [
    { name: "Home", onclick: () => navigate("/") },
    { name: "All Articles", onclick: () => navigate("/all-articles") },
    { name: "Add Articles", onclick: () => navigate("/add-articles") },
    { name: "Signout", onclick: () => handleSignOut(navigate) },
  ];

  const aboutLinks = [
    { name: "Contact us", href: "mailto:sanket.chuahan4@gmail.com" },
    {
      name: "LinkedIn (Sanket Chauhan)",
      href: "https://www.linkedin.com/in/sanket-chauhan/",
    },
    {
      name: "LinkedIn (Priyanshu Singh)",
      href: "https://www.linkedin.com/in/priyanshu-singhh/",
    },
  ];
  return (
    <>
      <div className="bg-black text-white px-40 font-[gt-super] flex justify-around py-16">
        <div className="flex flex-col">
          <h1 className="text-lg mb-2">Article Links</h1>
          {articleLinks.map((link, index) => (
            <button
              className="text-left border-b-[1px] w-[fit-content] my-1"
              onClick={link.onclick}
              key={`footer-article-${link.name}`}
            >
              {link.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg mb-2">About</h1>
          {aboutLinks.map((link, index) => (
            <a
              className="text-left border-b-[1px] w-[fit-content] my-1"
              href={link.href}
              key={`footer-about-${link.name}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="bg-black text-white text-center pb-8">
        &#169;Copyright Sanket Chauhan and Priyanshu Singh 2022
      </div>
    </>
  );
}
