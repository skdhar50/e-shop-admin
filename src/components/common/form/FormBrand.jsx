import axios from "axios";
import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { GlobalContext } from "../../../context/GlobalContext";
import IconPlusItem from "../icons/IconPlusItem";
import ProgressingBar from "../ProgressingBar";
import BtnCloseModal from "./BtnCloseModal";
import BtnModalAdd from "./BtnModalAdd";
import BtnModalCancel from "./BtnModalCancel";
import InputComp from "./InputComp";
import InputImgComp from "./InputImgComp";
import SelectComp from "./SelectComp";

const FormBrand = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          name: "",
          status: "active",
          icon: "",
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
    } else {
      setSubmitting(true);
      if (contextData.modal.mode === "create") {
        axios
          .post(
            `${config.SERVER_URL}/api/admin/brands`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
            // history("/products");
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          })
          .then(() => setSubmitting(false));
      } else {
        axios
          .put(
            `${config.SERVER_URL}/api/admin/brands/${formData.id}`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
            // history("/products");
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          })
          .then(() => setSubmitting(false));
      }
    }
  };
  return (
    <div className="mx-auto w-[28rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
          <IconPlusItem />
          <span className="text-2xl font-bold">
            {contextData.modal.mode === "create" ? "New Brand" : "Update Brand"}
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
              label="Brand Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Enter brand name"
            />
            <InputImgComp
              handler={handleFormData}
              errMsg={errors.icon}
              label="Brand Icon"
              id="icon"
              name="icon"
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
          <div className="flex items-center justify-start w-full">
            <BtnModalAdd /> <BtnModalCancel />
          </div>
        </form>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default FormBrand;
