import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";
import IconSpin from "../icons/IconSpin";
import Loader from "../Loader";
import InputCatComp from "./InputCatComp";
import InputColor from "./InputColor";
import InputComp from "./InputComp";
import InputMultipleImgComp from "./InputMultipleImgComp";
import SelectComp from "./SelectComp";
import TextAreaComp from "./TextAreaComp";
const ProductFormComp = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [data, setData] = useState({
    name: null,
    price: null,
    description: null,
    shortDescription: null,
    category: null,
    brand: null,
    quantity: null,
    photos: null,
    unitPrice: null,
    size: null,
    color: null,
    weight: null,
    status: null,
    isExclusive: null,
  });
  const [errors, setError] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    quantity: "",
    photos: "",
    unitPrice: "",
    size: "",
    color: "",
    weight: "",
    status: "",
  });
  const [submitting, setSubmitting] = useState(0);
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

  const hasError = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...data })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    // console.log(error);
    if (Object.keys(error).length > 0) {
      setError({ ...error });
      return true;
    } else {
      return false;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (hasError()) {
      // console.log(errors);
      return;
    } else {
      setSubmitting(1);
      setTimeout(() => {
        axios
          .post(`${config.SERVER_URL}/api/admin/products`, data, config.headers)
          .then((res) => {
            alert.success(res.data.message);
            navigate("/products");
          })
          .catch((error) => {
            if (error.response.status === 422) {
              let getErrors = {};
              Object.entries(error.response.data.errors).forEach(
                ([key, value]) => {
                  getErrors[key] = value.msg;
                }
              );
              setError(getErrors);
              // console.log(error.response.data.errors);
            } else {
              alert.error("Something went wrong! Please try again.");
            }
          });
        setSubmitting(0);
      }, 500);
    }
  };

  return brands && categories ? (
    <form
      action=""
      encType="multipart/form-data"
      onSubmit={(e) => formSubmitHandler(e)}
    >
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
        <div className="grow space-y-4">
          <div className="flex flex-col bg-white rounded p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputComp
                handler={handleFormData}
                errMsg={errors.name}
                label="Product Title"
                id="product-tile"
                name="name"
                type="text"
                placeholder="Enter product title"
              />
              <SelectComp
                handler={handleFormData}
                errMsg={errors.brand}
                label="Brand"
                id="brand"
                name="brand"
                options={
                  brands &&
                  brands.map((item) => {
                    return { value: item._id, name: item.name };
                  })
                }
              />
            </div>
            <InputCatComp
              handler={handleFormData}
              errMsg={errors.category}
              categories={categories}
              values={[]}
            />
            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.shortDescription}
              label="Short Description"
              id="shortDescription"
              name="shortDescription"
              placeholder="Enter short description"
              rows="3"
            />
            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.description}
              label="Full Description"
              id="full-description"
              name="description"
              placeholder="Enter full description"
              rows="8"
            />

            <InputMultipleImgComp
              handler={handleFormData}
              errMsg={errors.photos}
              label="Select Photos"
              id="photos"
              name="photos"
            />
            {/* <InputComp
              handler={handleFormData}
              errMsg={errors.tags}
              label="Product Tags"
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter product tags"
            /> */}
          </div>
        </div>
        {/* <!-- right side  --> */}
        <div className="xl:min-w-[25.5rem] min-w-[20rem] space-y-4 min-h-[24rem] flex flex-col justify-betweenm">
          <div className="p-4 rounded bg-white space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.unitPrice}
              label="Unit Cost"
              id="unit-cost"
              name="unitPrice"
              type="number"
              placeholder="Enter unit cost"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.price}
              label="Selling Price"
              id="selling-price"
              name="price"
              type="number"
              placeholder="Enter selling price"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.quantity}
              label="Quantity"
              id="quantity"
              name="quantity"
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
              value="#f2f2f2"
              placeholder="Enter product tags"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.size}
              label="Size"
              id="size"
              name="size"
              type="text"
              placeholder="Enter product size"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.weight}
              label="Weight"
              id="weight"
              name="weight"
              type="text"
              placeholder="Enter product weight"
            />
          </div>
          <div className="p-4 rounded bg-white space-y-4">
            <SelectComp
              handler={handleFormData}
              errMsg={errors.isExclusive}
              label="Exclusive"
              id="isExclusive"
              name="isExclusive"
              options={[
                { value: "false", name: "Not Exclusive" },
                { value: "true", name: "Exclusive" },
              ]}
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.status}
              label="Status"
              id="status"
              name="status"
              options={[
                { value: "active", name: "Active" },
                { value: "inactive", name: "Inactive" },
                { value: "discontinued", name: "Discontinued" },
              ]}
            />

            {/* <InputComp
              handler={handleFormData}
              errMsg={errors.publishDate}
              label="Publish Date"
              id="publish-date"
              name="publishdate"
              type="date"
            /> */}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-5">
        <button
          type="submit"
          className="bg-blue-600 py-2 px-6 rounded uppercase text-white hover:bg-blue-700 flex items-center"
        >
          {submitting ? (
            <>
              <IconSpin />
              <h1>SUBMITTING</h1>
            </>
          ) : (
            <h1>SUBMIT</h1>
          )}
        </button>
        <button
          type="button"
          className="bg-gray-500 py-2 px-6 rounded uppercase text-white hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <Loader />
  );
};

export default ProductFormComp;
