const OrderPricingDetails = (props) => {
  const { subTotalAmount, discount } = props;
  const shippingCharge = 0;
  const estimatedTax = 0;
  return (
    <div className="border-dashed border-t flex flex-row-reverse p-3">
      <div className="w-80">
        <table className="w-full text-sm font-medium">
          <tbody>
            <tr>
              <td className="py-2">Sub Total:</td>
              <td className="py-2 text-right">{subTotalAmount} Tk</td>
            </tr>
            <tr>
              <td className="py-2">Discount:</td>
              <td className="py-2 text-right">-{discount ? discount : 0} Tk</td>
            </tr>
            <tr>
              <td className="py-2">Shipping Charge:</td>
              <td className="py-2 text-right">{shippingCharge} TK *</td>
            </tr>
            <tr>
              <td className="py-2">Estimated Tax:</td>
              <td className="py-2 text-right">{estimatedTax} Tk *</td>
            </tr>
          </tbody>
          <tfoot className="border-dashed border-t">
            <tr>
              <td className="py-2">Total:</td>
              <td className="py-2 text-right">
                {subTotalAmount +
                  shippingCharge +
                  estimatedTax -
                  (discount ? discount : 0)}{" "}
                Tk
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default OrderPricingDetails;
