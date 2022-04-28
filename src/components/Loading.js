import image from "../images/logo.png";

export default function Loading() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <div className=" animate-bounce">
        <img src={image} alt="logo" className="h-40 w-40" />
      </div>
    </div>
  );
}
