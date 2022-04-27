import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref) => (
  <textarea
    {...props}
    className="placeholder:text-[#F8CB2E] placeholder:font-bold placeholder:text-2xl 
        text-2xl font-bold p-2 my-3 bg-transparent rounded-md outline-1 outline outline-[#F8CB2E]
        active:bg-[#F8CB2E] active:text-[#006E7F]
        focus:bg-[#F8CB2E] focus:text-[#006E7F] 
        disabled:hover:cursor-not-allowed disabled:hover:text-[#F8CB2E] disabled:hover:bg-[#006E7F] disabled:bg-black/20 
        transition duration-300"
    ref={ref}
  />
));
