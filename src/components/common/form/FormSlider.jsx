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
import TextAreaComp from "./TextAreaComp";

const FormSlider = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          title: "",
          description: "",
          link_to: "",
          status: "",
          photo: "",
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
      // console.log("key: " + key);
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
    } else {
      setSubmitting(true);
      if (contextData.modal.mode === "create") {
        axios
          .post(
            `${config.SERVER_URL}/api/admin/carousels`,
            formData,
            config.headers
          )
          .then((res) => {
            // console.log(res.data.data);
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
            // history("/products");
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
            // console.log(error.response.data);
          })
          .then(() => setSubmitting(false));
      } else {
        axios
          .put(
            `${config.SERVER_URL}/api/admin/carousels/${formData.id}`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
          })
          .catch((error) => {
            alert.error("Failed");
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
            {contextData.modal.mode === "create"
              ? "New Slider"
              : "Update Slider"}
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
              errMsg={errors.title}
              label="Title"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              placeholder="Enter banner title"
            />
            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.description}
              label="Description"
              id="description"
              name="description"
              value={formData.description}
              placeholder="Enter banner description"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.link_to}
              label="Link"
              id="link_to"
              name="link_to"
              type="text"
              value={formData.link_to}
              placeholder="Enter banner link"
            />
            <InputImgComp
              handler={handleFormData}
              errMsg={errors.photo}
              label="Photo"
              id="photo"
              name="photo"
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.status}
              label="Status"
              id="status"
              name="status"
              value={formData.status}
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

export default FormSlider;
