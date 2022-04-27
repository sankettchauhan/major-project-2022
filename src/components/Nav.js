import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { removeTokenFromLocalStorage } from "../util";

export default function Nav() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      removeTokenFromLocalStorage();
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="flex justify-between px-40 border-b-2 bg-blend-multiply ">
      <li>
        <img
          className="h-[80px] cursor-pointer"
          src={logo}
          alt="maadhyam"
          onClick={() => navigate("/")}
        />
      </li>
      <div className="flex my-auto">
        <a
          className="ml-4 border-b-2 border-zinc-400 cursor-pointer"
          onClick={() => navigate("/all-articles")}
        >
          All Articles
        </a>
        <a
          className="ml-4 border-b-2 border-zinc-400 cursor-pointer"
          onClick={handleSignOut}
        >
          Signout
        </a>
      </div>
    </ul>
  );
}
