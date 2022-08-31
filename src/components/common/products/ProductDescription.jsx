const ProductDescription = (props) => {
  const { data } = props;

  return (
    <div className=" text-gray-900 space-y-1 font-medium">
      <h2>Product Details</h2>
      <table className="w-full border text-sm text-left text-gray-500 font-semibold ">
        <tbody>
          <tr>
            <th className="px-4 py-1 font-medium w-36">Brand:</th>
            <td className="px-4 py-1 text-gray-900">{data.brand.name}</td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-36 align-text-top">
              Category:
            </th>
            <td className="px-4 py-1 text-gray-900">
              {data.category.map((item, indx) => {
                return <p key={`cat-${indx}`}>{item.name}</p>;
              })}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-36">Weight:</th>
            <td className="px-4 py-1 text-gray-900 ">{data.weight || "N/A"}</td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-36">Color:</th>
            <td className="px-4 py-1 text-gray-900 ">
              {data.color ? (
                <div
                  className=" h-6 w-14 rounded-sm border"
                  style={{ backgroundColor: data.color }}
                ></div>
              ) : (
                "N/A"
              )}
            </td>
          </tr>

          <tr>
            <th className="px-4 py-1 font-medium w-36">Unit Cost:</th>
            <td className="px-4 py-1 text-gray-900 ">{data.unitPrice} Tk</td>
          </tr>
          <tr>
            <th className="px-4 py-1 font-medium w-36">Selling Price:</th>
            <td className="px-4 py-1 text-gray-900 ">{data.price} Tk</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDescription;
