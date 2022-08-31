import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import DealDetails from "./DealDetails";
import DealerDetails from "./DealerDetails";
import EmployeeDetails from "./EmployeeDetails";
import FormAdmin from "./form/FormAdmin";
import FormBanner from "./form/FormBanner";
import FormBrand from "./form/FormBrand";
import FormCategory from "./form/FormCategory";
import FormCustomer from "./form/FormCustomer";
import FormDeal from "./form/FormDeal";
import FormDealer from "./form/FormDealer";
import FormEmployee from "./form/FormEmployee";
import FormOffer from "./form/FormOffer";
import FormSlider from "./form/FormSlider";
import FormVoucher from "./form/FormVoucher";

const Modal = () => {
  const contextData = useContext(GlobalContext);
  const renderModal = () => {
    switch (contextData.modal.compName) {
      case "brand":
        return <FormBrand />;
      case "category":
        return <FormCategory />;
      case "slider":
        return <FormSlider />;
      case "banner":
        return <FormBanner />;
      case "admin":
        return <FormAdmin />;
      case "customer":
        return <FormCustomer />;
      case "offer":
        return <FormOffer />;
      case "voucher":
        return <FormVoucher />;
      case "dealer":
        return <FormDealer />;
      case "dealerDetails":
        return <DealerDetails />;
      case "deal":
        return <FormDeal />;
      case "dealDetails":
        return <DealDetails />;
      case "employee":
        return <FormEmployee />;
      case "employeeDetails":
        return <EmployeeDetails />;
      default:
        return <h1>Something went wrong. Please reload this page</h1>;
    }
  };

  return contextData.modal.show ? (
    <div className="py-10 bg-gray-900 bg-opacity-50 transition duration-150 ease-in-out z-50 absolute top-0 right-0 bottom-0 left-0 h-full">
      {renderModal()}
    </div>
  ) : (
    ""
  );
};

export default Modal;
