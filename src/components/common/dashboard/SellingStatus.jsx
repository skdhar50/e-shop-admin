import { Bar } from "react-chartjs-2";

const SellingStatus = (props) => {
  const { labels, data } = props;
  const sellOptions = {
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
  const sellStatusData = {
    labels: labels,
    datasets: [
      {
        label: "Total sell",
        data: data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={sellOptions} data={sellStatusData} />;
};

export default SellingStatus;
