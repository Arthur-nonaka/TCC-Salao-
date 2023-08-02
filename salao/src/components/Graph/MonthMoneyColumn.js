import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function MonthSaleColumn({ email }) {
  const [values, setValues] = useState([]);

  useEffect(() => {}, []);

  let series = [
    { name: "Ganho Total", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    {
      name: "Despesas",
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
  ];

  var options = {
    chart: {
      type: "bar",
      height: 350,
    },
    series: series,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
    },
    yaxis: {
      title: {
        text: "R$",
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={350}  width={800}/>;
}

export default MonthSaleColumn;
