import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const VoucherInfo = (props) => {
  const { data } = props;
  const contextData = useContext(GlobalContext);
  return (
    <div className="flex flex-col min-w-[22rem] max-w-[22rem] space-y-4 rounded-md overflow-hidden shadow bg-white">
      <img
        src={`https://via.placeholder.com/600x400.png/f2f2f2?text=${data.code.toUpperCase()}`}
        alt=""
        className="w-full"
      />
      <table className="w-full text-sm text-left text-gray-500 font-semibold ">
        <tbody>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Code:</th>
            <td className="px-4 py-1 text-gray-900 uppercase">
              <h1 className="text-lg">{data.code}</h1>
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Start at:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.start_form.split("T")[0]}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">End at:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.expired_in.split("T")[0]}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Discount:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.discounted_amount}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Min Shop.:</th>
            <td className="px-4 py-1 text-gray-900">
              {data.min_shopping_amount}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-20">Limit:</th>
            <td className="px-4 py-1 text-gray-900">{data.offer_limit}</td>
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
          contextData.handleModal("voucher", "update", {
            _id: data._id,
            code: data.code,
            discounted_amount: data.discounted_amount,
            min_shopping_amount: data.min_shopping_amount,
            start_form: data.start_form.split("T")[0],
            expired_in: data.expired_in.split("T")[0],
            offer_limit: data.offer_limit,
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

export default VoucherInfo;
