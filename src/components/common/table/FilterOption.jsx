const FilterOption = (props) => {
  const { label, options, onChangeHandler, filterBy } = props;
  return (
    <div className="flex items-center space-x-1">
      <label htmlFor={label}>{label}</label>
      <select
        onChange={(e) => onChangeHandler(filterBy, e.target.value)}
        name=""
        id={label}
        className="text-sm rounded-full w-16 px-2 py-1 bg-gray-200"
      >
        <option value="all">All</option>
        {options.map((item, indx) => {
          return (
            <option key={indx} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterOption;
