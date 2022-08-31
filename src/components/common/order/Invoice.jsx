const Invoice = (props) => {
  const { data } = props;
  let subTotalAmount = 0;
  for (let i = 0; i < data.cartItem.length; i++) {
    subTotalAmount += data.cartItem[i].product.price * data.cartItem[i].count;
  }
  const humanTime = (date) => {
    date = new Date();
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-4xl text-blue-500">PUC Shop</h2>
          <p>Prabartak Circle, 1/A O.R. Nizam Rd</p>
          <p>Chattogram 4203</p>
          <p>Email: puchshop@mail.com</p>
          <p>Phone: +880 1754 65 87 81</p>
          <p>Web: https://www.pucshop.com.bd</p>
        </div>
        <div className="flex flex-col items-end">
          <h2 className="font-bold text-4xl text-blue-500 uppercase">
            Invoice
          </h2>
          <p>Date: {humanTime()}</p>
          <p>Invoice ID: {data.order_id}</p>
          <span className="flex space-x-1">
            Customer ID:{" "}
            <p className="uppercase pl-1">
              {data.user._id.toString().slice(data.user._id.length - 10)}
            </p>
          </span>
        </div>
      </div>
      <div className="w-96">
        <h2 className="p-1 text-blue-500 font-medium bg-blue-500mm border-2 border-black">
          Bill to:
        </h2>
        <table>
          <tbody>
            <tr>
              <td className="px-2">Name:</td>
              <td className="px-2">{data.address.name}</td>
            </tr>
            <tr>
              <td className="px-2">Phone:</td>
              <td className="px-2">{data.address.phone}</td>
            </tr>
            <tr>
              <td className="px-2 align-top">Address:</td>
              <td className="px-2">
                <p>
                  {data.address.address1}, {data.address.address2}
                </p>
                <p>Post/Zip Code: {data.address.postalCode}</p>
                <p>
                  {data.address.state}, {data.address.city}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full text-left p-2 border">
        <thead>
          <tr className="border-b">
            <th className="px-2">#</th>
            <th className="px-2">Product</th>
            <th className="px-2">Unit Price</th>
            <th className="px-2">Qty</th>
            <th className="px-2 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.cartItem.map((item, indx) => {
            return (
              <tr key={"cartitem_" + indx} className="border-b">
                <td className="px-2">{indx + 1}</td>
                <td className="px-2">{item.product.name}</td>
                <td className="px-2">{item.product.price} Tk</td>
                <td className="px-2">{item.count}</td>
                <td className="px-2 text-right">
                  {item.count * item.product.price} Tk
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between">
        <table className=" font-medium">
          <caption className="underline">Payment Details</caption>
          <tbody>
            <tr>
              <td className="text-left">Payment Status:</td>
              <td className="text-right uppercase ">{data.paymentStatus}</td>
            </tr>
            <tr>
              <td className="text-left">Method:</td>
              <td className="text-right uppercase">{data.payment_method}</td>
            </tr>
            <tr>
              <td className="text-left">Transaction ID:</td>
              <td className="text-right uppercase">{data.transaction_id}</td>
            </tr>
          </tbody>
        </table>
        <table className="w-56 font-medium">
          <tbody>
            <tr>
              <td className="text-left">Sub Total:</td>
              <td className="text-right">{subTotalAmount} Tk</td>
            </tr>
            <tr>
              <td className="text-left">Discount:</td>
              <td className="text-right">-{data.discount} Tk</td>
            </tr>
            <tr className="border-t">
              <td className="text-left">Grand Total:</td>
              <td className="text-right">
                {subTotalAmount - (data.discount ? data.discount : 0)} Tk
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center flex-col">
        <p className="font-medium">
          If you have any questions about this invoice, please contact with us.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
