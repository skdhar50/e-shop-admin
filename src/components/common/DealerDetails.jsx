import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCloseModal from "./form/BtnCloseModal";
import IconCubeBig from "./icons/IconCubeBig";

const DealerDetails = () => {
  const contextData = useContext(GlobalContext);
  const data = contextData.modal.data;

  return (
    <div className="mx-auto w-[40rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2  text-gray-600 mb-3">
          <IconCubeBig />
          <span className="text-2xl font-bold">{data.company}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 w-full">
          <div className="col-span-3 bg-slate-100 rounded p-2">
            <table className="w-full text-sm text-left text-gray-500 font-semibold ">
              <tbody>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Company:</th>
                  <td className="px-2 py-1.5 text-gray-800">{data.company}</td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Representer:</th>
                  <td className="px-2 py-1.5 text-gray-800">{data.name}</td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Phone:</th>
                  <td className="px-2 py-1.5 text-gray-800">{data.phone}</td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Email:</th>
                  <td className="px-2 py-1.5 text-gray-800">{data.email}</td>
                </tr>

                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Address:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    <p>{data.address}</p>
                  </td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-20">Status:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    {data.status === "active" ? (
                      <span className="px-3 py-1 bg-green-100 rounded-full text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 rounded-full text-red-500">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-span-2 bg-slate-100 rounded p-2">
            <h1 className="text-sm text-gray-500 font-medium">Products:</h1>
            <div className="max-h-[15rem] mt-1 bg-white p-2 rounded space-y-1 overflow-y-auto">
              {data.products.map((item, indx) => {
                return (
                  <p key={indx} className="text-sm font-medium">
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default DealerDetails;
