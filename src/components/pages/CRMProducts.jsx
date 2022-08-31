import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
import PageFooter from "../common/PageFooter";
import BtnSorting from "../common/table/BtnSorting";
import ItemImg from "../common/table/ItemImg";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
const CRMProducts = (props) => {
  const { data, locations } = props;

  const [area, setArea] = useState([]);
  const [products, setProducts] = useState([]);
  //   let products = [];
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,

    orderFromDate: "all",
    orderToDate: "all",

    city: "all",
    zone: "all",
    area: "all",
  });

  const columnHeader = ["name", "price", "Qty", "status", "Total Sell"];

  const columnData = [
    {
      content: (product) => (
        <div>
          <ItemImg
            link={`../products/${product._id}`}
            imgLink={product.photos.length > 0 ? product.photos[0] : ""}
            title={product.name}
          />
        </div>
      ),
    },
    { content: (data) => data.price },
    { content: (data) => data.quantity },
    {
      content: (product) => {
        if (product.status === "active") {
          return (
            <div className="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
              Active
            </div>
          );
        } else
          return (
            <div className="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
              Inactive
            </div>
          );
      },
    },
    {
      content: (data) => (
        <div className="flex justify-end mr-5">
          <div className="flex w-8 h-8 rounded-full text-gray-900 bg-slate-200 items-center justify-center">
            {data.count}
          </div>
        </div>
      ),
    },
  ];

  const filterItems = () => {
    const { orderFromDate, orderToDate, city, area, zone } = options;

    let filteredItems = [...data].filter((item) => {
      if (item.status === "delivered") return true;
      else return false;
    });

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
  const setFilterOptions = (option, value) => {
    if (option === "orderFromDate") {
      setOptions({ ...options, orderFromDate: value, activePage: 1 });
    } else if (option === "orderToDate") {
      setOptions({ ...options, orderToDate: value, activePage: 1 });
    } else if (option === "city") {
      setOptions({
        ...options,
        city: value,
        area: "all",
        zone: "all",
        activePage: 1,
      });
      setArea([]);
    } else if (option === "zone") {
      setOptions({ ...options, zone: value, area: "all", activePage: 1 });
      const filteredArea = locations.filter((item) => {
        if (item.name === value) {
          return true;
        } else {
          return false;
        }
      })[0];
      setArea(filteredArea.upazilla);
    } else if (option === "area") {
      setOptions({ ...options, area: value, activePage: 1 });
    }
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

  let filteredItems = filterItems();
  let paginatedItems = paginateItems(products);

  const getProducts = (orders) => {
    const ids = orders.map((item) => {
      return item._id;
    });
    axios
      .post(
        `${config.SERVER_URL}/api/admin/crm/productsByArea`,
        {
          ids: ids,
        },
        config.headers
      )
      .then((res) => {
        // console.log(res.data.data.products);
        setProducts(res.data.data.products);
        // return res.data.data.products;
      })
      .catch((error) => {
        // return [];
      });
  };
  //   getProducts(getOrderIds(filteredItems));
  useEffect(() => {
    let loaded = true;
    loaded && getProducts(filteredItems);
    return () => (loaded = false);
  }, [options]);

  return (
    <div className="flex space-x-4">
      <div className="w-64 h-[36rem] overflow-y-auto overflow-hidden scrollbar-table">
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
                tableName="Products"
                numberOfItem={products.length}
                filterOptions={
                  <>
                    <BtnSorting />
                  </>
                }
              />
              <Table
                columnHeader={columnHeader}
                columns={columnData}
                items={paginatedItems}
                activePage={options.activePage}
                pageCount={options.pageCount}
              />
            </div>
          </div>
          {products.length > options.pageCount ? (
            <PageFooter
              totalItems={products.length}
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

export default CRMProducts;
