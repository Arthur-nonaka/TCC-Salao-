import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function MethodDonutTotal({ email }) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .post("/pull/VendaMetodo", { email })
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

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
    legend: {
      position: 'right'
    },
    //colors: ['#008FFB', '#FEB019', '#7AEA77', '#FF4560'],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
                show: true,
                color: "#000"
            },
            value: {
                show: true,
            },
            total: {
              show: true,
              label: "Vendas Total",
              color: "#000000"
            },
          },
        },
      },
    },
    labels: labels,
  };

  return (
    <div style={{display: "flex", justifyContent: "start"}}>
      <Chart options={options} series={series} width={320} height={220} type="donut" />
    </div>
  );
}

export default MethodDonutTotal;
