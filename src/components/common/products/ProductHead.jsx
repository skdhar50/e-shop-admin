const ProductHead = (props) => {
  const { name, publishedDate } = props;
  const date = new Date(publishedDate);
  return (
    <>
      <h2 className="text-gray-700 font-medium text-xl">{name}</h2>
      <p className="text-gray-500 font-medium text-sm ">
        Published:{" "}
        <span className="text-gray-900">
          {date.toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </p>
    </>
  );
};

export default ProductHead;
