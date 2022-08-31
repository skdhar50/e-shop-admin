import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCreate from "../common/form/BtnCreate";
import InputSearch from "../common/form/InputSearch";
import IconEdit from "../common/icons/IconEdit";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnSorting from "../common/table/BtnSorting";
import FilterOption from "../common/table/FilterOption";
import ItemImg from "../common/table/ItemImg";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const ProductList = () => {
  document.title = `Products | PUCShop`;
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [resStatus, setResStatus] = useState(false);
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    selectedCategory: "all",
    selectedBrand: "all",
    status: "all",
    searchKey: "all",
    isExclusive: "all",
    sortBy: 0,
    // sortColumn: { path: "asc", order: "createdAt" },
  });

  const sorting = () => {
    setProducts([...products].reverse());
    setOptions({ ...options, sortBy: options.sortBy ? 0 : 1 });
  };

  const columnHeader = [
    "PRODUCT NAME",
    // "CATEGORY",
    "BRAND",
    "stock",
    "SALE",
    "CREATED AT",
    "MRP",
    "STATUS",
    "ACTION",
  ];

  const columnData = [
    {
      content: (product) => (
        <div className="flex space-x-1 mb-2">
          <ItemImg
            link={`./${product._id}`}
            imgLink={product.photos.length > 0 ? product.photos[0] : ""}
            // title={product.name}
          />
          <div>
            <h2 className="text-gray-900">
              <Link to={`./${product._id}`}>{product.name}</Link>{" "}
            </h2>
            <div children="flex ">
              <span className="text-xs">Categories:</span>
              {product.category.map((item, indx) => {
                return (
                  <span className="text-xs ml-1" key={`cat-${indx}`}>
                    {item.name},
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
    // { content: (product) => product.category[0]["name"] },
    { content: (product) => product.brand.name },
    { content: (product) => product.quantity },
    { content: (product) => product.totalSell },
    { content: (product) => product.createdAt.split("T")[0] },
    { content: (product) => product.price },
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
      content: (product) => (
        <div className="flex pr-6 justify-end space-x-2">
          <Link to={`${product._id}/update`}>
            <div className="aspect-square w-8 h-8 rounded-full bg-slate-200 p-1 text-indigo-700 hover:bg-slate-300">
              <IconEdit />
            </div>
          </Link>
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteProduct(product._id, product.name)
              )
            }
          />
        </div>
      ),
    },
  ];

  // fetch products
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/products`, config.headers)
      .then((res) => {
        isLoaded && setProducts(res.data.data.products);
        isLoaded && setResStatus(true);
      })
      .catch((error) => {
        setResStatus(true);
        console.log(error);
      });
    return () => (isLoaded = false);
  }, []);

  // fetch categories
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/categories`, config.headers)
      .then((res) => {
        isLoaded && setCategories(res.data.data.categories);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  // fetch brands
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/brands`, config.headers)
      .then((res) => {
        isLoaded && setBrands(res.data.data.brands);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  const deleteProduct = (itemId, itemName) => {
    axios
      .delete(
        `${config.SERVER_URL}/api/admin/products/${itemId}`,
        config.headers
      )
      .then((res) => {
        const tempProdcuts = products.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setProducts([...tempProdcuts]);
        contextData.handlerDeleteModal();
        alert.success(
          `The product '${itemName}' has been successfully deleted.`
        );
      })
      .catch((error) => {
        contextData.handlerDeleteModal();
        // console.log(error);
        alert.error("Failed to delete the product!");
      });
  };

  const setFilterOptions = (option, value) => {
    if (option === "category") {
      setOptions({ ...options, selectedCategory: value, activePage: 1 });
    } else if (option === "brand") {
      setOptions({ ...options, selectedBrand: value, activePage: 1 });
    } else if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    } else if (option === "isExclusive") {
      setOptions({ ...options, isExclusive: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { selectedCategory, selectedBrand, status, searchKey, isExclusive } =
      options;

    let filteredItems = [...products];

    if (selectedBrand !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.brand.name === selectedBrand) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (isExclusive !== "all") {
      const tempItems = filteredItems.filter((item) => {
        const flag = isExclusive === "no" ? false : true;
        if (item.isExclusive === flag) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (selectedCategory !== "all") {
      const tempItems = filteredItems.filter((item) => {
        const categories = item.category.map(({ name }) => name);

        if (categories.includes(selectedCategory)) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.brand.name.toLowerCase().includes(searchKey.toLowerCase())
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

  let filteredItems = products ? filterItems() : [];
  let paginatedItems = products ? paginateItems(filteredItems) : [];

  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200">
      <PageHeader
        title="PRODUCTS"
        render={
          <>
            <InputSearch placeholder="Search products..." handler={search} />
            <BtnCreate title="Product" to="./create" />
          </>
        }
      />
      <div className="">
        <div className="overflow-x-auto scrollbar-table">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[calc(100vh-12.5rem)] overflow-y-auto relative scrollbar-table">
            <TableHeader
              tableName="PRODUCT LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <FilterOption
                    label="Exclusive"
                    filterBy="isExclusive"
                    options={[
                      { name: "Yes", value: "yes" },
                      { name: "No", value: "no" },
                    ]}
                    onChangeHandler={setFilterOptions}
                  />
                  <FilterOption
                    label="Category"
                    filterBy="category"
                    options={
                      categories &&
                      categories.map((item) => {
                        return { name: item.name, value: item.name };
                      })
                    }
                    onChangeHandler={setFilterOptions}
                  />
                  <FilterOption
                    label="Brand"
                    filterBy="brand"
                    options={
                      brands &&
                      brands.map((item) => {
                        return { name: item.name, value: item.name };
                      })
                    }
                    onChangeHandler={setFilterOptions}
                  />
                  <FilterOption
                    label="Status"
                    filterBy="status"
                    options={[
                      { name: "Active", value: "active" },
                      { name: "Inactive", value: "inactive" },
                      { name: "Discontinued", value: "discontinued" },
                    ]}
                    onChangeHandler={setFilterOptions}
                  />
                  <BtnSorting handler={sorting} sortedBy={options.sortBy} />
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
        {products.length > options.pageCount ? (
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

export default ProductList;
