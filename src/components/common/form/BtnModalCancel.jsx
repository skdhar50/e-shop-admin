import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";

const BtnModalCancel = () => {
  const contextData = useContext(GlobalContext);
  return (
    <button
      type="button"
      className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm font-medium"
      onClick={contextData.handleModal}
    >
      Cancel
    </button>
  );
};

export default BtnModalCancel;
