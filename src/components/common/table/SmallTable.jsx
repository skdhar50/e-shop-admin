import IconCross from "../icons/IconCross";

const SmallTable = (props) => {
  const { data, columns, action } = props;
  return (
    <div className="flex max-h-[15rem] overflow-y-auto">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-2 py-2">
              SL
            </th>
            {columns.map((item, indx) => {
              return (
                <th scope="col" className="px-2 py-2 last:text-right">
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, indx) => {
            return (
              <tr key={indx} className="bg-white border-b ">
                <td className="px-2 py-2">{indx + 1}</td>
                <th
                  scope="row"
                  className="px-2 py-2 font-medium text-gray-900  whitespace-nowrap"
                >
                  {item.name}
                </th>
                <td className="px-2 py-2">{item.quantity}</td>
                <td className={`px-2 py-2 ${action ? "" : "text-right"}`}>
                  {item.unit_cost}
                </td>

                {action && (
                  <td className="px-2 py-2 text-right">
                    <button
                      onClick={() => action(indx)}
                      type="button"
                      className="font-medium text-slate-400 hover:text-slate-600"
                    >
                      <IconCross />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SmallTable;
