import { useState } from "react";
import "../assests/css/style.css";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "./common/Modal";
import ModalDelete from "./common/ModalDelete";
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import MainRoutes from "./routes/MainRoutes";

function Layout() {
  const [sidebar, setSidebar] = useState({
    showMobileSidebar: false,
    showSidebar: false,
    showLogo: true,
    smSidebarClass: "hidden !absolute md:!static md:!block h-full",
    sidebarClass:
      "min-w-[16rem] max-w-[16rem] h-full transition-all duration-100",
    sidebarWidth: "256px",
    innerSidebarClass:
      "flex flex-col h-full pl-6 pr-5d py-2 justify-between bg-gray-800 text-slate-200 overflow-hidden overflow-y-auto md:overflow-hidden md:hover:overflow-y-auto scrollbar",
    titleDisplay: "block",
    showSubMenuButton: true,
  });
  const [modal, setModal] = useState({
    show: false,
    mode: "",
    compName: "",
    data: {},
    reload: () => {},
    delete: { show: false, callback: null },
  });
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (indx) => {
    // setActiveTab(indx);
    setActiveTab(() => indx);
  };
  const handleSidebar = () => {
    let sidebarData = { ...sidebar };
    if (sidebarData.isSmall) {
      sidebarData.isSmall = false;
      sidebar.showLogo = true;
      sidebarData.titleDisplay = "block";
      sidebarData.showSubMenuButton = true;
      sidebarData.sidebarWidth = "256px";
    } else {
      sidebarData.isSmall = true;
      sidebar.showLogo = false;
      sidebarData.titleDisplay = "none";
      sidebarData.showSubMenuButton = false;
      sidebarData.sidebarWidth = "80px";
    }
    setSidebar(sidebarData);
  };
  const showMobileSidebar = () => {
    let sidebarData = { ...sidebar };
    if (sidebarData.showMobileSidebar) {
      sidebarData.showMobileSidebar = false;
      sidebarData.smSidebarClass =
        "hidden !absolute md:!static md:!block h-full";
    } else {
      sidebarData.showMobileSidebar = true;
      sidebarData.smSidebarClass = "!absolute md:!static md:!block h-full";
    }
    setSidebar(sidebarData);
  };

  const handlerDeleteModal = (callback = "") => {
    let tempModal = { ...modal };
    tempModal.delete.show = tempModal.delete.show ? false : true;
    tempModal.delete.callback = callback;
    setModal({ ...tempModal });
  };
  const handleModal = (
    compName = "",
    mode = "create",
    reload = () => {},
    data = {}
  ) => {
    let tempModal = { ...modal };
    if (tempModal.show) {
      tempModal.show = false;
      tempModal.compName = "";
      tempModal.mode = "";
      tempModal.data = {};
      tempModal.reload = reload;
    } else {
      tempModal.show = true;
      tempModal.compName = compName;
      tempModal.mode = mode;
      tempModal.data = data;
      tempModal.reload = reload;
    }
    setModal(tempModal);
  };

  return (
    <>
      <GlobalContext.Provider
        value={{
          sidebar,
          handleSidebar,
          showMobileSidebar,
          modal,
          handleModal,
          handlerDeleteModal,
          activeTab,
          handleActiveTab,
        }}
      >
        <main className="flex">
          <Sidebar />
          <div className="flex flex-col grow max-w-[100vw] md:w-[calc(100%_-_16rem)] xl:max-w-[100vw]">
            <Header />
            <MainRoutes />
          </div>
        </main>
        <ModalDelete />
        <Modal />
      </GlobalContext.Provider>
    </>
  );
}

export default Layout;
