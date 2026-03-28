import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";   

const EmpCard = ({ data, onDelete }) => {
  return (
    <tr>
      <td className="py-3 px-2 border-b text-center font-bold border-r">
        {data.empId}
      </td>
      <td className="py-3 px-2 border-b text-center border-r">
        {data.name}
      </td>
      <td className="py-3 px-2 border-b text-center border-r">
        {data.email}
      </td>
      <td className="py-3 px-2 border-b text-center border-r">
        <img
          src={data.image}
          className="w-20 h-20 rounded-full mx-auto"
          alt="employee"
        />
      </td>

      <td className="text-center border-b">
        <button
          onClick={() => onDelete(data._id)}
          className="px-4 py-2 mx-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>

        {/*FIXED ICON */}
        <Link
          to={"/update-employee/" + data._id}
          className="px-4 py-2 mx-2 bg-green-500 text-white rounded inline-flex items-center"
        >
          <FaEdit />
        </Link>
      </td>
    </tr>
  );
};

export default EmpCard;



