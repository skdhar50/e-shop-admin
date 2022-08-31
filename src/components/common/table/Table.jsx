import { useState } from "react";
import SkeletonTable from "../SkeletonTable";
const Table = (props) => {
  const [timeCount, setTimeCount] = useState(0);
  // const [noData, setNoData] = useState(false);

  const { columnHeader, columns, items, activePage, pageCount, resStatus } =
    props;
  setTimeout(() => {
    setTimeCount(1);
  }, 400);

  if (items.length && timeCount) {
    return (
      <table className="table-auto min-w-full divide-y font-medium text-gray-800 divide-gray-100 animate-fade">
        <thead className="sticky top-0 shadow-sm text-xs uppercase font-semibold text-left text-gray-900 bg-gray-50">
          <tr>
            <th className=" first:pl-6 last:pr-6 last:text-right py-3 whitespace-nowrap w-px px-4">
              SL
            </th>

            {columnHeader.map((item, indx) => {
              return (
                <th
                  key={indx}
                  className=" first:pl-6 last:pr-6 last:text-right py-3 whitespace-nowrap uppercase"
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {items.map((item, indx) => (
            <tr key={"tr-" + indx} className="text-gray-500 hover:bg-gray-100">
              <td className="px-2 first:pl-6 last:pr-6 py-3 whitespace-nowrap">
                {indx + (activePage - 1) * pageCount + 1}
              </td>
              {columns.map((column, indx) => (
                <td key={"td-" + indx}>{column.content(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (!resStatus) {
    return <SkeletonTable length={columnHeader.length} />;
  } else {
    return (
      <h2 className="font-medium text-2xl text-center py-5">No Data Found</h2>
    );
  }
};

export default Table;
