import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../util";
import GoogleIcon from "./GoogleIcon";
import bg from "../images/library.jpg";
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
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      saveUser(user.accessToken);
      nav("/");
    } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    }
  };
  return (
    <div
      className={`h-screen w-screen relative grid place-content-center text-white`}
    >
      <img
        src={bg}
        alt="library"
        className="absolute -z-10 h-screen w-screen object-cover"
      />
      <div className="z-10 glass-card px-16 py-20">
        <h1 className="text-2xl mb-4 font-bold leading-[0.8]">
          Login to <span className="font-[gt-super]">Maadhyam</span>
        </h1>
        <button
          className="flex py-3 px-6 rounded-lg bg-white text-black mb-4"
          onClick={handleAuth}
        >
          <span>
            <GoogleIcon />
          </span>
          <span className="ml-2">SIGN IN WITH GOOGLE</span>
        </button>
        <h1>or</h1>
        <h1 className="text-2xl mb-4 font-bold">Continue with email</h1>
        <div className="flex flex-col">
          <input
            className="mb-2 rounded-md px-4 py-2 text-black"
            type="text"
            placeholder="Enter email"
          />
          <input
            className="mb-2 rounded-md px-4 py-2 text-black"
            type="password"
            placeholder="Enter password"
          />
          <button className="bg-white text-black uppercase w-[fit-content] px-4 py-1 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
