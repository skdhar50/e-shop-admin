const OrderDeliverStatus = (props) => {
  const { placedAt, statusDates } = props;
  const humanTime = (date) => {
    date = new Date(date);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  return (
    <div className="bg-white rounded text-gray-800 print:hidden">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="font-medium text-lg">Order Status</h2>
        <div className="flex space-x-1">
          <button className="flex items-center text-red-500 bg-red-100 rounded space-x-1 py-1 px-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Cancel Order</span>
          </button>
        </div>
      </div>

      {statusDates && (
        <div className="p-8">
          <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="font-medium">
                Order Placed:{" "}
                <span className="font-normal">{humanTime(placedAt)}</span>
              </h2>
            </div>
            <div className="font-medium text-sm">
              <p>An order has been placed</p>
              {/* <p className="font-normal text-gray-500">
                Wed, 15 Dec 2021 - 05:45PM
              </p> */}
            </div>
            {/* <div className="font-medium text-sm">
            <p>Processed order</p>
            <p className="font-normal text-gray-500">
              Thu, 16 Dec 2021 - 05:45PM
            </p>
          </div> */}
          </div>
          <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h2 className="font-medium">
                Processing:{" "}
                <span className="font-normal">
                  {humanTime(statusDates.processing)}
                </span>
              </h2>
            </div>
            {/* <div className="font-medium text-sm">
            <p>Packed has been picked up by courier partner</p>
            <p className="font-normal text-gray-500">
              Fri, 17 Dec 2021 - 05:45PM
            </p>
          </div> */}
          </div>
          <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <h2 className="font-medium">
                Shipping:{" "}
                <span className="font-normal">
                  {statusDates.shipped > statusDates.processing
                    ? humanTime(statusDates.shipped)
                    : ""}
                </span>
              </h2>
            </div>
          </div>

          <div className="space-y-2 border-dashed border-l-2 pl-6">
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="font-medium">
                Delivered:{" "}
                <span className="font-normal">
                  {statusDates.delivered > statusDates.shipped
                    ? humanTime(statusDates.delivered)
                    : ""}
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDeliverStatus;
