import ProductRatingsSummary from "./ProductRatingsSummary";
import ProductReviews from "./ProductReviews";

const ProductRatingsReviews = (props) => {
  const { reviews } = props;
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? (
        reviews.reduce(
          (accumulator, current) => accumulator + Number(current.rating),
          0
        ) / totalReviews
      ).toFixed(2)
    : "0.0";
  const getStars = () => {
    let stars = [0, 0, 0, 0, 0];
    for (let i = 0; i < reviews.length; i++) {
      if (Number(reviews[i].rating < 1.6)) {
        stars[0] += 1;
      } else if (Number(reviews[i].rating < 2.6)) {
        stars[1] += 1;
      } else if (Number(reviews[i].rating < 3.6)) {
        stars[2] += 1;
      } else if (Number(reviews[i].rating < 4.6)) {
        stars[3] += 1;
      } else if (Number(reviews[i].rating <= 5)) {
        stars[4] += 1;
      }
    }
    return stars;
  };
  return (
    <div className=" text-gray-900 font-medium space-y-1">
      <h2>Ratings & Reviews</h2>
      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 border p-2 rounded">
        <ProductRatingsSummary
          totalReviews={totalReviews}
          avgRating={avgRating}
          stars={getStars()}
        />
        <ProductReviews reviews={reviews} />

        {/* <div className="grow flex flex-col space-y-2">
          <h2>Reviews</h2>
          <div className="h-52 overflow-y-auto space-y-3 scrollbar-reviews pr-2">
            <div className="w-full border-dashed border rounded p-3 space-y-3">
              <div className="flex space-x-3">
                <div className="flex items-center rounded-full bg-teal-500 p-0.5 px-1 text-xs text-white font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.2</span>
                </div>
                <span className="border-l pl-3 text-sm text-gray-500">
                  Superb sweatshirt. I loved it. It is for winter
                </span>
              </div>
              <div className="flex space-x-2">
                <img
                  src="../images/img1.jfif"
                  alt=""
                  className="w-12 h-12 rounded"
                />
                <img
                  src="../images/img1.jfif"
                  alt=""
                  className="w-12 h-12 rounded"
                />
                <img
                  src="../images/img1.jfif"
                  alt=""
                  className="w-12 h-12 rounded"
                />
              </div>
              <div className="flex  justify-between items-center">
                <span>Henry</span>
                <span className="text-sm text-gray-400">12 Jul, 21</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductRatingsReviews;
