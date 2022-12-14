const OrderDetailsHeader = (props) => {
  return (
    <div className="flex justify-between items-center p-3">
      <h2 className="font-medium text-lg uppercase">
        Order #{props.orderId.slice(-10)}
      </h2>
      <button
        onClick={() => window.print()}
        className="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded space-x-1 py-1 px-1.5 border print:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <span className="font-medium">INVOICE</span>
      </button>
    </div>
  );
};

export default OrderDetailsHeader;
