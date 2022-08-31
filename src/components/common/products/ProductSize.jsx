const ProductSize = () => {
  return (
    <div className="sizes space-y-1">
      <span className="text-gray-700 font-medium">Sizes:</span>
      <div className="text-gray-500 flex space-x-2">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
          S
        </span>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
          M
        </span>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
          L
        </span>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
          XL
        </span>
      </div>
    </div>
  );
};

export default ProductSize;
