import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config/config";

const Summary = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/dashboard`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Total Users</p>
        <p className="text-4xl font-medium text-gray-700">{data.totalUser}</p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Total Sales</p>
        <p className="text-4xl font-medium text-gray-700">
          {data.totalSale} Tk
        </p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Pending Orders</p>
        <p className="text-4xl font-medium text-gray-700">
          {data.totalPendingOrder}
        </p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Categories</p>
        <p className="text-4xl font-medium text-gray-700">
          {data.totalCategory}
        </p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Brands</p>
        <p className="text-4xl font-medium text-gray-700">{data.totalBrand}</p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Total Revenue</p>
        <p className="text-4xl font-medium text-gray-700">
          {data.totalRevenue} Tk
        </p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Total Cost</p>
        <p className="text-4xl font-medium text-gray-700">{data.totalCost}</p>
      </div>
      <div className=" h-fit border rounded-sm shadow-sm bg-white text-center py-4 space-y-3">
        <p className="text-xl font-medium text-gray-600">Total Employess</p>
        <p className="text-4xl font-medium text-gray-700">
          {data.totalEmployee}
        </p>
      </div>
    </div>
  );
};

export default Summary;
