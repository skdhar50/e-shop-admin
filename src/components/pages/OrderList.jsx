import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import InputSearch from "../common/form/InputSearch";
import SelectCompForTable from "../common/form/SelectCompForTable";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnProductEdit from "../common/table/BtnProductEdit";
import BtnSorting from "../common/table/BtnSorting";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const OrderList = () => {
  document.title = `Orders | PUCShop`;
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [resStatus, setResStatus] = useState(false);
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    paymentStatus: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });

  const columnHeader = [
    "ORDER ID",
    "CUSTOMER NAME",
    "CITY",
    "CALL STATUS",
    "PHONE",
    "PAYMENT STATUS",
    "ORDER PLACED",
    "STATUS",
    "ACTION",
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
        console.log(error);
      });
  };
  const columnData = [
    {
      content: (data) => (
        <Link to={`/orders/${data._id}`}>
          <h1 className="uppercase text-gray-900 hover:text-indigo-500">
            {data.order_id}
          </h1>
        </Link>
      ),
    },
    { content: (data) => data.address.name },

    { content: (data) => data.address.city },
    {
      content: (data) => (
        <SelectCompForTable
          id={data._id}
          name="call_status"
          value={data.call_status}
          handler={changeOrderStatus}
          options={[
            { name: "No Call", value: "no_call" },
            { name: "One Time", value: "one_time" },
            { name: "Two Time", value: "two_time" },
            { name: "Three Time", value: "three_time" },
            { name: "Received & Confirm", value: "received_confirm" },
            { name: "Received & Cancell", value: "received_cancell" },
          ]}
        />
      ),
    },
    { content: (data) => data.address.phone },
    {
      content: (data) => (
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

    {
      content: (data) => (
        <div className="text-right pr-6">
          <BtnProductEdit />{" "}
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteItem(data._id, data.name)
              )
            }
          />
        </div>
      ),
    },
  ];

  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/orders`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data.orders);
        // console.log(res.data.data.orders);
        isLoaded && setResStatus(true);
      })
      .catch((error) => {
        setResStatus(true);
        console.log(error);
      });
    return () => (isLoaded = false);
  }, []);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(`${config.SERVER_URL}/api/admin/orders/${itemId}`, config.headers)
      .then((res) => {
        const tempData = data.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setData([...tempData]);
        contextData.handlerDeleteModal();
        alert.success(
          `The product '${itemName}' has been successfully deleted.`
        );
      })
      .catch((error) => {
        contextData.handlerDeleteModal();
        console.log(error);
        alert.error("Failed to delete the product!");
      });
  };

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    } else if (option === "paymentStatus") {
      setOptions({ ...options, paymentStatus: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { status, paymentStatus, searchKey } = options;

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

  return (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200"
    >
      <PageHeader title="ORDERS" />
      <div className="">
        <div className="overflow-x-auto scrollbar-table">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[calc(100vh-12.5rem)] overflow-y-auto relative scrollbar-table">
            <TableHeader
              tableName="ORDER LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <InputSearch placeholder="Search order..." handler={search} />
                  <FilterOption
                    label="Paymnet"
                    filterBy="paymentStatus"
                    options={[
                      { name: "Pending", value: "pending" },
                      { name: "Complete", value: "complete" },
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
                  <BtnSorting />
                </>
              }
            />
            <Table
              resStatus={resStatus}
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
  );
};

export default OrderList;
