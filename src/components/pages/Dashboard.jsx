import axios from "axios";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import config from "../../config/config";
import CatSummary from "../common/dashboard/CatSummary";
import SellingStatus from "../common/dashboard/SellingStatus";
import StockSummary from "../common/dashboard/StockSummary";
import Summary from "../common/dashboard/Summary";
import PageHeader from "../common/PageHeader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  document.title = `Dashboard | PUCShop`;
  const [catLabels, setCatlabel] = useState([]);
  const [catData, setCatData] = useState([]);
  const [sellingStatus, setSellingStatus] = useState([]);
  const [sellingStatusAtr, setSellingStatusAtr] = useState("totalProduct");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, setYear] = useState(new Date().getFullYear());
  const [catYear, setCatYear] = useState(null);
  // console.log(year);

  useEffect(() => {
    let isLoaded = true;
    axios
      .get(
        `${config.SERVER_URL}/api/admin/dashboard/top-categories${
          catYear ? "?year=" + catYear : ""
        }`,
        config.headers
      )
      .then((res) => {
        if (isLoaded) {
          let labels = [];
          let data = [];
          res.data.data.forEach((item) => {
            labels.push(item.category.name);
            data.push(item.count);
          });
          setCatlabel(labels);
          setCatData(data);
        }
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [catYear]);

  useEffect(() => {
    let isLoaded = true;
    axios
      .get(
        `${config.SERVER_URL}/api/admin/dashboard/selling-status?year=${year}`,
        config.headers
      )
      .then((res) => {
        if (isLoaded) {
          let data = [];
          Object.keys(res.data.data).forEach((key) => {
            data.push(res.data.data[key][sellingStatusAtr]);
          });
          setSellingStatus(data);
        }
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [year, sellingStatusAtr]);
  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200">
      <PageHeader title="dashboard" />
      <div className="space-y-4">
        <Summary />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
          <StockSummary />
          <div className="bg-white p-2 border">
            <select
              className="w-full p-2 border"
              name=""
              id=""
              onChange={(event) => setCatYear(event.target.value)}
            >
              <option value="">All Time</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
            <CatSummary labels={catLabels} data={catData} />
          </div>
        </div>

        <div className="bg-white p-2 ">
          <div className="flex space-x-2">
            <select
              className="w-full p-2 border"
              name=""
              id=""
              onChange={(event) => setSellingStatusAtr(event.target.value)}
            >
              <option value="totalProduct">
                X: Month, Y: Total Product Sold
              </option>
              <option value="totalOrder">
                X: Month, Y: Total Delivered Order
              </option>
              <option value="totalSell">X: Month, Y: Total Sell (Tk)</option>
            </select>

            <select
              className="w-full p-2 border"
              name=""
              id=""
              onChange={(event) => setYear(event.target.value)}
            >
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
          <SellingStatus labels={monthNames} data={sellingStatus} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
