import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../util";
import GoogleIcon from "./GoogleIcon";

// login the user
// save uid in local storage

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function Login() {
  const nav = useNavigate();

  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You  can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      saveUser(user.accessToken);
      nav("/");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1000">
      <div className="px-8 py-20 bg-red-100">
        <button className="flex p-3 border-2 rounded-lg" onClick={handleAuth}>
          <span>
            <GoogleIcon />
          </span>
          <span className="ml-2">SIGN IN WITH GOOGLE</span>
        </button>
      </div>
    </div>
  );
}
