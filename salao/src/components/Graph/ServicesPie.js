import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ServicesPie({ email, year, month, setShowLoading }) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    setShowLoading(true);
    axios
      .post("/pull/VendaServicos", { email, year, month })
      .then((res) => {
        setValues(res.data);
        setShowLoading(false);
      })
      .catch((err) => console.log(err));
  }, [month, year]);

  let series = [];
  let labels = [];
  values.forEach((value) => {
    series.push(value.series);
    if (value.labels.length > 19) {
      labels.push(value.labels.substring(0, 19) + "...");
    } else {
      labels.push(value.labels);
    }
  });

  var options = {
    chart: {
      type: "pie",
      width: 340,
      height: 400,
    },
    dataLabels: { enabled: false },
    legend: {
      position: "bottom",
    },
    //colors: ['#008FFB', '#FEB019', '#7AEA77', '#FF4560'],
    plotOptions: {
      pie: {},
    },
    labels: labels,
    series: series,
  };

  return (
    <Chart
      options={options}
      series={series}
      width={250}
      height={250}
      type="pie"
    />
  );
}

export default ServicesPie;
