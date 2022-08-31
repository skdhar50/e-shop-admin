import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";

const CreateProduct = () => {
  const userId = useParams().id;
  const [user, setUser] = useState();

  // fetch users
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/users/${userId}`, config.headers)
      .then((res) => {
        isLoaded && setUser(res.data.data.user);
        // console.log(res.data.data.user);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [userId]);
  const countOrder = (status) => {
    let count = 0;
    const orders = user.orders;
    orders.forEach((item) => {
      if (item.status === status) {
        count += 1;
      }
    });
    return count;
  };

  document.title = `Profile - ${user ? user.name : ""} | PUCShop`;

  return user ? (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200"
    >
      {/* <PageHeader title="user Profile" /> */}
      <div className="flex space-x-4">
        <div className="w-[25rem] shadow rounded flex flex-col space-y-4 bg-white py-2 text-gray-800">
          <div className="flex flex-col items-center justify-center space-y-4">
            <img
              className="w-60 aspect-square rounded-full"
              src={
                user.profile
                  ? `${config.SERVER_URL}/public/storage/images/${user.profile.photo}`
                  : "../images/user.png"
              }
              alt="profile"
            />
            <p className="font-bold text-2xl px-2">{user.name}</p>
          </div>
          <table className="w-full text-sm text-left text-gray-500 font-semibold ">
            <tbody>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Email:</th>
                <td className="px-4 py-1 text-gray-900">{user.email}</td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Phone:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.profile.phone}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Gender:</th>
                <td className="px-4 py-1 text-gray-900 uppercase">
                  {user.profile.gender}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Birth Date:</th>
                <td className="px-4 py-1 text-gray-900 ">
                  {user.profile.birthdate}
                </td>
              </tr>
              <tr>
                <th className="px-4 py-1 font-medium w-28">Status:</th>
                <td className="px-4 py-1 text-gray-900">
                  {user.status === "active" ? (
                    <span className="px-4 py-1 bg-green-100 rounded-full text-green-600">
                      Active
                    </span>
                  ) : (
                    <span className="px-4 py-1 bg-red-100 rounded-full text-red-500">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grow border bg-white p-2 rounded ">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Total Order</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {user.orders.length}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Delivered Order</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {countOrder("delivered")}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Returned Order</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {countOrder("returned")}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Cart Items</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {user.cartItmes.length}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Reviews</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {user.reviews.length}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">QNA</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {user.qnas.length}
              </span>
            </div>
            <div className="flex flex-col h-24 items-center justify-center bg-slate-100">
              <h2 className="font-medium text-xl">Wishlists</h2>
              <span className="font-bold text-4xl text-indigo-600">
                {user.wishlists.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateProduct;
