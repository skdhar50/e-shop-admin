import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../../config/config";
import Loader from "../Loader";
import ProductPhotoCrud from "../products/ProductPhotoCrud";
import InputCatComp from "./InputCatComp";
import InputColor from "./InputColor";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";
import TextAreaComp from "./TextAreaComp";

const ProductUpdateForm = (props) => {
  const alert = useAlert();
  const history = useNavigate();
  const productId = useParams().id;
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();

  const [data, setData] = useState();
  //   console.log(data);
  const [errors, setError] = useState({});

  // fetch product
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(
        `${config.SERVER_URL}/api/admin/products/${productId}`,
        config.headers
      )
      .then((res) => {
        isLoaded && setData(res.data.data.product);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [productId]);
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

  const handleFormData = (key, value) => {
    // console.log(value);
    let tempData = { ...data };

    tempData[key] = value;

    setData(tempData);

    if (errors[key]) {
      let tempErrors = { ...errors };
      tempErrors[key] = "";
      setError(tempErrors);
    }
  };

  const errorHandler = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...data })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    if (!error) {
      return false;
    } else {
      setError({ ...error });
      return true;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!errorHandler()) {
      console.log(errors);
      return;
    }
    axios
      .put(
        `${config.SERVER_URL}/api/admin/products/${productId}`,
        data,
        config.headers
      )
      .then((res) => {
        // console.log(res.data);
        alert.success(`Success`);
        history("/products");
      })
      .catch((error) => {
        alert.error(`Failed`);
        console.log(error.response.data.errors);
      });
  };

  return brands && categories && data ? (
    <form
      action=""
      encType="multipart/form-data"
      onSubmit={(e) => formSubmitHandler(e)}
    >
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
        <div className="grow space-y-4">
          <div className="flex flex-col bg-white rounded p-4 space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.name}
              label="Product Title"
              id="product-tile"
              name="name"
              value={data.name}
              type="text"
              placeholder="Enter product title"
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.brand}
              label="Brand"
              id="brand"
              name="brand"
              value={data.brand._id}
              options={
                brands &&
                brands.map((item) => {
                  return { value: item._id, name: item.name };
                })
              }
            />
            <InputCatComp
              handler={handleFormData}
              errMsg={errors.category}
              categories={categories}
              values={data.category}
            />

            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.shortDescription}
              label="Short Description"
              id="shortDescription"
              name="shortDescription"
              value={data.shortDescription}
              placeholder="Enter short description"
              rows="2"
            />

            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.description}
              label="Full Description"
              id="full-description"
              name="description"
              value={data.description}
              placeholder="Enter full description"
              rows="8"
            />
            <div className="grid grid-cols-2 gap-2">
              <SelectComp
                handler={handleFormData}
                errMsg={errors.isExclusive}
                label="Is Exclusive"
                id="isExclusive"
                name="isExclusive"
                value={data.isExclusive}
                options={[
                  { value: "true", name: "Yes" },
                  { value: "false", name: "No" },
                ]}
              />
              <SelectComp
                handler={handleFormData}
                errMsg={errors.status}
                label="Status"
                id="status"
                name="status"
                value={data.status}
                options={[
                  { value: "active", name: "Active" },
                  { value: "inactive", name: "Inactive" },
                  { value: "discontinued", name: "Discontinued" },
                ]}
              />
            </div>
          </div>
        </div>
        {/* <!-- right side  --> */}
        <div className="xl:min-w-[25.5rem] min-w-[20rem] space-y-4 min-h-[24rem] flex flex-col justify-betweenm">
          <div className="p-4 rounded bg-white space-y-4">
            <ProductPhotoCrud items={data.photos} productId={productId} />
          </div>

          <div className="p-4 rounded bg-white space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.unitPrice}
              label="Unit Cost"
              id="unit-cost"
              name="unitPrice"
              value={data.unitPrice}
              type="number"
              placeholder="Enter unit cost"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.price}
              label="Selling Price"
              id="selling-price"
              name="price"
              value={data.price}
              type="number"
              placeholder="Enter selling price"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.quantity}
              label="Quantity"
              id="quantity"
              name="quantity"
              value={data.quantity}
              type="number"
              placeholder="Enter product quantity"
            />
          </div>
          <div className="p-4 rounded bg-white space-y-4">
            <InputColor
              handler={handleFormData}
              errMsg={errors.color}
              label="Color"
              id="color"
              name="color"
              type="color"
              value={data.color}
              placeholder="Enter product tags"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.size}
              label="Size"
              id="size"
              name="size"
              value={data.size}
              type="text"
              placeholder="Enter product size"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.weight}
              label="Weight"
              id="weight"
              name="weight"
              value={data.weight}
              type="text"
              placeholder="Enter product weight"
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-5">
        <button
          type="submit"
          className="bg-teal-500 py-2 px-6 rounded text-white hover:bg-teal-600"
        >
          Update
        </button>
        <button
          type="button"
          className="bg-gray-500 py-2 px-6 rounded text-white hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <Loader />
  );
};

export default ProductUpdateForm;
