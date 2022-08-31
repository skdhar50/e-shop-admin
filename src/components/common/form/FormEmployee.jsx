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
import SelectComp from "./SelectComp";
import TextAreaComp from "./TextAreaComp";

const FormEmployee = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          name: "",
          email: "",
          phone: "",
          nid: "",
          salary: "",
          type: "",
          shift: "",
          joining_date: "",
          address: "",
          status: "",
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
  const hasError = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...formData })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
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
      return;
    } else {
      setSubmitting(true);
      if (contextData.modal.mode === "create") {
        axios
          .post(
            `${config.SERVER_URL}/api/admin/employees`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
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
            } else {
              alert.error("Something went wrong! Please try again.");
            }
          })
          .then(() => setSubmitting(false));
      } else {
        axios
          .put(
            `${config.SERVER_URL}/api/admin/employees/${formData._id}`,
            formData,
            config.headers
          )
          .then((res) => {
            contextData.handleModal();
            contextData.modal.reload(Math.random());
            alert.success(res.data.message);
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
            } else {
              alert.error("Something went wrong! Please try again.");
            }
          })
          .then(() => setSubmitting(false));
      }
    }
  };
  return (
    <div className="mx-auto w-[34rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2  text-gray-600 mb-3">
          <IconPlusItem />
          <span className="text-2xl font-bold">
            {contextData.modal.mode === "create"
              ? "New Employee"
              : "Update Employee"}
          </span>
        </div>
        {submitting && <ProgressingBar />}
        <form
          onSubmit={(e) => formSubmitHandler(e)}
          className="space-y-2 bg-slate-100 p-2 rounded"
        >
          <InputComp
            handler={handleFormData}
            errMsg={errors.name}
            label="Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter name"
          />

          <div className="grid grid-cols-2 gap-2">
            <InputComp
              handler={handleFormData}
              errMsg={errors.email}
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter email"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.phone}
              label="Phone"
              id="phone"
              name="phone"
              type="string"
              value={formData.phone}
              placeholder="Enter phone number"
            />
          </div>

          <TextAreaComp
            handler={handleFormData}
            errMsg={errors.address}
            label="Address"
            id="address"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            rows="2"
          />
          <div className="grid grid-cols-2 gap-2">
            <InputComp
              handler={handleFormData}
              errMsg={errors.nid}
              label="NID"
              id="nid"
              name="nid"
              type="number"
              value={formData.nid}
              placeholder="Enter NID number"
            />

            <InputComp
              handler={handleFormData}
              errMsg={errors.joining_date}
              label="Joining Date"
              id="joining_date"
              name="joining_date"
              type="date"
              value={formData.joining_date}
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.type}
              label="Designation"
              id="type"
              name="type"
              value={formData.type}
              options={[
                { value: "manager", name: "Manager" },
                { value: "support", name: "Support" },
                { value: "guard", name: "Guard" },
                { value: "delivery_man", name: "Delivery Man" },
                { value: "general", name: "General Employee" },
              ]}
            />
            <SelectComp
              handler={handleFormData}
              errMsg={errors.shift}
              label="Shift"
              id="shift"
              name="shift"
              value={formData.shift}
              options={[
                { value: "day", name: "Day" },
                { value: "night", name: "night" },
              ]}
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.salary}
              label="Salary"
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              placeholder="Enter salary"
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

export default FormEmployee;
