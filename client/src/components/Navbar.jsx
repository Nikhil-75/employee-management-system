import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import LogoComponents from "./LogoComponents";
import { useMainContext } from "../context/mainContext";
import { selectUser } from "../slice/auth.slice";

const Navbar = () => {
  const user = useSelector(selectUser);
  const { logoutHandler } = useMainContext();

  return (
    <header className="w-full shadow">
      <div className="w-[96%] lg:w-[80%] mx-auto py-4 flex items-center justify-between">
        <LogoComponents />

        <ul className="flex items-center justify-center gap-x-3">
          <li>
            <Link to="/" className="font-pmedium">
              Dashboard
            </Link>
          </li>

          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="font-pmedium px-4 py-2 bg-indigo-500 text-white rounded"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="font-pmedium px-4 py-2 bg-red-500 text-white rounded"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={logoutHandler}
                className="font-pmedium px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
