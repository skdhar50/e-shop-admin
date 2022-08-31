import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const SidebarHandleButton = () => {
  const contextData = useContext(GlobalContext);
  return (
    <button
      onClick={contextData.handleSidebar}
      className="hidden md:block bg-gray-700 p-1 rounded-full hover:bg-gray-900 hover:text-white"
    >
      <svg
        id="btn-sidebar"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform duration-100 ${
          contextData.sidebar.isSmall ? "rotate-180" : ""
        }`}
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
  );
};

export default SidebarHandleButton;
