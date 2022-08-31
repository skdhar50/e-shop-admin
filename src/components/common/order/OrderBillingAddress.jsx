const OrderBillingAddress = () => {
  return (
    <div className="flex flex-col bg-white px-3 rounded space-y-2 pb-2">
      <div className="flex items-center space-x-1 border-b py-3">
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h2 className="font-medium">Billing Address</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="font-medium">josephparker@gmail.com</h2>
        <p>+(256) 245451 451</p>
        <p>2186 Joyce Street Rocky Mount</p>
        <p>California - 24567</p>
        <p>United States</p>
      </div>
    </div>
  );
};

export default OrderBillingAddress;
