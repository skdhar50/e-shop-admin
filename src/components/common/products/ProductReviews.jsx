import { Link } from "react-router-dom";
import config from "../../../config/config";
import IconStarSmall from "../icons/IconStarSmall";

const ProductReviews = (props) => {
  return (
    <div className="grow flex flex-col space-y-2">
      <h2>Reviews</h2>
      <div className="h-52 overflow-y-auto space-y-3 scrollbar-reviews pr-2">
        {props.reviews.map((item, indx) => {
          return (
            <div
              key={indx}
              className="w-full border-dashed border rounded p-3 space-y-3"
            >
              <div className="flex space-x-3">
                <div className="flex items-center rounded-full bg-teal-500 p-0.5 px-1 text-xs h-4 text-white font-medium">
                  <IconStarSmall />
                  <span>{item.rating}</span>
                </div>
                <div className="flex flex-col space-y-2 border-l pl-3 text-sm text-gray-500">
                  <p>{item.review}</p>

                  <div className="flex space-x-2 overflow-x-auto scrollbar-reviews pb-1">
                    {item.photos.map((photo, indx) => {
                      return (
                        <img
                          key={"review-photo" + indx}
                          src={`${config.SERVER_URL}/public/storage/reviews/${photo}`}
                          alt=""
                          className="w-12 h-12 rounded"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex  justify-between items-center">
                <div className="flex space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Link
                    to={`/customers/${item.user._id}`}
                    className="text-blue-500"
                  >
                    {item.user ? item.user.name : "N/A"}
                  </Link>
                </div>

                <span className="text-sm text-gray-400">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
