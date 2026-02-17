import clsx from "clsx";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa";

const CustomLoaderButton = ({
  type = "submit",
  isLoading = false,
  text = "",
  className = "",
}) => {
  return (
 <button
  type={type}
  disabled={isLoading}
  className={clsx(
    className,
    "w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 flex items-center justify-center gap-x-1 py-2 rounded text-white"
  )}
>
      <span>{text}</span>
      {isLoading ? <CgSpinner className='text-xl animate-spin' /> : <FaArrowRight />}
    </button>
  );
};

export default CustomLoaderButton;
