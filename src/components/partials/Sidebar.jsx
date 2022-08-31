import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { sidebarList } from "../../data/sidebarList";
import SidebarFooter from "../common/SidebarFooter";
import SidebarHeader from "../common/SidebarHeader";
import SidebarNavItem from "../common/SidebarNavItem";
const Sidebar = () => {
  const contextData = useContext(GlobalContext);
  // console.log(contextData);
  return (
    <aside className="sticky top-0 h-screen z-30 print:hidden">
      <div id="sm-sidebar" className={contextData.sidebar.smSidebarClass}>
        <div
          id="sidebar"
          className={contextData.sidebar.sidebarClass}
          style={{ minWidth: contextData.sidebar.sidebarWidth }}
        >
          <div
            id="sidebar-inner"
            className={contextData.sidebar.innerSidebarClass}
          >
            <div className="max-w-[13.5rem]">
              <div className="flex flex-col">
                <SidebarHeader smallSidebar={contextData.sidebar.isSmall} />
                <ul className="flex flex-col space-y-3 mt-6 pr-1.5">
                  {sidebarList.map((item, indx) => {
                    return (
                      <SidebarNavItem
                        key={indx}
                        indx={indx}
                        title={item.title}
                        icon={item.icon}
                        to={item.to}
                      />
                    );
                  })}
                </ul>
              </div>
              {!contextData.sidebar.isSmall && <SidebarFooter />}
            </div>
          </div>
        </div>
      </div>
    </aside>
    // </SidebarContext.Provider>
  );
};

export default Sidebar;
