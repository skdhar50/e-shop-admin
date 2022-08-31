const PageFooter = (props) => {
  const { totalItems, pageCount, activePage, onClickPage } = props;
  const totalPages = Math.ceil(totalItems / pageCount);
  const start = (activePage - 1) * pageCount + 1;
  const end = start + pageCount - 1;

  return (
    <div className="flex justify-between items-center py-2 space-x-2 border-gray-200">
      <p className="font-medium text-gray-600">
        {`Showing ${start} to ${
          end > totalItems ? totalItems : end
        } results of ${totalItems}
         items`}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => onClickPage(activePage - 1, totalPages)}
          disabled={activePage === 1}
          className={`flex space-x-1 font-medium items-center p-2 border bg-gray-50  rounded ${
            activePage === 1 ? "text-gray-400" : "text-indigo-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Previous </span>
        </button>

        <button
          onClick={() => onClickPage(activePage + 1, totalPages)}
          disabled={activePage === totalPages}
          className={`flex space-x-1 font-medium items-center p-2 border bg-gray-50  rounded ${
            activePage === totalPages ? "text-gray-400" : "text-indigo-600"
          }`}
        >
          <span>Next </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PageFooter;
