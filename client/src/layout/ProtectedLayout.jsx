import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
//import {AuthSlicePath} from '../redux/slice/auth.slice'
import { selectUser } from "../slice/auth.slice";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

  const sidebarItemList = [
    {
      name: "Dashboard",
      link: '/',
      Icon: MdDashboard
    },
    {
      name: 'Add Employee',
      link: '/add-employee',
      Icon: FaUser
    }
  ]
const ProtectedLayout = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user]);
  if (loading) {
    return <div>loading...</div>;
  }


  return (
    <>
      <div className="flex w-[90%] mx-auto items-start py-10 gap-x-1">

        <div className="w-1/4 min-h-[30vh] bg-gray-300 py-4">
               {
                sidebarItemList.map((cur,i)=> {
                  return
                })
               }
        </div>
        <section className="w-full">
          <Outlet />
        </section>
      </div>
      
    </>
  );
};

export default ProtectedLayout;

const SidebarItem = (item)=>{
     const {pathname} = useLocation();
     return <div className="w-full py-3 px-3 flex justify-between items-center">
      <item.Icon/> <span>{item.name}</span>
      </div>
}