import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function ServicesPie({ email, year, month }) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .post("/pull/VendaServicos", { email, year, month })
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [month]);

  let series = [];
  let labels = [];
  values.forEach((value) => {
    series.push(value.series);
    if(value.labels.length > 19) {
        labels.push(value.labels.substring(0, 19) + "...");
    } else {
        labels.push(value.labels);
    }
  });

  var options = {
    chart: {
      type: "pie",
      width: 340,
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
        width={425}
        height={187}
        type="pie"
      />
  );
}

export default ServicesPie;
