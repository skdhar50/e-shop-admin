import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import SidebarHandleButton from "./SidebarHandleButton";

const SidebarHeader = (props) => {
  const contextData = useContext(GlobalContext);
  return (
    <div className="flex justify-between items-center py-3">
      {!props.smallSidebar && (
        <Link id="logo" to="/" className="text-2xl font-bold">
          PUCShop
        </Link>
      )}
      <SidebarHandleButton />

      <button
        onClick={contextData.showMobileSidebar}
        className="md:hidden bg-gray-700 p-1 rounded-full hover:bg-gray-900 hover:text-white"
      >
        <svg
          id="btn-sidebar"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transition-transform duration-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default SidebarHeader;
