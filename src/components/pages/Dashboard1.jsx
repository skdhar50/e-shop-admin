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
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const data = {
  labels: ["Revenue", "Cost"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 3],
      backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};

// Bar chart options
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "",
    },
    title: {
      display: true,
      text: "Top 5 (five) Categories",
    },
  },
};

export const sellOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "",
    },
    title: {
      display: true,
      text: "Selling Status",
    },
  },
};

const labels = ["Fashion", "Accessory", "Grocery", "Computer & Phone", "Shirt"];
const sellStatusLabel = [
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

export const data2 = {
  labels,
  datasets: [
    {
      label: "Total sold",
      data: [100, 200, 130, 50, 400],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const sellStatusData = {
  labels: sellStatusLabel,
  datasets: [
    {
      label: "Total sell",
      data: [100, 200, 130, 50, 100, 200, 130, 50, 150, 210, 300, 30],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200">
      {/* <!-- start body header --> */}
      <div className="flex justify-between">
        {/* <!-- Include the section title  --> */}
        <h2 className="text-3xl font-bold text-gray-800 uppercase">
          Dashboard
        </h2>
        {/* <!-- start section options  --> */}
        <div className="flex items-center space-x-4">
          {/* <h2 className="hidden md:block">Other options</h2>
          <button className="flex items-center space-x-2 bg-indigo-600 text-slate-100 h-8 px-1.5 rounded hover:bg-indigo-700">
            <span className="font-semibold">Open Modal</span>
          </button> */}
        </div>
        {/* <!-- end section options  --> */}
      </div>
      {/* <!-- end body header  --> */}

      {/* <!-- start body  --> */}
      <div className="w-full bg-white h-screen px-4 space-y-8 pt-4">
        <div className="grid grid-cols-4 gap-6">
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Total Users</p>
            <p className="text-4xl font-medium text-gray-700">599</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Total Sales</p>
            <p className="text-4xl font-medium text-gray-700">5000 Tk</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Pending Orders</p>
            <p className="text-4xl font-medium text-gray-700">8</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Categories</p>
            <p className="text-4xl font-medium text-gray-700">45</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Brands</p>
            <p className="text-4xl font-medium text-gray-700">18</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Total Revenue</p>
            <p className="text-4xl font-medium text-gray-700">8900 Tk</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Total Cost</p>
            <p className="text-4xl font-medium text-gray-700">5000</p>
          </div>
          <div className=" h-fit border rounded shadow-md bg-slate-50 text-center py-4 space-y-3">
            <p className="text-xl font-medium text-gray-600">Total Employess</p>
            <p className="text-4xl font-medium text-gray-700">18</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 pt-6">
          <div className=" border rounded shadow-md bg-slate-50 p-6 text-center space-y-6">
            <div className="text-3xl font-medium text-gray-600 border-b pb-4 border-gray-300">
              Product Stocks
            </div>
            <div className="space-y-4">
              <div className="flex items-center  justify-between px-6">
                <p className="text-2xl text-gray-600">In Stocks</p>
                <p className="text-3xl text-gray-700">
                  5000 <span className="text-xl italic">Items</span>
                </p>
              </div>
              <div className="flex items-center  justify-between px-6">
                <p className="text-2xl text-gray-600">Out of Stocks</p>
                <p className="text-3xl text-gray-700">
                  50 <span className="text-xl italic">Items</span>
                </p>
              </div>
              <div className="flex items-center  justify-between px-6">
                <p className="text-2xl text-gray-600">Almost out of Stocks</p>
                <p className="text-3xl text-gray-700">
                  20 <span className="text-xl italic">Items</span>
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <Bar options={options} data={data2} />
          </div>
        </div>

        <div className="">
          <Bar options={sellOptions} data={sellStatusData} />
        </div>
      </div>
      {/* <!-- end body  --> */}
    </div>
  );
};

export default Dashboard;
