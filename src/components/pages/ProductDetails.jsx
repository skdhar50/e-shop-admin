import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import Loader from "../common/Loader";
import PageHeader from "../common/PageHeader";
import ProductColors from "../common/products/ProductColors";
import ProductDescription from "../common/products/ProductDescription";
import ProductHead from "../common/products/ProductHead";
import ProductInfo from "../common/products/ProductInfo";
import ProductPhotoSlider from "../common/products/ProductPhotoSlider";
import ProductRating from "../common/products/ProductRating";
import ProductRatingsReviews from "../common/products/ProductRatingsReviews";
import ProductShortDescription from "../common/products/ProductShortDescription";
import ProductSize from "../common/products/ProductSize";
import Qna from "../common/products/Qna";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.id;
  console.log(productId);
  const [product, setProduct] = useState();

  // fetch product
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(
        `${config.SERVER_URL}/api/admin/products/${productId}`,
        config.headers
      )
      .then((res) => {
        isLoaded && setProduct(res.data.data.product);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [productId]);
  // product && console.log(product.reviews.length);

  document.title = `Product - ${product ? product.name : ""} | PUCShop`;
  return product ? (
    <div
      className={`flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200`}
    >
      <PageHeader title="PRODUCT DETAILS" />

      <div className="w-full bg-white p-2">
        <div className="flex flex-col md:flex-row md:space-x-8 mb-10">
          {/* <!-- product gallery  --> */}
          <ProductPhotoSlider photos={product.photos} name={product.name} />
          <div className="flex flex-col space-y-6 lg:flex-grow ">
            <div className="basic-info space-y-1">
              <ProductHead
                name={product.name}
                publishedDate={product.createdAt}
              />
              <ProductRating review={product.reviews.length} />
              <ProductInfo data={product} />
            </div>
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between pt-4">
              <ProductSize />
              <ProductColors />
            </div>

            <ProductShortDescription
              description={product.shortDescription}
              title="Short Description"
            />
            <ProductShortDescription
              description={product.description}
              title="Full Description"
            />
            {/* <div className="flex flex-col lg:flex-row justify-start pt-4 space-y-3 lg:space-y-0 lg:space-x-1">
              <ProductFeatures />
              <ProductServices />
            </div> */}
            <ProductDescription data={product} />
            <ProductRatingsReviews reviews={product.reviews} />
            <Qna data={product.qna} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default ProductDetails;
