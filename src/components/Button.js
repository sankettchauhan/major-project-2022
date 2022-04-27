import React from "react";

export const Button = React.forwardRef((props, ref) => (
  <button
    className="w-[fit-content] px-4 py-2 outline outline-1 outline-[#F8CB2E] uppercase font-semibold rounded-md text-[#F8CB2E] bg-[#006E7F] h-[fit-content]
        hover:bg-[#F8CB2E] hover:text-[#006E7F]
        hover:disabled:text-[#F8CB2E] hover:disabled:bg-[#006E7F]
        disabled:cursor-not-allowed
        transition duration-300"
    {...props}
    ref={ref}
  >
    {props.children}
  </button>
));
