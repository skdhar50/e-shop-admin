import config from "../../../config/config";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderPricingDetails from "./OrderPricingDetails";

const OrderItems = (props) => {
  const { items, discount, orderId } = props;
  let subTotalAmount = 0;
  for (let i = 0; i < items.length; i++) {
    subTotalAmount += items[i].product.price * items[i].count;
  }
  //   console.log(subTotalAmount);
  return (
    <div className="bg-white rounded">
      <OrderDetailsHeader orderId={orderId} />
      <div className="overflow-x-auto">
        <table className="w-ful min-w-[30rem] w-full">
          <thead className="bg-gray-100 text-sm border-y">
            <tr className="text-left">
              <th className="p-3 font-medium">Product Details</th>
              <th className="p-3 font-medium">Unit Price</th>
              <th className="p-3 font-medium">Quantity</th>
              <th className="p-3 font-medium text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, indx) => {
              return (
                <tr key={indx}>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <img
                        className="w-20 h-20"
                        src={
                          item.product.photos
                            ? `${config.SERVER_URL}/public/storage/images/${item.product.photos[0]}`
                            : "../images/user.png"
                        }
                        alt=""
                      />
                      <div className="flex flex-col justify-between">
                        <h2 className="font-medium text-blue-900">
                          {item.product.name}
                        </h2>
                        <div className="flex flex-col text-sm pb-2 text-gray-500">
                          <p className="flex space-x-6">
                            Color: {/* <b className="font-medium"> */}
                            {item.product.color ? (
                              <div
                                className={`w-4 h-4 rounded-full  ml-2`}
                                style={{ background: item.product.color }}
                              ></div>
                            ) : (
                              "N/A"
                            )}
                            {/* </b> */}
                          </p>
                          <p>
                            Size:{" "}
                            <b className="font-medium">
                              {item.product.size ? item.product.size : "N/A"}
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{item.product.price} Tk</td>
                  <td className="p-3">{item.count}</td>

                  <td className="p-3 text-right">
                    {item.product.price * item.count} Tk
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <OrderPricingDetails
        subTotalAmount={subTotalAmount}
        discount={discount}
      />
    </div>
  );
};

export default OrderItems;
