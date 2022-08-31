const InputSearch = (props) => {
  const { handler, placeholder } = props;
  return (
    <input
      type="text"
      id="search-product"
      className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded px-2 py-1.5"
      placeholder={placeholder}
      onChange={(e) => handler(e.target.value)}
    />
  );
};

export default InputSearch;
