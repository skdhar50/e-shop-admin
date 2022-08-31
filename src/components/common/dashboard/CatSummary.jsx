import { Bar } from "react-chartjs-2";

const CatSummary = (props) => {
  const { labels, data } = props;
  const options = {
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
  const data2 = {
    labels: labels,
    datasets: [
      {
        label: "Total sold",
        data: data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data2} />;
};

export default CatSummary;
