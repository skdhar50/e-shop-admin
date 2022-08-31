const SelectCompForTable = (props) => {
  const { id, name, options, handler, value } = props;
  return (
    <div className="flex flex-col">
      <select
        onChange={(e) => handler(id, name, e.target.value)}
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-1"
        value={value}
      >
        {value ? "" : <option>...Select...</option>}
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

export default SelectCompForTable;
