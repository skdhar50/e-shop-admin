import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config/config";

const StockSummary = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(
        `${config.SERVER_URL}/api/admin/dashboard/summary-of-products-stock`,
        config.headers
      )
      .then((res) => {
        isLoaded && setData(res.data.data);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  return (
    <div className=" border rounded  bg-white p-6 text-center space-y-6">
      <div className="text-3xl font-medium text-gray-600 border-b pb-4 border-gray-300">
        Product Stocks
      </div>
      <div className="space-y-4">
        <div className="flex items-center  justify-between px-6">
          <p className="text-2xl text-gray-600">In Stocks</p>
          <p className="text-3xl text-gray-700">
            {data.inStock} <span className="text-xl italic">Items</span>
          </p>
        </div>
        <div className="flex items-center  justify-between px-6">
          <p className="text-2xl text-gray-600">Out of Stocks</p>
          <p className="text-3xl text-gray-700">
            {data.outOfStock} <span className="text-xl italic">Items</span>
          </p>
        </div>
        <div className="flex items-center  justify-between px-6">
          <p className="text-2xl text-gray-600">Almost out of Stocks</p>
          <p className="text-3xl text-gray-700">
            {data.almostOutOfStock}{" "}
            <span className="text-xl italic">Items</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockSummary;
