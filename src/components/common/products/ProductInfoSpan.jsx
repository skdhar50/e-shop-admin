const ProductInfoSpan = (props) => {
  const { title, data, icon } = props;
  return (
    <div className="flex space-x-3 items-center border-dashed py-2 px-5 rounded border border-gray-300 min-w-[10rem]">
      {icon}
      <div className="flex flex-col font-medium">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-gray-700">{data}</span>
      </div>
    </div>
  );
};

export default ProductInfoSpan;
