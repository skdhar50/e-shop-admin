import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCloseModal from "./form/BtnCloseModal";
import IconCubeBig from "./icons/IconCubeBig";
import SmallTable from "./table/SmallTable";

const DealDetails = () => {
  const contextData = useContext(GlobalContext);
  const data = contextData.modal.data;

  return (
    <div className="mx-auto w-[40rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2  text-gray-600 mb-3">
          <IconCubeBig />
          <span className="text-2xl font-bold">{data.dealer.company}</span>
        </div>

        <div className="flex flex-col w-full">
          <div className=" bg-slate-100 rounded p-2">
            <table className="w-full text-sm text-left text-gray-500 font-semibold ">
              <tbody>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">Company:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    {data.dealer.company}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">Representer:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    {data.dealer.name}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">Date:</th>
                  <td className="px-2 py-1.5 text-gray-800">{data.date}</td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">Deal Value:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    {data.deal_value}
                  </td>
                </tr>

                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">Due:</th>
                  <td className="px-2 py-1.5 text-gray-800">
                    <p>{data.due}</p>
                  </td>
                </tr>
                <tr>
                  <th className="px-2 py-1.5 font-medium w-32">
                    Payment Status:
                  </th>
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
            <h1 className="text-sm text-gray-500 font-medium p-2">Products:</h1>
            <div className="rounded-sm overflow-hidden  p-2">
              <SmallTable
                columns={["Product Name", "Unit Cost", "Quantity"]}
                data={data.products}
              />
            </div>
          </div>
        </div>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default DealDetails;
