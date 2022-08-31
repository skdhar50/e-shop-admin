import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { GlobalContext } from "../../../context/GlobalContext";
import IconPlusItem from "../icons/IconPlusItem";
import ProgressingBar from "../ProgressingBar";
import BtnCloseModal from "./BtnCloseModal";
import BtnModalAdd from "./BtnModalAdd";
import BtnModalCancel from "./BtnModalCancel";
import BtnNextPrev from "./BtnNextPrev";
import InputAddProducts from "./InputAddProducts";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";

const FormDeal = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState(1);
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          dealer: "",
          deal_value: "",
          date: "",
          products: null,
          due: "",
        }
      : contextData.modal.data
  );
  const [dealers, setDealers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [errors, setError] = useState({});
  // fetch dealers
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/dealers`, config.headers)
      .then((res) => {
        isLoaded && setDealers(res.data.data.dealer);
      })
      .catch((error) => console.log(error));
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
      if (!value && key !== "due") {
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
            `${config.SERVER_URL}/api/admin/deals`,
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
            `${config.SERVER_URL}/api/admin/deals/${formData._id}`,
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
    <div className="mx-auto w-[40rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
          <IconPlusItem />
          <span className="text-2xl font-bold">
            {contextData.modal.mode === "create" ? "New Deal" : "Update Deal"}
          </span>
        </div>
        {submitting && <ProgressingBar />}
        <form
          onSubmit={(e) => formSubmitHandler(e)}
          className="space-y-2 bg-slate-100 p-2 rounded"
        >
          {tab === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              <SelectComp
                handler={handleFormData}
                errMsg={errors.dealer}
                label="Dealer"
                id="dealer"
                name="dealer"
                value={formData.dealer}
                options={dealers.map((item) => {
                  return { value: item._id, name: item.company };
                })}
              />
              <InputComp
                handler={handleFormData}
                errMsg={errors.date}
                label="Date"
                id="date"
                name="date"
                type="date"
                value={formData.date}
              />
              <InputComp
                handler={handleFormData}
                errMsg={errors.deal_value}
                label="Deal Value"
                id="deal_value"
                name="deal_value"
                type="number"
                value={formData.deal_value}
                placeholder="Enter deal value"
              />
              <InputComp
                handler={handleFormData}
                errMsg={errors.due}
                label="Due"
                id="due"
                name="due"
                type="text"
                value={formData.due}
                placeholder="Enter due"
              />
            </div>
          ) : (
            <InputAddProducts
              name={"products"}
              existingProducts={formData.products ? formData.products : []}
              brands={brands}
              categories={categories}
              handler={handleFormData}
              errMsg={errors.products}
            />
          )}
          <div className="flex items-center justify-between w-full ">
            <div className="flex space-x-2">
              {tab === 1 ? (
                <BtnNextPrev title="Next" handler={() => setTab(2)} />
              ) : (
                <BtnNextPrev title="Previous" handler={() => setTab(1)} />
              )}
              <BtnModalCancel />
            </div>

            {tab === 2 && <BtnModalAdd />}
          </div>
        </form>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default FormDeal;
