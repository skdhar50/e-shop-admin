import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
const SidebarNavItem = (props) => {
  const { title, icon, to, indx } = props;

  const contextData = useContext(GlobalContext);
  const active = (indx) => {
    setTimeout(() => {
      contextData.handleActiveTab(indx);
    }, 0);
  };
  return (
    <li>
      <div
        className={`fgroup rounded p-1 hover:bg-gray-900  ${
          contextData.activeTab === indx ? "bg-gray-900" : ""
        } pl-0 flex space-x-1`}
      >
        <div className="w-[0.20rem] flex items-center">
          <div
            className={`bg-white w-full rounded-r-lg ${
              contextData.activeTab === indx
                ? "h-full transition-all duration-500"
                : "h-0"
            }`}
          ></div>
        </div>
        <div className="grow flex justify-between items-center">
          <NavLink
            to={to}
            className={(st) => {
              if (st.isActive) {
                active(indx);
              }
            }}
            // onClick={() => contextData.handleActiveTab(indx)}
          >
            <div className="flex grow items-center">
              <img src={icon} alt={title} />
              <span
                id="sidebar-item-title"
                className="sidebar-item-title ml-2 font-semibold"
                style={{ display: contextData.sidebar.titleDisplay }}
              >
                {title}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </li>
  );
};

export default SidebarNavItem;
