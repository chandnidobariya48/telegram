import React, { useState } from "react";
import icon from "../assets/telegram.svg";
import { FiPlusCircle } from "react-icons/fi";
import { RiSearch2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import remove from "../assets/delete.svg";
import edit from "../assets/edit.svg";

const BotTable = () => {
  const navigate = useNavigate();
  const [activeBot, setActiveBot] = useState({}); // Track the status of each bot by row number
  const [rowsToDisplay, setRowsToDisplay] = useState(); // State to manage the number of rows to display

  const rows = [
    { no: 1, channelName: "Harsh Bot", fromChannel: "Https://Web.T.Mes.54s", toChannel: "Https://Web.T.Mes.5ks" },
    { no: 2, channelName: "Neer Bot", fromChannel: "Https://Web.T.Mes.54s", toChannel: "Https://Web.T.Mes.5ks" },
    { no: 3, channelName: "Nirav Bot", fromChannel: "Https://Web.T.Mes.54s", toChannel: "Https://Web.T.Mes.5ks" },
    { no: 4, channelName: "Harshu Bot", fromChannel: "Https://Web.T.Mes.54s", toChannel: "Https://Web.T.Mes.5ks" },
    { no: 5, channelName: "Nira Bot", fromChannel: "Https://Web.T.Mes.54s", toChannel: "Https://Web.T.Mes.5ks" },
  ];

  // Toggle the status of a specific row
  const toggleStatus = (no) => {
    setActiveBot((prevState) => ({
      ...prevState,
      [no]: !prevState[no], // Toggle the status for this specific row
    }));
  };

  // Handle the change in the number of rows to display
  const handleRowsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setRowsToDisplay(value); // Update the number of rows to display
    }
  };

  return (
    <div className="bg-black text-white p-4 sm:p-8 md:p-14 h-auto sm:h-screen">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img src={icon} alt="Telegram Logo" className="h-5 w-5 mr-1" />
          <span className="lg:text-lg text-sm font-extrabold">Telegram Bot</span>
        </div>
        <button
          onClick={() => navigate("/detailPage")}
          className="px-2 py-1 w-[140px] md:w-[200px] bg-white rounded-md text-black text-sm sm:text-base flex justify-center items-center"
        >
          <FiPlusCircle className="mr-1" /> <span> Start new bot </span>
        </button>
      </nav>
      <hr className="border-white mb-4 my-10" />
      <div className="flex flex-wrap justify-between items-center mt-14 mb-5 mx-0 sm:mx-10">
        <input
          type="number"
          value={rowsToDisplay}  
          onChange={handleRowsChange}
          className="bg-sky-700 text-white p-2 rounded-md w-20 outline-none"
        />
        <div className="relative sm:w-0 lg:w-1/3 sm:mb-0">
          <input
            type="text"
            placeholder="Search And Find"
            className="bg-white text-center placeholder-black text-black p-1.5 rounded-3xl w-[180px] lg:w-full pl-10"
          />
          <RiSearch2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800">
              {["No", "Channel Name", "From Channel", "To Channel", "Active", "Deleted", "Actions"].map((header) => (
                <th key={header} className="py-2 px-4 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, rowsToDisplay).map(({ no, channelName, fromChannel, toChannel }) => (
              <tr key={no} className="border-b border-gray-700 text-center">
                <td className="py-2 px-4">{no}</td>
                <td className="py-2 px-4">{channelName}</td>
                <td className="py-2 px-4">{fromChannel}</td>
                <td className="py-2 px-4">{toChannel}</td>
                <td className="py-2 px-4 flex justify-center items-center space-x-2 mt-1">
                  {/* Active/Stop Switch Button */}
                  <div
                    className={`w-20 h-6 rounded-full cursor-pointer ${activeBot[no] ? "bg-green-500" : "bg-red-500"} transition-all relative`}
                    onClick={() => toggleStatus(no)} // Pass the row number to toggle the state
                  >
                    {/* White circle */}
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-all absolute top-1/2 left-0 transform -translate-y-1/2 ${
                        activeBot[no] ? "translate-x-14" : "translate-x-1"
                      }`}
                    />
                    <span className="text-white font-bold ml-2">{activeBot[no] ? "Active" : "Stop"}</span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <button>
                    <img src={remove} alt="remove" />
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button>
                    <img src={edit} alt="remove" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BotTable;
