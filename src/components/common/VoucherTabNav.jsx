const VoucherTabNav = (props) => {
  const { tab, setTab } = props;
  return (
    <div className="bg-slate-200 flex justify-center">
      <div className="flex">
        <div className={`${tab === "products" ? "bg-white" : ""}`}>
          <div
            className={`${
              tab === "products" ? "bg-slate-200" : ""
            }  py-0.5 rounded-b-lg rounded-l-none px-8 h-full`}
          >
            {" "}
          </div>
        </div>
        <div className={`${tab === "products" ? "bg-slate-200" : "bg-white"}`}>
          <button
            onClick={() => setTab("products")}
            className={`${
              tab === "products"
                ? "bg-white px-8 py-0.5 rounded-t-lg"
                : "bg-slate-200 px-8 py-0.5 rounded-b-lg rounded-l-none text-slate-500 hover:text-gray-900"
            } ${tab === "appliers" ? "rounded-r-none" : ""}`}
          >
            Products
          </button>
        </div>
        <div className={`${tab === "users" ? "bg-slate-200" : "bg-white"}`}>
          <button
            onClick={() => setTab("users")}
            className={`${
              tab === "users"
                ? "bg-white px-8 py-0.5 rounded-t-lg"
                : "bg-slate-200 px-8 py-0.5 rounded-b-lg text-slate-500 hover:text-gray-900"
            } ${tab === "products" ? "rounded-r-none" : "rounded-l-none"}`}
          >
            Customers
          </button>
        </div>
        <div className={`${tab === "appliers" ? "bg-slate-200" : "bg-white"}`}>
          <button
            onClick={() => setTab("appliers")}
            className={`${
              tab === "appliers"
                ? "bg-white px-8 py-0.5 rounded-t-lg"
                : "bg-slate-200 px-8 py-0.5 rounded-b-lg rounded-r-none text-slate-500 hover:text-gray-900"
            } ${tab === "products" ? "rounded-l-none" : ""}`}
          >
            Appliers
          </button>
        </div>
        <div className={`${tab === "appliers" ? "bg-white" : ""}`}>
          <div
            className={`${
              tab === "appliers" ? "bg-slate-200" : ""
            }  py-0.5 rounded-b-lg rounded-r-none px-8 h-full`}
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherTabNav;
