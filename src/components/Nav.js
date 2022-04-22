import React from "react";
import logo from "../images/logo.png";

export default function Nav() {
  return (
    <ul className="flex justify-between px-40 border-b-2 bg-blend-multiply ">
      <li>
        <img className="h-[80px]" src={logo} alt="maadhyam" />
      </li>
      <div className="flex my-auto">
        <a className="ml-4 border-b-2 border-zinc-400 cursor-pointer">
          All Articles
        </a>
        <a className="ml-4 border-b-2 border-zinc-400 cursor-pointer">
          Search Articles
        </a>
      </div>
    </ul>
  );
}
