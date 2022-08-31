import IconCopy from "../icons/IconCopy";
import IconDb from "../icons/IconDb";
import IconDownload from "../icons/IconDownload";
import IconTaka from "../icons/IconTaka";
import ProductInfoSpan from "./ProductInfoSpan";

const ProductInfo = (props) => {
  const { price, totalSell, quantity, unitPrice } = props.data;
  const totalRevenue = () => {};
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pt-4">
      <ProductInfoSpan
        title="Price :"
        data={`${price} Tk`}
        icon={<IconTaka />}
      />
      <ProductInfoSpan
        title="Total Sell :"
        data={`${totalSell} Unit`}
        icon={<IconCopy />}
      />
      <ProductInfoSpan
        title="Stocks:"
        data={`${quantity} Unit`}
        icon={<IconDb />}
      />
      <ProductInfoSpan
        title="Total Rev.:"
        data={`${totalSell * price - totalSell * unitPrice} Tk`}
        icon={<IconDownload />}
      />
    </div>
  );
};

export default ProductInfo;
