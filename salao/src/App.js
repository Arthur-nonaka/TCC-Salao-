import NavBar from "./components/NavBar";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function App() {
  const currentLocation = useLocation();
  const email = currentLocation.state.email;
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .post("/pull/VendaMetodo", { email })
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  let series = [];
  let labels = [];
  values.forEach(value => {
      series.push(value.series);
      labels.push(value.labels);
  });

  var options = {
    chart: {
      type: "donut",
    },
    //colors: ['#008FFB', '#FEB019', '#7AEA77', '#FF4560'],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    labels: labels,
  };

  let content = <Outlet />;
  if (currentLocation.pathname === "/beautyflow") {
    content = (
      <div>
        <Chart
          options={options}
          series={series}
          width={350}
          type="donut"
        />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      {content}
    </div>
  );
}

export default App;
