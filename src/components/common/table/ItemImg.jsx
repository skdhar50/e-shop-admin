import { Link } from "react-router-dom";
import config from "../../../config/config";

const ItemImg = (props) => {
  const { link, imgLink, title } = props;
  return (
    <div>
      <Link
        to={link}
        className="flex items-center space-x-2 hover:text-indigo-500"
      >
        <img
          className="h-10 w-10 rounded-full border-2 border-gray-200"
          src={
            imgLink
              ? `${config.SERVER_URL}/public/storage/images/${imgLink}`
              : `https://via.placeholder.com/100x100.png/f2f2f2?text=${
                  title.split(" ")[0]
                }`
          }
          alt=""
        />
        {title && (
          <h1 className=" text-gray-900 hover:text-blue-600">{title}</h1>
        )}
      </Link>
    </div>
  );
};

export default ItemImg;
