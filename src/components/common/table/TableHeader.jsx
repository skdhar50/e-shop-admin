const TableHeader = (props) => {
  const { tableName, numberOfItem, filterOptions } = props;
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
      <h2 className="font-semibold text-gray-800 uppercase">
        {tableName}
        <span className="text-gray-400 font-medium"> ({numberOfItem})</span>
      </h2>
      <div className="flex items-center text-sm font-medium space-x-4 text-gray-600">
        {filterOptions}
      </div>
    </div>
  );
};

export default TableHeader;
