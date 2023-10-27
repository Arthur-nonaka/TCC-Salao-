import { useEffect, useState } from "react";
import axios from "axios";

function Profit({ email, year, month }) {
  const [range, setRange] = useState("anual");
  const [values, setValues] = useState({
    gross: [{ totalValue: 0.0 }],
    expenses: [{ expenseValue: 0.0 }],
  });

  useEffect(() => {
    axios
      .post("/pull/VendaDinheiro", { email, year, month, range })
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, [email, year, month, range]);

  return (
    <div className="m-1">
      <div className="btn-group mb-2" role="group">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setRange("anual")}
        >
          Anual
        </button>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setRange("mensal")}
        >
          Mensal
        </button>
      </div>
      <div className="card p-1 mb-2">{range}</div>
      <div className="card bg-light mb-2" style={{ width: "260px" }}>
        <h5 className="card-header ">Lucro Final</h5>
        <div className="card-body">
          <p
            className="card-text"
            style={
              values.gross[0].totalValue - values.expenses[0].expenseValue > 0
                ? { color: "green", fontSize: "30px" }
                : { color: "red", fontSize: "30px" }
            }
          >
            R${" "}
            {(
              values.gross[0].totalValue - values.expenses[0].expenseValue
            ).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="card mb-2 text-white" style={{ width: "260px" }}>
        <h5 className="card-header bg-danger">Despesas</h5>
        <div className="card-body">
          <p className="card-text" style={{ color: "red", fontSize: "30px" }}>
            R$ {values.expenses[0].expenseValue.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="card  mb-2 text-white" style={{ width: "260px" }}>
        <h5 className="card-header bg-success">Ganho</h5>
        <div className="card-body">
          <p className="card-text" style={{ color: "green", fontSize: "30px" }}>
            R$ {values.gross[0].totalValue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profit;
