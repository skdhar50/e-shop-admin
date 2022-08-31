import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../config/config";
import InputSearch from "./form/InputSearch";
import PageFooter from "./PageFooter";
import BtnProductDelete from "./table/BtnProductDelete";
import FilterOption from "./table/FilterOption";
import ItemImg from "./table/ItemImg";
import Table from "./table/Table";
import TableHeader from "./table/TableHeader";

const OfferedProducts = (props) => {
  const alert = useAlert();
  const [products, setProducts] = useState([...props.products]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    selectedCategory: "all",
    selectedBrand: "all",
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
    showOfferedProducts: true,
    selectAll: false,
  });
  const columnHeader = [
    "PRODUCT NAME",
    "CATEGORY",
    "BRAND",
    "MRP",
    options.showOfferedProducts ? "ACTION" : "select",
  ];
  const columnData = [
    {
      content: (product) => (
        <ItemImg
          link={`/products/${product._id}`}
          imgLink={product.photos.length > 0 ? product.photos[0] : ""}
          title={product.name}
        />
      ),
    },
    { content: (product) => product.category[0]["name"] },
    { content: (product) => product.brand.name },
    { content: (product) => product.price },

    {
      content: (product) => (
        <div className="text-right pr-6">
          {options.showOfferedProducts ? (
            <BtnProductDelete handler={() => removeProducts(product._id)} />
          ) : (
            <input
              className="h-6 w-6 float-center"
              type="checkbox"
              checked={selectedProducts.includes(product._id)}
              onChange={() => selectProduct(product._id)}
            />
          )}
        </div>
      ),
    },
  ];

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
    const { selectedCategory, selectedBrand, status, searchKey } = options;

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
  const updateOffer = (data) => {
    axios
      .put(
        `${config.SERVER_URL}/api/admin/${props.section}/${props.offerId}`,
        data,
        config.headers
      )
      .then((res) => {
        alert.success(res.data.message);
      })
      .catch((error) => {
        alert.error("Something went wrong! Please try again.");
      });
  };
  const addNewProducts = async (cancel = false) => {
    let tempOptions = options;
    if (options.showOfferedProducts) {
      await axios
        .get(`${config.SERVER_URL}/api/admin/products`, config.headers)
        .then((res) => {
          let productIds = props.products.map((item) => {
            return item._id;
          });
          setProducts(
            res.data.data.products.filter((e) => !productIds.includes(e._id))
          );

          // setProducts(res.data.data.products);
        })
        .catch((error) => console.log(error));
      tempOptions.showOfferedProducts = false;
      setOptions(tempOptions);
    } else {
      if (!cancel) {
        for (let i = 0; i < props.products.length; i++) {
          selectedProducts.push(props.products[i]._id);
        }
        updateOffer({
          products: selectedProducts,
        });
      }
      // tempOptions.showOfferedProducts = true;
      // setProducts(props.products);
      // setOptions(tempOptions);
      // reload(Math.random());
      window.location.reload();
    }
  };
  const removeProducts = (id) => {
    let tempProductIds = [];
    let tempProducts = [...products];
    for (let i = 0; i < tempProducts.length; i++) {
      if (id !== tempProducts[i]._id) {
        tempProductIds.push(tempProducts[i]._id);
      }
    }

    setProducts(tempProducts.filter((e) => e._id !== id));
    updateOffer({
      products: tempProductIds,
    });
  };
  const selectProduct = (id) => {
    let tempProducts = [...selectedProducts];
    if (tempProducts.includes(id)) {
      tempProducts = tempProducts.filter((e) => e !== id);
      setSelectedProducts(tempProducts);
    } else {
      tempProducts.push(id);
      setSelectedProducts(tempProducts);
    }
    console.log(tempProducts.length);
  };
  const selectAllProducts = (checked) => {
    let tempProducts = [...selectedProducts];
    if (checked) {
      for (let i = 0; i < filteredItems.length; i++) {
        if (!selectedProducts.includes(filteredItems[i]._id)) {
          tempProducts.push(filteredItems[i]._id);
        }
      }
    } else {
      tempProducts = [];
    }
    setSelectedProducts(tempProducts);
  };

  return (
    categories &&
    brands && (
      <div className="flex flex-col bg-white justify-between grow">
        <div className="overflow-y-auto  scrollbar-table max-h-[30rem] ">
          <div className="min-w-[40rem]">
            <TableHeader
              tableName="PRODUCT LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <InputSearch
                    placeholder="Search product..."
                    handler={search}
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
                  {/* <BtnSorting /> */}
                  {!options.showOfferedProducts && (
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
          {options.showOfferedProducts ? (
            <button
              onClick={() => addNewProducts(false)}
              className="p-2 uppercase bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add New Products
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-4 px-4">
              <button
                onClick={() => addNewProducts(true)}
                className="p-2 rounded uppercase bg-gray-400 hover:bg-gray-300 hover:text-red-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => addNewProducts(false)}
                className="p-2 rounded uppercase bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save
              </button>
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
    )
  );
};

export default OfferedProducts;
