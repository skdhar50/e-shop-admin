import IconStarYellow from "../icons/IconStarYellow";

const ProductRatingsSummary = (props) => {
  const { avgRating, totalReviews, stars } = props;
  return (
    <div className="flex flex-col min-w-[18rem] space-y-4">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-between items-center bg-gray-100 p-3 text-sm text-gray-600 rounded-md">
          <div className="flex text-yellow-500">
            <IconStarYellow />
            <IconStarYellow />
            <IconStarYellow />
            <IconStarYellow />
            <IconStarYellow />
          </div>
          <span>{avgRating} Out of 5</span>
        </div>
        <span className="text-sm text-gray-600">
          Total {totalReviews} reviews
        </span>
      </div>
      <div className="w-full flex flex-col space-y-3 text-gray-500">
        {stars.map((item, indx) => {
          return (
            <div
              key={indx}
              className="w-full flex justify-between items-center space-x-2 text-sm"
            >
              <span>{indx + 1} Star</span>
              <div className="grow bg-gray-200 rounded-full h-[5px]">
                <div
                  className="bg-teal-500 w-[60%]d h-full rounded-full"
                  style={{ width: `${(item / totalReviews) * 100}%` }}
                ></div>
              </div>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductRatingsSummary;
