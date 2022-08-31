import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
import CRMAreas from "./CRMAreas";
import CRMOrder from "./CRMOrder";
import CRMProducts from "./CRMProducts";

const CRM = () => {
  document.title = `CRM | PUCShop`;
  const [data, setData] = useState([]);
  const [locations, setLocation] = useState([]);
  const [section, setSection] = useState(1);

  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/orders`, config.headers)
      .then((res) => {
        isLoaded && setData(res.data.data.orders);
        // console.log(res.data.data.orders);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  // fetch locations
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/crm/locations`, config.headers)
      .then((res) => {
        isLoaded && setLocation(res.data.data.locations);
        // console.log(res.data.data.locations);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  return (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200"
    >
      <ul className="flex space-x-3 bg-white p-2">
        <li>
          <button
            onClick={() => setSection(1)}
            className={`px-5 py-1 rounded-sm shadow-sm font-medium ${
              section === 1
                ? "text-white bg-indigo-600"
                : "bg-slate-100 hover:bg-slate-200"
            }  `}
          >
            Order
          </button>
        </li>
        <li>
          <button
            onClick={() => setSection(2)}
            className={`px-5 py-1 rounded-sm shadow-sm font-medium ${
              section === 2
                ? "text-white bg-indigo-600"
                : "bg-slate-100 hover:bg-slate-200"
            }  `}
          >
            Areas By Most Order
          </button>
        </li>
        <li>
          <button
            onClick={() => setSection(3)}
            className={`px-5 py-1 rounded-sm shadow-sm font-medium ${
              section === 3
                ? "text-white bg-indigo-600"
                : "bg-slate-100 hover:bg-slate-200"
            }  `}
          >
            Products By Area
          </button>
        </li>
      </ul>
      {section === 1 && (
        <CRMOrder
          data={data}
          setData={setData}
          locations={locations}
          setLocation={setLocation}
        />
      )}
      {section === 2 && (
        <CRMAreas
          data={data}
          setData={setData}
          locations={locations}
          setLocation={setLocation}
        />
      )}
      {section === 3 && (
        <CRMProducts
          data={data}
          setData={setData}
          locations={locations}
          setLocation={setLocation}
        />
      )}
    </div>
  );
};

export default CRM;
