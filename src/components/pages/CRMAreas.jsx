import { useState } from "react";
import { useAlert } from "react-alert";

const CRMAreas = (props) => {
  const { data, setData, locations, setLocation } = props;
  const alert = useAlert();
  const [zone, setZone] = useState([]);
  const [area, setArea] = useState([]);
  const [activeCity, setActiveCity] = useState("");
  const [activeZone, setActiveZone] = useState("");
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    paymentStatus: "all",
    searchKey: "all",

    orderFromDate: "all",
    orderToDate: "all",

    callStatus: "all",
    callFromDate: "all",
    callToDate: "all",

    city: "all",
    zone: "all",
    area: "all",
  });

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    } else if (option === "paymentStatus") {
      setOptions({ ...options, paymentStatus: value, activePage: 1 });
    } else if (option === "orderFromDate") {
      setOptions({ ...options, orderFromDate: value, activePage: 1 });
    } else if (option === "orderToDate") {
      setOptions({ ...options, orderToDate: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const {
      status,
      paymentStatus,
      searchKey,
      orderFromDate,
      orderToDate,
      callStatus,
      callFromDate,
      callToDate,
      city,
      area,
      zone,
    } = options;

    let filteredItems = [...data];

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (paymentStatus !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.paymentStatus === paymentStatus) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item._id.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.address.city.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.address.phone.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.createdAt.toLowerCase().includes(searchKey.toLowerCase())
        ) {
          return true;
        } else return false;
      });
      filteredItems = [...tempItems];
    }
    if (orderFromDate !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.createdAt.split("T")[0] >= orderFromDate) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (orderToDate !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.createdAt.split("T")[0] >= orderToDate) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (callStatus !== "all") {
      let tempItems = [];
      if (callStatus === "called") {
        tempItems = filteredItems.filter((item) => {
          if (
            item.call_status === "one_time" ||
            item.call_status === "two_time" ||
            item.call_status === "three_time" ||
            item.call_status === "received_confirm" ||
            item.call_status === "received_cancell"
          )
            return true;
          else return false;
        });
      } else if (callStatus === "not_received") {
        tempItems = filteredItems.filter((item) => {
          if (
            item.call_status === "one_time" ||
            item.call_status === "two_time" ||
            item.call_status === "three_time"
          )
            return true;
          else return false;
        });
      } else if (callStatus === "received") {
        tempItems = filteredItems.filter((item) => {
          if (
            item.call_status === "received_confirm" ||
            item.call_status === "received_cancell"
          )
            return true;
          else return false;
        });
      } else {
        tempItems = filteredItems.filter((item) => {
          if (item.call_status === callStatus) return true;
          else return false;
        });
      }

      filteredItems = [...tempItems];
    }
    if (callFromDate !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.last_call.split("T")[0] >= callFromDate) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (callToDate !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.last_call.split("T")[0] <= callToDate) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (city !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.address.city === city) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (zone !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.address.state === zone) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (area !== "all") {
    }
    return filteredItems;
  };

  let filteredItems = data ? filterItems() : [];

  const mostAreas = () => {
    let areas = {};
    for (let i = 0; i < filteredItems.length; i++) {
      const city = filteredItems[i].address.city;
      if (areas.hasOwnProperty(city)) {
        areas[city] = areas[city] + 1;
      } else {
        areas[city] = 1;
      }
    }
    let entries = Object.entries(areas);
    let sorted = entries.sort((b, a) => a[1] - b[1]);
    return sorted;
  };
  // childs of city
  const showZone = (city) => {
    setArea([]);
    setActiveCity(city);
    setActiveZone("");
    const cityProducts = filteredItems.filter((item) => {
      if (item.address.city === city) return true;
      else return false;
    });

    let zones = {};
    for (let i = 0; i < cityProducts.length; i++) {
      const zone = cityProducts[i].address.address1;
      if (zones.hasOwnProperty(zone)) {
        zones[zone] = zones[zone] + 1;
      } else {
        zones[zone] = 1;
      }
    }
    let entries = Object.entries(zones);
    let sorted = entries.sort((b, a) => a[1] - b[1]);
    setZone(sorted);
    // console.log(sorted);
  };

  // childs of upazila
  const showArea = (zone) => {
    setActiveZone(zone);
    const cityProducts = filteredItems.filter((item) => {
      if (item.address.address1 === zone) return true;
      else return false;
    });

    let zones = {};
    for (let i = 0; i < cityProducts.length; i++) {
      const zone = cityProducts[i].address.state;
      if (zones.hasOwnProperty(zone)) {
        zones[zone] = zones[zone] + 1;
      } else {
        zones[zone] = 1;
      }
    }
    let entries = Object.entries(zones);
    let sorted = entries.sort((b, a) => a[1] - b[1]);
    setArea(sorted);
    // console.log(sorted);
  };

  return (
    <div className="flex space-x-2">
      <div className="w-64 h-[36rem] overflow-y-auto overflow-hidden">
        <div className="w-60   flex flex-col space-y-2  text-gray-800">
          {/* order date  */}
          <div className="flex flex-col space-y-2 pb-2 bg-white shadow rounded-sm overflow-hidden">
            <h2 className="px-2 font-medium bg-slate-200">Date</h2>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                From
              </label>
              <input
                onChange={(e) =>
                  setFilterOptions("orderFromDate", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
              />
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                To
              </label>
              <input
                onChange={(e) =>
                  setFilterOptions("orderToDate", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
                name=""
                id=""
              />
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) => setFilterOptions("status", e.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="returned">Returned</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          {/* call status  */}
          <div className="flex flex-col space-y-2 pb-2 bg-white shadow rounded-sm overflow-hidden">
            <h2 className="px-2 font-medium bg-slate-200">Call</h2>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) => setFilterOptions("callStatus", e.target.value)}
              >
                <option value="all">All</option>
                <option value="no_call">No Call</option>
                <option value="called">Called</option>
                <option value="one_time">One Time</option>
                <option value="two_time">Two Time</option>
                <option value="three_time">Three Time +</option>
                <option value="received">Received</option>
                <option value="not_received">Not Received</option>
                <option value="received_confirm">Received & Confirmed</option>
                <option value="received_cancell">Received & Cancelled</option>
              </select>
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                From
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
                onChange={(e) =>
                  setFilterOptions("callFromDate", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                To
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
                onChange={(e) => setFilterOptions("callToDate", e.target.value)}
              />
            </div>
          </div>

          {/* payment status  */}
          <div className="flex flex-col space-y-2 pb-2 bg-white shadow rounded-sm overflow-hidden">
            <label className="px-2 font-medium bg-slate-200">
              Payment Status
            </label>
            <div className="flex flex-col px-2">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) =>
                  setFilterOptions("paymentStatus", e.target.value)
                }
              >
                <option value="all">All</option>
                <option value="pending">Unpaid</option>
                <option value="complete">Paid</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grow grid grid-cols-3 bg-white p-2">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-medium border-b">City</h2>
          {mostAreas().map((item, indx) => {
            return (
              <button
                onClick={() => showZone(item[0])}
                className={`flex justify-between py-1 w-full ${
                  activeCity === item[0] ? "bg-slate-100" : "bg-white"
                }`}
                key={`${item[0]}-${indx}`}
              >
                <div className="flex items-center space-x-4 font-medium">
                  <span className="flex justify-center items-center bg-slate-100 rounded-full w-8 h-8">
                    {indx + 1}
                  </span>
                  <h2>{item[0]}</h2>

                  <span className="bg-gray-500 text-white px-4 rounded-2xl">
                    {item[1]}
                  </span>
                </div>
                <div></div>
              </button>
            );
          })}
        </div>
        {zone.length > 0 && (
          <dib className="flex flex-col  bg-slate-100 pl-2">
            <h2 className="text-lg border-b mb-2">
              <b className="font-medium">Zones</b> of {activeCity}
            </h2>
            {zone.map((item, indx) => {
              return (
                <button
                  onClick={() => showArea(item[0])}
                  className={`flex justify-between py-1 w-full ${
                    activeZone === item[0] ? "bg-slate-300" : "bg-slate-100"
                  }`}
                  key={`${item[0]}-${indx}`}
                >
                  <div className="flex items-center space-x-4 font-medium text-sm">
                    <span className="flex justify-center items-center bg-slate-300 rounded-full w-6 h-6">
                      {indx + 1}
                    </span>
                    <h2>{item[0]}</h2>

                    <span className="bg-gray-700 text-white px-4 rounded-2xl">
                      {item[1]}
                    </span>
                  </div>
                  <div></div>
                </button>
              );
            })}
          </dib>
        )}
        {area.length > 0 && (
          <dib className="flex flex-col pl-2 bg-slate-200">
            <h2 className="text-lg  border-b border-slate-300 mb-2">
              <b className="font-medium">Areas</b> of {activeZone}
            </h2>
            {area.map((item, indx) => {
              return (
                <button
                  className="flex justify-between py-1 "
                  key={`${item[0]}-${indx}`}
                >
                  <div className="flex items-center space-x-4 font-medium text-sm">
                    <span className="flex justify-center items-center bg-slate-300 rounded-full w-6 h-6">
                      {indx + 1}
                    </span>
                    <h2>{item[0]}</h2>

                    <span className="bg-gray-700 text-white px-4 rounded-2xl">
                      {item[1]}
                    </span>
                  </div>
                  <div></div>
                </button>
              );
            })}
          </dib>
        )}
      </div>
    </div>
  );
};

export default CRMAreas;
