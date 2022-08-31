import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import config from "../../config/config";
import InputSearch from "./form/InputSearch";
import PageFooter from "./PageFooter";
import BtnProductDelete from "./table/BtnProductDelete";
import ItemImg from "./table/ItemImg";
import Table from "./table/Table";
import TableHeader from "./table/TableHeader";

const UserTableForVoucher = (props) => {
  const alert = useAlert();
  const [users, setUsers] = useState([...props.users]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
    showExistinUser: true,
    selectAll: false,
  });
  let columnHeader = [];
  columnHeader =
    props.section === "users"
      ? [
          "NAME",
          "email",
          "phone",
          "city",
          options.showExistinUser ? "ACTION" : "select",
        ]
      : ["NAME", "email", "phone", "city"];
  let columnData = [
    {
      content: (data) => (
        <ItemImg link={`/users/${data._id}`} imgLink={""} title={data.name} />
      ),
    },
    { content: (data) => data.email },
    { content: (data) => data.profile.phone },
    { content: (data) => data.profile.city },
  ];
  if (props.section === "users") {
    columnData.push({
      content: (data) => (
        <div className="text-right pr-6">
          {options.showExistinUser ? (
            <BtnProductDelete handler={() => removeUsers(data._id)} />
          ) : (
            <input
              className="h-6 w-6 float-center"
              type="checkbox"
              checked={selectedUsers.includes(data._id)}
              onChange={() => selectProduct(data._id)}
            />
          )}
        </div>
      ),
    });
  }

  const setFilterOptions = (option, value) => {
    if (option === "category") {
      setOptions({ ...options, selectedCategory: value, activePage: 1 });
    } else if (option === "brand") {
      setOptions({ ...options, selectedBrand: value, activePage: 1 });
    } else if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { searchKey } = options;

    let filteredItems = [...users];

    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.email.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.profile.city.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.profile.phone.toLowerCase().includes(searchKey.toLowerCase())
        ) {
          return true;
        } else return false;
      });
      filteredItems = [...tempItems];
    }

    // setOptions({ ...options, activePage: 1 });
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

  let filteredItems = users ? filterItems() : [];
  let paginatedItems = users ? paginateItems(filteredItems) : [];

  const updateOffer = (data) => {
    axios
      .put(
        `${config.SERVER_URL}/api/admin/coupons/${props.offerId}`,
        data,
        config.headers
      )
      .then((res) => {
        alert.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        alert.error("Something went wrong! Please try again.");
      });
  };
  const addNewUsers = async (cancel = false) => {
    let tempOptions = options;
    if (options.showExistinUser) {
      await axios
        .get(`${config.SERVER_URL}/api/admin/users`, config.headers)
        .then((res) => {
          let usersIds = props.users.map((item) => {
            return item._id;
          });
          setUsers(
            res.data.data.users.filter((e) => !usersIds.includes(e._id))
          );
        })
        .catch((error) => console.log(error));
      tempOptions.showExistinUser = false;
      setOptions(tempOptions);
    } else {
      if (!cancel) {
        for (let i = 0; i < props.users.length; i++) {
          selectedUsers.push(props.users[i]._id);
        }
        updateOffer({
          users: selectedUsers,
        });
      }
      // tempOptions.showExistinUser = true;
      // setUsers(props.users);
      // setOptions(tempOptions);
      window.location.reload();
    }
  };
  const removeUsers = (id) => {
    let tempUserIds = [];
    let tempUsers = [...users];
    for (let i = 0; i < tempUsers.length; i++) {
      if (id !== tempUsers[i]._id) {
        tempUserIds.push(tempUsers[i]._id);
      }
    }

    setUsers(tempUsers.filter((e) => e._id !== id));
    updateOffer({
      users: tempUserIds,
    });
  };
  const selectProduct = (id) => {
    let tempProducts = [...selectedUsers];
    if (tempProducts.includes(id)) {
      tempProducts = tempProducts.filter((e) => e !== id);
      setSelectedUsers(tempProducts);
    } else {
      tempProducts.push(id);
      setSelectedUsers(tempProducts);
    }
  };
  const selectAllProducts = (checked) => {
    let tempProducts = [...selectedUsers];
    if (checked) {
      for (let i = 0; i < filteredItems.length; i++) {
        if (!selectedUsers.includes(filteredItems[i]._id)) {
          tempProducts.push(filteredItems[i]._id);
        }
      }
    } else {
      tempProducts = [];
    }
    setSelectedUsers(tempProducts);
  };

  return (
    <div className="flex flex-col bg-white justify-between grow">
      <div className="overflow-y-auto scrollbar-table scrollbar-table max-h-[30rem]">
        <div className="min-w-[40rem]">
          <TableHeader
            tableName="user LIST"
            numberOfItem={filteredItems.length}
            filterOptions={
              <>
                <InputSearch placeholder="Search product..." handler={search} />

                {/* <BtnSorting /> */}
                {!options.showExistinUser && (
                  <>
                    <h1 className="ml-1">Select All</h1>
                    <input
                      className="h-6 w-6 !ml-0.5"
                      type="checkbox"
                      onChange={(e) => selectAllProducts(e.target.checked)}
                    />
                  </>
                )}
              </>
            }
          />
          <Table
            resStatus={true}
            columnHeader={columnHeader}
            columns={columnData}
            items={paginatedItems}
            activePage={options.activePage}
            pageCount={options.pageCount}
          />
        </div>
      </div>
      <div className="flex flex-col pt-1 bg-white">
        {props.section === "users" && (
          <div className="flex flex-col">
            {options.showExistinUser ? (
              <button
                onClick={() => addNewUsers(false)}
                className="p-2 uppercase bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Add New Customers
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4 px-4">
                <button
                  onClick={() => addNewUsers(true)}
                  className="p-2 rounded uppercase bg-gray-400 hover:bg-gray-300 hover:text-red-500 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addNewUsers(false)}
                  className="p-2 rounded uppercase bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        )}

        <div className="px-4">
          {filteredItems.length > 0 && (
            <PageFooter
              totalItems={filteredItems.length}
              pageCount={options.pageCount}
              activePage={options.activePage}
              onClickPage={handleClickPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTableForVoucher;
