import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../../config/config";

const OrderCustomerDetails = (props) => {
  const { id, name, email } = props;
  const [user, setUser] = useState("");
  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/users/${id}`, config.headers)
      .then((res) => {
        isLoaded && setUser(res.data.data.user);
        console.log(res.data.data.user);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [id]);
  return (
    <div className="flex flex-col bg-white px-3 rounded space-y-2 pb-2">
      <div className="flex justify-between border-b py-3">
        <h2 className="font-medium">Customer Details</h2>
        <a className="text-blue-500" href="#">
          View Profile
        </a>
      </div>
      <div className="flex space-x-3 pt-1">
        <img
          className="h-20 w-20"
          src={`${config.SERVER_URL}/public/storage/images/${
            user ? user.profile.photo : "../images/user.png"
          }`}
          alt=""
        />
        <div>
          <h2 className="font-medium">{name}</h2>
          <p className="text-sm text-gray-500">Customer</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <p className="pb-1">{email}</p>
      </div>
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <p className="pb-1">{user ? user.profile.phone : "N/A"}</p>
      </div>
    </div>
  );
};

export default OrderCustomerDetails;
