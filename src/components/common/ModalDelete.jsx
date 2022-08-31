import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const ModalDelete = () => {
  const contextData = useContext(GlobalContext);
  const deleteItem = () => {
    contextData.modal.delete.callback();
  };
  return contextData.modal.delete.show ? (
    <div
      id="modal-delete"
      className="py-12 bg-gray-900 bg-opacity-50 transition duration-150 ease-in-out z-50 absolute top-0 right-0 bottom-0 left-0 h-full"
    >
      <div role="alert" className="mx-auto w-[30rem] mt-30">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-xl font-bold">Delete category</span>
          </div>
          <p className="text-gray-900 font-lg font-semibold tracking-normal leading-tight">
            Are you sure you want to delete this category?
          </p>
          <div>
            <div className="flex items-center justify-start w-full mt-12">
              <button
                onClick={deleteItem}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out bg-red-500 rounded text-white px-8 py-1.5 text-sm font-semibold hover:bg-red-700"
              >
                Yes, Delete it
              </button>
              <button
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-1.5 text-sm font-semibold"
                onClick={contextData.handlerDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onClick={contextData.handlerDeleteModal}
            aria-label="close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalDelete;
