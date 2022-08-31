const ProductShortDescription = (props) => {
  return (
    <div className="flex flex-col space-y-1 ">
      <h2 className="font-medium text-gray-900">{props.title}</h2>
      <p className=" font-mediumm bg-white border rounded  p-2 m-0 text-justify">
        {props.description}
      </p>
    </div>
  );
};

export default ProductShortDescription;
