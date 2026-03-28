// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
// import { AuthSlicePath } from "../redux/slice/auth.slice";

// import { MdDashboard } from "react-icons/md";
// import { FaUser } from "react-icons/fa";  
// import clsx from "clsx";

// const sidebarItemList = [
//   {
//     name: "Dashboard",
//     link: "/",
//     Icon: MdDashboard,
//   },
//   {
//     name: "Add Employee",
//     link: "/add-employee",
//     Icon: FaUser,
//   },
//   {
//     name: "All Employee",
//     link: "/all-employee",
//     Icon: FaUser,   // ✅ FIXED
//   },
// ];

// const ProtectedLayout = () => {
//   const user = useSelector(AuthSlicePath);
//   const [loading, setLoading] = useState(true);
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex w-[90%] mx-auto flex-col lg:flex-row py-10 gap-4">
//       <div className="w-1/4 hidden lg:flex flex-col min-h-[70vh] bg-gray-200 py-4">
//         {sidebarItemList.map((cur, i) => (
//           <SidebarMenuItem item={cur} key={i} />
//         ))}
//       </div>

//       <section className="w-full">
//         <Outlet />
//       </section>
//     </div>
//   );
// };

// export default ProtectedLayout;

// const SidebarMenuItem = ({ item }) => {
//   const { pathname } = useLocation();

//   return (
//     <Link
//       to={item.link}
//       className={clsx(
//         "w-full py-3 px-3 flex gap-x-3 items-center hover:bg-gray-300 rounded",
//         item.link === pathname && "bg-gray-300"
//       )}
//     >
//       <item.Icon className="text-2xl" />
//       <span>{item.name}</span>
//     </Link>
//   );
// };


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { AuthSlicePath } from "../redux/slice/auth.slice";
import ScreenLoaderComponent from "../components/ScreenLoaderComponent";

import { MdDashboard } from "react-icons/md";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import clsx from "clsx";
import { useMainContext } from "../context/mainContext";

const sidebarItemList = [
  {
    name: "Dashboard",
    link: "/",
    Icon: MdDashboard,
  },
  {
    name: "Add Employee",
    link: "/add-employee",
    Icon: FaUser,
  },
  {
    name: "All Employee",
    link: "/all-employee",
    Icon: FaUser,
  },
];

const ProtectedLayout = () => {
  const user = useSelector(AuthSlicePath);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logoutHandler } = useMainContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return <ScreenLoaderComponent />;
  }

  return (
    <div className="flex w-[95%] mx-auto flex-col lg:flex-row py-10 gap-4">
      
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 hidden lg:flex flex-col min-h-[70vh] bg-gray-200 py-4 rounded shadow">
        
        {sidebarItemList.map((cur, i) => (
          <SidebarMenuItem item={cur} key={i} />
        ))}

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          className="mt-auto mx-3 flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <section className="w-full bg-white p-4 rounded shadow">
        <Outlet />
      </section>
    </div>
  );
};

export default ProtectedLayout;

// Sidebar Item Component
const SidebarMenuItem = ({ item }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.link}
      className={clsx(
        "w-full py-3 px-3 flex gap-x-3 items-center hover:bg-gray-300 rounded",
        item.link === pathname && "bg-gray-300 font-semibold"
      )}
    >
      <item.Icon className="text-xl" />
      <span>{item.name}</span>
    </Link>
  );
};
