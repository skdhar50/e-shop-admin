import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCloseModal from "./form/BtnCloseModal";

const EmployeeDetails = () => {
  // const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const data = contextData.modal.data;

  return (
    <div className="mx-auto w-[40rem]">
      <div className="relative py-5 px-5 md:px-10 md:py-10 bg-white shadow-md rounded border border-gray-400">
        <div className="flex flex-col items-center ">
          <img
            className="w-32 h-32 rounded-full z-10"
            src="./images/user.png"
            alt=""
          />
          <div className="flex flex-col w-full items-center  -mt-16 space-y-4 rounded bg-slate-200 p-2">
            <h1 className="font-medium text-2xl uppercase mt-16">
              {data.name}
            </h1>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="bg-white rounded p-2">
                <h1 className="text-sm font-medium text-gray-500">
                  Personal Info
                </h1>
                <table className="w-full text-xs text-left text-gray-500 font-semibold ">
                  <tbody>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Email:</th>
                      <td className="px-2 py-2 text-gray-900">{data.email}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Phone:</th>
                      <td className="px-2 py-2 text-gray-900">{data.phone}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">NID:</th>
                      <td className="px-2 py-2 text-gray-900">{data.nid}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Address:</th>
                      <td className="px-2 py-2 text-gray-900">
                        <p>{data.address}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded p-2">
                <h1 className="text-sm font-medium text-gray-500">
                  Other Info
                </h1>
                <table className="w-full text-xs text-left text-gray-500 font-semibold ">
                  <tbody>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Join:</th>
                      <td className="px-2 py-2 text-gray-900">
                        {data.joining_date}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">
                        Designation:
                      </th>
                      <td className="px-2 py-2 text-gray-900">{data.type}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Shift:</th>
                      <td className="px-2 py-2 text-gray-900">{data.shift}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Salary:</th>
                      <td className="px-2 py-2 text-gray-900">{data.salary}</td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 font-medium w-20">Status:</th>
                      <td className="px-2 py-2 text-gray-900">
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
            </div>
          </div>
        </div>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default EmployeeDetails;
