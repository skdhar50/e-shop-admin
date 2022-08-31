import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { GlobalContext } from "../../../context/GlobalContext";
import IconPlusItem from "../icons/IconPlusItem";
import Loader from "../Loader";
import ProgressingBar from "../ProgressingBar";
import BtnCloseModal from "./BtnCloseModal";
import BtnModalAdd from "./BtnModalAdd";
import BtnModalCancel from "./BtnModalCancel";
import InputComp from "./InputComp";
import InputImgComp from "./InputImgComp";
import SelectComp from "./SelectComp";

const FormCategory = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState();
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          name: "",
          status: "active",
          photo: "",
          isFeatured: "false",
        }
      : contextData.modal.data
  );
  const [errors, setError] = useState({});
  const handleFormData = (key, value) => {
    let tempData = { ...formData };

    tempData[key] = value;

    setFormData(tempData);

    if (errors[key]) {
      let tempErrors = { ...errors };
      tempErrors[key] = "";
      setError(tempErrors);
    }
  };
  const errorHandler = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...formData })) {
      if (!value && key !== "parent_id") {
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
    } else {
      setSubmitting(true);
      if (contextData.modal.mode === "create") {
        axios
          .post(
            `${config.SERVER_URL}/api/admin/categories`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          })
          .then(() => setSubmitting(false));
      } else {
        axios
          .put(
            `${config.SERVER_URL}/api/admin/categories/${formData.id}`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          })
          .then(() => setSubmitting(false));
      }
    }
  };
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
  return categories ? (
    <div className="mx-auto w-[28rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
          <IconPlusItem />
          <span className="text-2xl font-bold">
            {contextData.modal.mode === "create"
              ? "New Category"
              : "Update Category"}
          </span>
        </div>
        {submitting && <ProgressingBar />}
        <form
          onSubmit={(e) => formSubmitHandler(e)}
          className="space-y-2 bg-slate-100 p-2 rounded"
        >
          <div className="grid grid-cols-1 space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.name}
              label="Category Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Enter category name"
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.parent_id}
              label="Parent"
              id="parent_id"
              name="parent_id"
              value={formData.parent_id}
              options={
                categories &&
                categories.map((item) => {
                  return { value: item._id, name: item.name };
                })
              }
            />

            <InputImgComp
              handler={handleFormData}
              errMsg={errors.photo}
              label="Photo"
              id="photo"
              name="photo"
            />
            <div className="grid grid-cols-2 gap-2">
              <SelectComp
                handler={handleFormData}
                errMsg={errors.isFeatured}
                label="Is Featured"
                id="isFeatured"
                name="isFeatured"
                value={formData.isFeatured || "false"}
                options={[
                  { value: "false", name: "No" },
                  { value: "true", name: "Yes" },
                ]}
              />
              <SelectComp
                handler={handleFormData}
                errMsg={errors.status}
                label="Status"
                id="status"
                name="status"
                value={formData.status ? formData.status : "active"}
                options={[
                  { value: "active", name: "Active" },
                  { value: "inactive", name: "Inactive" },
                ]}
              />
            </div>
          </div>
          <div className="flex items-center justify-start w-full">
            <BtnModalAdd />
            <BtnModalCancel />
          </div>
        </form>
        <BtnCloseModal />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default FormCategory;
