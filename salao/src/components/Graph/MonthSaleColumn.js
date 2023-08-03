import { useState, useEffect, Fragment } from "react";
import Chart from "react-apexcharts";
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import axios from "axios";

function MonthSaleColumn({ email, year, setYear, setMonth }) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .post("/pull/VendaQuantidade", { email, year: year })
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [year]);

  const handleYearAdd = (event) => {
    event.preventDefault();
    setYear(year + 1);
  };

  const handleYearRemove = (event) => {
    event.preventDefault();
    setYear(year - 1);
  };

  var options = {
    chart: {
      type: "bar",
      height: 350,
      events: {
        dataPointSelection: function (e, chart, opts) {
          setMonth(opts.dataPointIndex + 1);
        },
      },
    },
    series: values,
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
    colors: ["rgba(0,227,150,1)"],
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
        text: "Vendas",
      },
      min: 0,
      max: 200,
      tickAmount: 5,
    },
  };

  return (
    <div className="month-sale">
      <Chart
        options={options}
        series={values}
        type="bar"
        height={300}
        width={700}
      />
      <div>
        <button onClick={handleYearRemove} className="buttonWithSymbol">
          {" "}
          <BsCaretLeftFill />{" "}
        </button>
        {year}
        <button onClick={handleYearAdd} className="buttonWithSymbol">
          {" "}
          <BsCaretRightFill />{" "}
        </button>
      </div>
    </div>
  );
}

export default MonthSaleColumn;
