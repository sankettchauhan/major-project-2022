import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { removeTokenFromLocalStorage } from "../util";

function NavLink({ children, onClick }) {
  return (
    <a
      className="ml-4 border-b-2 border-zinc-400 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

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
        <NavLink onClick={() => navigate("/home")}>All articles</NavLink>
        <NavLink onClick={() => navigate("/add-article")}>Add articles</NavLink>
        <NavLink onClick={handleSignOut}>Signout</NavLink>
      </div>
    </ul>
  );
}
