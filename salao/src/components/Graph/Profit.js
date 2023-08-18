import { useEffect, useState } from "react";
import axios from "axios";

function Profit({ email }) {
  const [values, setValues] = useState({
    gross: [{ totalValue: 0 }],
    expenses: [{ expenseValue: 0 }],
  });

  useEffect(() => {
    axios
      .post("/pull/VendaDinheiro", { email })
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="m-1">
      <div className="card bg-light mb-3" style={{ width: "160px" }} >
        <h5 className="card-header ">Lucro Final</h5>
        <div className="card-body">
          <p className="card-text" style={values.gross[0].totalValue - values.expenses[0].expenseValue > 0
            ? { color: "green", fontSize: "30px" }
            : { color: "red", fontSize: "30px" }}>{values.gross[0].totalValue - values.expenses[0].expenseValue}</p>
        </div>
      </div>
      <div className="card mb-3 text-white" style={{ width: "160px" }}>
        <h5 className="card-header bg-danger">Despesas</h5>
        <div className="card-body">
          <p className="card-text" style={{ color: "red", fontSize: "30px" }}>{values.expenses[0].expenseValue}</p>
        </div>
      </div>
      <div className="card  mb-3 text-white" style={{ width: "160px" }}>
        <h5 className="card-header bg-success">Ganho</h5>
        <div className="card-body">
          <p className="card-text" style={{ color: "green", fontSize: "30px" }}>{values.gross[0].totalValue}</p>
        </div>
      </div>
    </div>
  );
}

export default Profit;
