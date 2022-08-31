import ProductUpdateForm from "../common/form/ProductUpdateForm";
import PageHeader from "../common/PageHeader";

const ProductUpdate = () => {
  document.title = `Update Product | PUCShop`;
  // const params = useParams();
  // const productId = params.id;
  // console.log(productId);
  // const [product, setProduct] = useState();

  //   product && console.log(product);
  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200">
      <PageHeader title="UPDATE PRODUCT" />
      <div className="w-full">
        <ProductUpdateForm />
      </div>
    </div>
  );
};

export default ProductUpdate;
