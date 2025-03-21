import Lottie from "lottie-react";
import pen from "../assets/pen.json";

export const Spinner = () => {
  return (
    <div className=" w-full h-screen flex justify-center items-center ">
    <Lottie animationData={pen} className="w-60 h-60"></Lottie>
    </div>
  );
};
