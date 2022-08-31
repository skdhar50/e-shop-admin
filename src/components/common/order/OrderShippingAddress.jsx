const OrderShippingAddress = (props) => {
  const { address } = props;
  return (
    <div className="flex flex-col bg-white px-3 rounded space-y-2 pb-2">
      <div className="flex items-center space-x-1 border-b py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h2 className="font-medium">Shipping Address</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{address.name}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{address.phone}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{address.address2}</td>
            </tr>
            <tr>
              <td></td>
              <td>{address.address1}</td>
            </tr>
            <tr>
              <td>Area:</td>
              <td>{address.state}</td>
            </tr>
            <tr>
              <td>City:</td>
              <td>{address.city}</td>
            </tr>

            <tr>
              <td>Postal Code:</td>
              <td>{address.postalCode}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{address.country}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderShippingAddress;
