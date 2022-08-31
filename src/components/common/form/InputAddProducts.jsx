import { useState } from "react";
import SmallTable from "../table/SmallTable";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";

const InputAddProducts = (props) => {
  const { handler, brands, categories, name, existingProducts, errMsg } = props;
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    quantity: "",
    unit_cost: "",
  });
  const handleFormData = (key, value) => {
    let tempData = { ...formData };

    tempData[key] = value;

    setFormData(tempData);

    if (errors[key]) {
      let tempErrors = { ...errors };
      tempErrors[key] = "";
      setErrors(tempErrors);
    }
  };
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState(existingProducts);
  const hasError = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...formData })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    // console.log(error);
    if (Object.keys(error).length > 0) {
      setErrors({ ...error });
      return true;
    } else {
      return false;
    }
  };
  const addToProducts = (e) => {
    e.preventDefault();

    if (hasError()) {
      // console.log(errors);
      return;
    } else {
      let tempProducts = [...products];
      tempProducts.push(formData);
      setProducts(tempProducts);
      handler(name, tempProducts);
      setFormData({
        name: "",
        brand: "",
        category: "",
        quantity: "",
        unit_cost: "",
      });
    }
  };
  const removeProduct = (indx) => {
    let tempProducts = [...products];
    tempProducts.splice(indx, 1);
    setProducts(tempProducts);
    handler(name, tempProducts);
  };
  // const columnData = [
  //   { content: (data) => data.name },
  //   { content: (data) => data.quantity },
  //   { content: (data) => data.unit_cost },
  // ];
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="block text-sm font-medium text-gray-900">Products</h1>
      <div className="shadow p-2 bg-white">
        <div className="grid grid-cols-3 gap-2">
          <InputComp
            handler={handleFormData}
            errMsg={errors.name}
            label="Product Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter product name"
          />
          <SelectComp
            handler={handleFormData}
            errMsg={errors.category}
            label="Category"
            id="category"
            name="category"
            value={formData.category}
            options={categories.map((item) => {
              return { value: item._id, name: item.name };
            })}
          />
          <SelectComp
            handler={handleFormData}
            errMsg={errors.brand}
            label="Brand"
            id="brand"
            name="brand"
            value={formData.brand}
            options={brands.map((item) => {
              return { value: item._id, name: item.name };
            })}
          />
          <InputComp
            handler={handleFormData}
            errMsg={errors.quantity}
            label="Quantity"
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            placeholder="Enter quantity"
          />
          <InputComp
            handler={handleFormData}
            errMsg={errors.unit_cost}
            label="Unit Cost"
            id="unit_cost"
            name="unit_cost"
            type="number"
            value={formData.unit_cost}
            placeholder="Enter unit cost"
          />
          <div className="flex flex-col justify-end">
            <button
              onClick={addToProducts}
              type="button"
              className="focus:outline-none transition duration-150 ease-in-out hover:bg-slate-300 bg-slate-200  border-indigo-700 rounded text-indigo-700 px-8 py-2.5 text-sm font-medium"
            >
              Add to products
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="shadow rounded-sm  bg-slate-200 p-2">
          <SmallTable
            columns={["Product Name", "Unit Cost", "Quantity", "Action"]}
            data={products}
            action={removeProduct}
          />
        </div>
      )}
      {errMsg && <small className="text-red-500">{errMsg}</small>}
    </div>
  );
};

export default InputAddProducts;
