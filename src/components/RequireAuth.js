import { useJwt } from "react-jwt";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../util";

// enclose the protected page in this tag
export default function RequireAuth({ children }) {
  //   get token from local storage
  let location = useLocation();
  let token = getToken();
  const { decodedToken, isExpired } = useJwt(token);
  console.log("redirected from: ", location);
  console.log("token: ", token);
  console.log("is expired: ", isExpired);

  // error - when token is not in local storage
  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //   error - token has expired / wrong token
  if (isExpired) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("decoded token: ", decodedToken);

  return children;
}
