import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { handleSignOut, removeTokenFromLocalStorage } from "../util";

function NavLink({ children, onClick }) {
  return (
    <button
      className="ml-8 cursor-pointer capitalize text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Nav({ bg }) {
  const navigate = useNavigate();

  return (
    <ul
      className={`flex justify-between px-40 border-b-[1px]  ${
        bg && `${bg}  border-black`
      }`}
    >
      <li>
        <img
          className="h-[80px] cursor-pointer"
          src={logo}
          alt="maadhyam"
          onClick={() => navigate("/")}
        />
      </li>
      <div className="flex my-auto">
        <NavLink onClick={() => navigate("/")}>Home</NavLink>
        <NavLink onClick={() => navigate("/all-articles")}>
          All articles
        </NavLink>
        <NavLink onClick={() => navigate("/add-article")}>Add articles</NavLink>
        <NavLink onClick={() => handleSignOut(navigate)}>Signout</NavLink>
      </div>
    </ul>
  );
}
