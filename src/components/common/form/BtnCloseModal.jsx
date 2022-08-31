import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import IconCross from "../icons/IconCross";

const BtnCloseModal = () => {
  const contextData = useContext(GlobalContext);
  return (
    <button
      className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-800 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
      // ariaLabel="close modal"
      onClick={contextData.handleModal}
    >
      <IconCross />
    </button>
  );
};

export default BtnCloseModal;
