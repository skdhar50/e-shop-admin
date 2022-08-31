import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import config from "../../config/config";
import InputSearch from "../common/form/InputSearch";
import SelectCompForTable from "../common/form/SelectCompForTable";
import PageFooter from "../common/PageFooter";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const CRMOrder = (props) => {
  const { data, setData, locations } = props;
  const alert = useAlert();
  const [area, setArea] = useState([]);
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
  const [notReceived, setNotReceived] = useState("");
  // console.log(notReceived);

  const columnHeader = [
    "ORDER ID",
    "Call status",
    "phone",
    "PAYMENT STATUS",
    "ORDER PLACED",
    "STATUS",
  ];
  const changeOrderStatus = (id, key, value) => {
    // console.log(id);
    // console.log(key);
    // console.log(value);
    let tempData = data.map((item) => {
      if (item._id === id) {
        item[key] = value;
      }
      return item;
    });
    setData(tempData);
    axios
      .put(
        `${config.SERVER_URL}/api/admin/orders/${id}`,
        { [key]: value },
        config.headers
      )
      .then((res) => {
        alert.success("Order was updated suceesfully!");
      })
      .catch((error) => {
        alert.error("Something wrong please try again");
        // console.log(error);
      });
  };
  const columnData = [
    {
      content: (data) => (
        <div className="mb-2">
          <Link to={`/orders/${data._id}`}>
            <h1 className="uppercase text-gray-900 hover:text-indigo-500">
              {data.order_id}
            </h1>
          </Link>
          <h2 className="text-xs ">
            Order By:{" "}
            <Link to={`../customers/`} className="hover:text-indigo-600">
              {data.address.name}
            </Link>
          </h2>

          <h2 className="text-xs">From: {data.address.city}</h2>
        </div>
      ),
    },

    {
      content: (data) => (
        <div className="mr-2">
          <SelectCompForTable
            id={data._id}
            name="call_status"
            value={data.call_status}
            handler={changeOrderStatus}
            options={[
              { name: "No Call", value: "no_call" },
              { name: "One Times", value: "one_time" },
              { name: "Two Times", value: "two_time" },
              { name: "Three Times +", value: "three_time" },
              { name: "Received & Confirmed", value: "received_confirm" },
              { name: "Received & Canceled", value: "received_cancell" },
            ]}
          />
          {data.last_call && (
            <p className="text-xs">Last Call: {data.last_call.split("T")[0]}</p>
          )}
        </div>
      ),
    },

    { content: (data) => data.address.phone },

    {
      content: (data) => (
        <div className="mr-2">
          <SelectCompForTable
            id={data._id}
            name="paymentStatus"
            value={data.paymentStatus}
            handler={changeOrderStatus}
            options={[
              { name: "Unpaid", value: "pending" },
              { name: "Paid", value: "complete" },
            ]}
          />
        </div>
      ),
    },
    { content: (data) => data.createdAt.split("T")[0] },
    {
      content: (data) => (
        <SelectCompForTable
          id={data._id}
          name="status"
          value={data.status}
          handler={changeOrderStatus}
          options={[
            { name: "Pending", value: "pending" },
            { name: "Processing", value: "processing" },
            { name: "Shipping", value: "shipped" },
            { name: "Delivered", value: "delivered" },
            { name: "Returned", value: "returned" },
            { name: "Cancelled", value: "cancelled" },
          ]}
        />
      ),
    },
  ];

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    } else if (option === "paymentStatus") {
      setOptions({ ...options, paymentStatus: value, activePage: 1 });
    } else if (option === "orderFromDate") {
      setOptions({ ...options, orderFromDate: value, activePage: 1 });
    } else if (option === "orderToDate") {
      setOptions({ ...options, orderToDate: value, activePage: 1 });
    } else if (option === "callStatus") {
      setOptions({ ...options, callStatus: value, activePage: 1 });
    } else if (option === "callFromDate") {
      setOptions({ ...options, callFromDate: value, activePage: 1 });
    } else if (option === "callToDate") {
      setOptions({ ...options, callToDate: value, activePage: 1 });
    } else if (option === "city") {
      setOptions({ ...options, city: value, activePage: 1 });
      setArea([]);
    } else if (option === "zone") {
      setOptions({ ...options, zone: value, activePage: 1 });

      const filteredArea = locations.filter((item) => {
        if (item.name === value) {
          return true;
        } else {
          return false;
        }
      })[0];
      setArea(filteredArea.upazilla);
      // console.log(filteredArea.upazilla);
    } else if (option === "area") {
      setOptions({ ...options, area: value, activePage: 1 });
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

    if (notReceived === "") {
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
          if (item.last_call && item.last_call.split("T")[0] >= callFromDate)
            return true;
          else return false;
        });
        filteredItems = [...tempItems];
      }
      if (callToDate !== "all") {
        const tempItems = filteredItems.filter((item) => {
          if (item.last_call && item.last_call.split("T")[0] <= callToDate)
            return true;
          else return false;
        });
        filteredItems = [...tempItems];
      }
    } else {
      if (notReceived === "today") {
        const today = new Date().toISOString().slice(0, 10);
        const tempItems = filteredItems.filter((item) => {
          if (
            item.last_call &&
            item.last_call.split("T")[0] === today &&
            (item.call_status === "one_time" ||
              item.call_status === "two_time" ||
              item.call_status === "three_time")
          )
            return true;
          else return false;
        });
        filteredItems = [...tempItems];
      } else if (notReceived === "yesterday") {
        let d = new Date();
        const yesterday = new Date(d.setDate(d.getDate() - 1))
          .toISOString()
          .slice(0, 10);
        const tempItems = filteredItems.filter((item) => {
          if (
            item.last_call &&
            item.last_call.split("T")[0] === yesterday &&
            (item.call_status === "one_time" ||
              item.call_status === "two_time" ||
              item.call_status === "three_time")
          )
            return true;
          else return false;
        });
        filteredItems = [...tempItems];
      } else if (notReceived === "both") {
        let d = new Date();
        const today = d.toISOString().slice(0, 10);
        const yesterday = new Date(d.setDate(d.getDate() - 1))
          .toISOString()
          .slice(0, 10);
        const tempItems = filteredItems.filter((item) => {
          if (
            item.last_call &&
            item.last_call.split("T")[0] >= yesterday &&
            item.last_call.split("T")[0] <= today &&
            (item.call_status === "one_time" ||
              item.call_status === "two_time" ||
              item.call_status === "three_time")
          )
            return true;
          else return false;
        });
        filteredItems = [...tempItems];
      }
    }
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
          item.order_id.toLowerCase().includes(searchKey.toLowerCase()) ||
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
    if (city !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.address.city === city) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (zone !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.address.address1 === zone) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (area !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.address.state === area) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    return filteredItems;
  };

  const search = (keyword) => {
    setTimeout(() => {
      setOptions({ ...options, searchKey: keyword, activePage: 1 });
    }, 300);
  };

  const paginateItems = (items) => {
    const { activePage, pageCount } = options;
    const start = (activePage - 1) * pageCount;
    const paginatedItems = items.slice(start, start + pageCount);
    return paginatedItems;
  };

  const handleClickPage = (page, totalPage) => {
    if (page < 1 || page > totalPage) return;
    setOptions({ ...options, activePage: page });
  };

  let filteredItems = data ? filterItems() : [];
  let paginatedItems = data ? paginateItems(filteredItems) : [];
  // console.log(area);

  return (
    <div className="flex space-x-4">
      <div className="w-64 h-[36rem] overflow-y-auto overflow-hidden scrollbar-table">
        <div className="w-60   flex flex-col space-y-2  text-gray-800">
          {/* call status  */}
          <div className="flex flex-col space-y-2 pb-2 bg-white shadow rounded-sm overflow-hidden">
            <h2 className="px-2 font-medium bg-slate-200">
              Called but did not respond
            </h2>
            <div className="flex flex-col w-full px-2 space-y-1">
              <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <input
                    onChange={(e) => setNotReceived("today")}
                    className="mt-1"
                    type="radio"
                    name="callNotRcvd"
                    id="today"
                    checked={notReceived === "today"}
                  />
                  <label htmlFor="today">Today</label>
                </div>
                <div className="flex items-center space-x-1">
                  <input
                    onChange={(e) => setNotReceived("yesterday")}
                    className="mt-1"
                    type="radio"
                    name="callNotRcvd"
                    id="yesterday"
                    checked={notReceived === "yesterday"}
                  />
                  <label htmlFor="yesterday">Yesterday</label>
                </div>
                <div className="flex items-center space-x-1">
                  <input
                    onChange={(e) => setNotReceived("both")}
                    className="mt-1"
                    type="radio"
                    name="callNotRcvd"
                    id="both"
                    checked={notReceived === "both"}
                  />
                  <label htmlFor="both">Both</label>
                </div>
              </div>
              <button
                onClick={() => setNotReceived("")}
                className="rounded-sm hover:bg-indigo-700 bg-indigo-600 text-white text-sm font-medium"
              >
                Clear
              </button>
            </div>
          </div>
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
                disabled={notReceived !== ""}
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
                disabled={notReceived !== ""}
                onChange={(e) =>
                  setFilterOptions("orderToDate", e.target.value)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
                name=""
                id=""
              />
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
                disabled={notReceived !== ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) => setFilterOptions("callStatus", e.target.value)}
              >
                <option value="all">All</option>
                <option value="no_call">No Call</option>
                <option value="called">Called</option>
                <option value="one_time">One Times</option>
                <option value="two_time">Two Times</option>
                <option value="three_time">Three Times +</option>
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
                disabled={notReceived !== ""}
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
                disabled={notReceived !== ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                type="date"
                onChange={(e) => setFilterOptions("callToDate", e.target.value)}
              />
            </div>
          </div>
          {/* area based filtering  */}
          <div className="flex flex-col space-y-2 pb-2 bg-white shadow rounded-sm overflow-hidden">
            <h2 className="px-2 font-medium bg-slate-200">Area</h2>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) => setFilterOptions("city", e.target.value)}
              >
                <option value="all">All</option>
                <option value="chittagong">Chittagong</option>
                <option disabled>Dhaka</option>
                <option disabled>Sylhet</option>
                <option disabled>Rajshahi</option>
                <option disabled>Rangpur</option>
                <option disabled>Khulna</option>
              </select>
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                Zone
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                onChange={(e) => setFilterOptions("zone", e.target.value)}
              >
                <option value="all">All</option>
                {options.city === "chittagong" &&
                  locations.map((item, indx) => {
                    return (
                      <>
                        <option key={"op" + indx} value={item.name}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="flex flex-col px-2">
              <label
                htmlFor=""
                className="block mb-0.5 text-sm font-medium text-gray-900"
              >
                Area
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
                name=""
                id=""
                onChange={(e) => setFilterOptions("area", e.target.value)}
              >
                <option value="all">All</option>
                {area.map((item, indx) => {
                  return (
                    <>
                      <option key={"op" + indx} value={item}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grow border">
        <div className="">
          <div className="overflow-x-auto scrollbar-table">
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[calc(100vh-12.5rem)] overflow-y-auto relative scrollbar-table">
              <TableHeader
                tableName="Total Order"
                numberOfItem={filteredItems.length}
                filterOptions={
                  <>
                    <InputSearch
                      placeholder="Search order..."
                      handler={search}
                    />
                    <FilterOption
                      label="Paymnet"
                      filterBy="paymentStatus"
                      options={[
                        { name: "Unpaid", value: "pending" },
                        { name: "Paid", value: "complete" },
                      ]}
                      onChangeHandler={setFilterOptions}
                    />
                    <FilterOption
                      label="Status"
                      filterBy="status"
                      options={[
                        { name: "Pending", value: "pending" },
                        { name: "Processing", value: "processing" },
                        { name: "Shipping", value: "shipped" },
                        { name: "Delivered", value: "delivered" },
                        { name: "Returned", value: "returned" },
                        { name: "Cancelled", value: "cancelled" },
                      ]}
                      onChangeHandler={setFilterOptions}
                    />
                    {/* <BtnSorting /> */}
                  </>
                }
              />
              <Table
                // resStatus={true}
                columnHeader={columnHeader}
                columns={columnData}
                items={paginatedItems}
                activePage={options.activePage}
                pageCount={options.pageCount}
              />
            </div>
          </div>
          {data.length > options.pageCount ? (
            <PageFooter
              totalItems={filteredItems.length}
              pageCount={options.pageCount}
              activePage={options.activePage}
              onClickPage={handleClickPage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CRMOrder;
