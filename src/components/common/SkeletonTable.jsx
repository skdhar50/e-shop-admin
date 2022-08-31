const SkeletonTable = (props) => {
  const { length } = props;
  return (
    <table className="table-auto animate-pulse min-w-full divide-y font-medium text-gray-800 divide-gray-200">
      <thead className="sticky top-0 shadow-sm text-xs uppercase font-semibold text-left text-gray-900 bg-gray-50">
        <tr>
          <th className=" first:pl-6 last:pr-6 last:text-right py-2 whitespace-nowrap w-px">
            <span className="bg-gray-200 px-3  rounded-full"></span>
          </th>
          {[...Array(length).keys()].map((item) => (
            <th
              key={`th-${item}`}
              className=" first:pl-6 last:pr-6 last:text-right py-2 whitespace-nowrap w-px px-2"
            >
              <span className="bg-gray-200 px-8  rounded-full"></span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(6).keys()].map((item) => (
          <tr key={`tr-${item}`} className="text-gray-500">
            <td className=" first:pl-6 last:pr-6 py-1 whitespace-nowrap">
              <div className="bg-gray-200 w-6 h-4 rounded-full"></div>
            </td>
            <td className="px-2 first:pl-6 last:pr-6 last:float-right py-1 whitespace-nowrap">
              <div className="flex space-x-2 items-center">
                <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
                <div className="bg-gray-200 w-24 h-4 rounded-full"></div>
              </div>
            </td>
            {[...Array(length - 3).keys()].map((item) => (
              <td
                key={`td-${item}`}
                className="px-2 first:pl-6 last:pr-6 last:float-right py-1 whitespace-nowrap"
              >
                <div className="bg-gray-200 w-14 h-4 rounded-full"></div>
              </td>
            ))}
            <td className="px-2 first:pl-6 last:pr-6 last:float-right py-1 whitespace-nowrap">
              <div className="bg-gray-200 w-16 h-6 rounded-full"></div>
            </td>
            <td className="px-2 first:pl-6 last:pr-6 last:float-right py-3 whitespace-nowrap">
              <div className="flex space-x-2">
                <div className="bg-gray-200 w-7 h-7 rounded-full"></div>
                <div className="bg-gray-200 w-7 h-7 rounded-full"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
