import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnModal from "../common/form/BtnModal";
import InputSearch from "../common/form/InputSearch";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnProductEdit from "../common/table/BtnProductEdit";
import BtnSorting from "../common/table/BtnSorting";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const DealList = () => {
  document.title = `Deals | PUCShop`;
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState("");
  const [resStatus, setResStatus] = useState(false);
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });

  const columnHeader = [
    "DEALER",
    "MANAGER",
    "QTY",
    "AMOUNT",
    "DUE",
    "STATUS",
    "DATE",
    "ACTION",
  ];

  const columnData = [
    {
      content: (data) => (
        <h1
          onClick={() => contextData.handleModal("dealDetails", "show", data)}
          className="text-gray-900 hover:text-indigo-600 cursor-pointer"
        >
          {data.dealer.company}
        </h1>
      ),
    },
    { content: (data) => data.dealer.name },
    { content: (data) => data.products.length },
    { content: (data) => data.deal_value },
    { content: (data) => data.due },
    {
      content: (data) => {
        if (data.payment_status === "paid") {
          return (
            <div className="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
              Paid
            </div>
          );
        } else
          return (
            <div className="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
              Unpaid
            </div>
          );
      },
    },
    { content: (data) => data.createdAt.split("T")[0] },

    {
      content: (data) => (
        <div className="text-right pr-6">
          <BtnProductEdit
            title="Deal"
            onClickHandler={() => {
              delete data.__v;
              data.date = data.date.split("T")[0];
              contextData.handleModal("deal", "update", setReload, data);
            }}
          />{" "}
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteItem(data._id, data.title)
              )
            }
          />
        </div>
      ),
    },
  ];

  // fetch banners
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/deals`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data.deal);
        // console.log(res.data.data.deal);
        isLoaded && setResStatus(true);
      })
      .catch((error) => {
        setResStatus(true);
        // console.log(error);
      });
    return () => (isLoaded = false);
  }, [reload]);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(`${config.SERVER_URL}/api/admin/deals/${itemId}`, config.headers)
      .then((res) => {
        const tempData = data.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setData([...tempData]);
        contextData.handlerDeleteModal();
        alert.success(
          `The banner '${itemName}' has been successfully deleted.`
        );
      })
      .catch((error) => {
        contextData.handlerDeleteModal();
        // console.log(error);
        alert.error("Failed to delete the banner!");
      });
  };

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { status, searchKey } = options;

    let filteredItems = [...data];

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.payment_status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.dealer.company.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.dealer.name.toLowerCase().includes(searchKey.toLowerCase())
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
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200"
    >
      <PageHeader
        title="DEALS"
        render={
          <>
            <BtnModal
              title="Deal"
              onClickHandler={() =>
                contextData.handleModal("deal", "create", setReload)
              }
            />
          </>
        }
      />
      <div className="">
        <div className="overflow-x-auto scrollbar-table">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[calc(100vh-12.5rem)] overflow-y-auto relative scrollbar-table">
            <TableHeader
              tableName="DEAL LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <InputSearch
                    placeholder="Search slider..."
                    handler={search}
                  />
                  <FilterOption
                    label="Status"
                    filterBy="status"
                    options={[
                      { name: "Paid", value: "paid" },
                      { name: "Risidual", value: "risidual" },
                      { name: "Unpaid", value: "unpaid" },
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

export default DealList;
