import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import Loader from "../common/Loader";
import Invoice from "../common/order/Invoice";
import OrderCustomerDetails from "../common/order/OrderCustomerDetails";
import OrderDeliverStatus from "../common/order/OrderDeliveryStatus";
import OrderItems from "../common/order/OrderItems";
import OrderPaymentDetails from "../common/order/OrderPaymentDetails";
import OrderShippingAddress from "../common/order/OrderShippingAddress";
import PageHeader from "../common/PageHeader";

const OrderDetails = () => {
  const [data, setData] = useState();
  const orderId = useParams().id;

  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/orders/${orderId}`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data.order);
        // console.log(res.data.data.order);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [orderId]);
  document.title = `ORDER - ${data ? data.order_id : ""} | PUCShop`;

  return data ? (
    <>
      <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200 print:hidden">
        <PageHeader title="ORDER DETAILS" />
        <div className="w-full">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
            {/* <!-- left side  --> */}
            <div className="grow space-y-4">
              <OrderItems
                items={data.cartItem}
                discount={data.discount}
                orderId={data.order_id}
              />
              <OrderDeliverStatus
                placedAt={data.createdAt}
                statusDates={data.statusDates}
              />
            </div>
            {/* <!-- right side  --> */}
            <div className="min-w-[20rem] space-y-4 print:hidden">
              <OrderPaymentDetails
                transactionId={data.transaction_id}
                paymentMethod={data.payment_method}
                paymentStatus={data.paymentStatus}
              />
              {/* <OrderDeliveryman /> */}
              <OrderCustomerDetails
                id={data.user._id}
                name={data.user.name}
                email={data.user.email}
              />
              {/* <OrderBillingAddress /> */}
              <OrderShippingAddress address={data.address} />
            </div>
          </div>
        </div>
      </div>
      {/* <h2 className="hidden print:block">Hiii</h2> */}
      <div className="hidden print:block">
        <Invoice data={data} />
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default OrderDetails;
