import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function MethodDonut({ email, month, year }) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .post("/pull/VendaMetodoMes", { email, month, year })
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [month, year]);

  let series = [];
  let labels = [];
  values.forEach((value) => {
    series.push(value.series);
    labels.push(value.labels);
  });

  var options = {
    chart: {
      type: "donut",
      width: 320,
    },
    dataLabels: { enabled: false },
    legend: {
      show: false,
      position: "bottom",
    },
    //colors: ['#008FFB', '#FEB019', '#7AEA77', '#FF4560'],
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: {
              show: true,
              color: "#000",
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: "Mês",
              color: "#000000",
            },
          },
        },
      },
    },
    labels: labels,
  };

  return (
    <div style={{ display: "flex", justifyContent: "start" }}>
      <Chart
        options={options}
        series={series}
        width={200}
        height={200}
        type="donut"
      />
    </div>
  );
}

export default MethodDonut;
