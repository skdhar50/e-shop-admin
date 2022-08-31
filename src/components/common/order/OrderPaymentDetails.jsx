import IconCreditCard from "../icons/IconCreditCard";

const OrderPaymentDetails = (props) => {
  const { transactionId, paymentMethod, paymentStatus } = props;
  return (
    <div className="flex flex-col bg-white px-3 rounded space-y-2 pb-2">
      <div className="flex items-center space-x-1 border-b py-3">
        <IconCreditCard />
        <h2 className="font-medium">Payment Details</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-sm">
          <span className="text-gray-500">Payment Status: </span>
          {paymentStatus}
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Transactions: </span>
          {transactionId || "N/A"}
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Payment Method: </span>{" "}
          <span className="uppercase">{paymentMethod}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderPaymentDetails;
