const InputComp = (props) => {
  const { label, id, placeholder, name, type, value, handler, errMsg } = props;
  // console.log(value);
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:border focus:border-gray-500 block w-full p-2.5"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handler(name, e.target.value)}
        autoComplete="off"
      />
      {errMsg && <small className="text-red-500">{errMsg}</small>}
    </div>
  );
};

export default InputComp;
