const SelectComp = (props) => {
  const { label, id, name, options, handler, errMsg, value } = props;
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        onChange={(e) => handler(name, e.target.value)}
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-2.5"
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
      {errMsg && <small className="text-red-500">{errMsg}</small>}
    </div>
  );
};

export default SelectComp;
