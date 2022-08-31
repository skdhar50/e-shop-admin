import { useContext } from "react";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";

const OfferInfo = (props) => {
  const { data } = props;
  const contextData = useContext(GlobalContext);
  return (
    <div className="flex flex-col min-w-[22rem] max-w-[22rem] space-y-4 rounded-md overflow-hidden shadow bg-white">
      <div className="flex justify-center p-2">
        <img
          className="h-56"
          src={
            data.photo
              ? `${config.SERVER_URL}/public/storage/images/${data.photo}`
              : `https://via.placeholder.com/600x400.png/f2f2f2?text=${
                  data.name.split(" ")[0]
                }`
          }
          alt=""
        />
      </div>
      <table className="w-full text-sm text-left text-gray-500 font-semibold ">
        <tbody>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Name:</th>
            <td className="px-4 py-1 text-gray-900">
              <h1 className="text-base">{data.name}</h1>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Start at:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.startDate.split("T")[0]}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">End at:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.endDate.split("T")[0]}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Discount:</th>
            <td className="px-4 py-1 text-gray-900">{data.discountAmount}</td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Limit:</th>
            <td className="px-4 py-1 text-gray-900">{data.limit}</td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Status:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.status === "active" ? (
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
          <tr>
            <th className="px-4 py-1 font-medium w-20">Description:</th>
            <td className="px-4 py-1 text-gray-900">{data.description}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() =>
          contextData.handleModal("offer", "update", {
            _id: data._id,
            name: data.name,
            startDate: data.startDate.split("T")[0],
            endDate: data.endDate.split("T")[0],
            description: data.description,
            discountAmount: data.discountAmount,
            limit: data.limit,
            status: data.status,
          })
        }
        className="p-2 mx-4 !mb-4 rounded uppercase bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Edit
      </button>
    </div>
  );
};

export default OfferInfo;
