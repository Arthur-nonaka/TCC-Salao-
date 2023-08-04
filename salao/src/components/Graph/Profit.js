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
  console.log(values);

  return (
    <div className="row d-flex align-items-center justify-content-center mt-2">
      <div className="col-3 d-flex align-items-center justify-content-center border me-2 rounded">
        <label style={{ color: "green", fontSize: "30px" }}>
          {values.gross[0].totalValue}
        </label>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-center  border me-2 rounded">
        <label style={{ color: "red", fontSize: "30px" }}>
          {values.expenses[0].expenseValue}
        </label>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-center  border rounded">
        <label
          style={
            values.gross[0].totalValue - values.expenses[0].expenseValue > 0
              ? { color: "green", fontSize: "30px" }
              : { color: "red", fontSize: "30px" }
          }
        >
          {values.gross[0].totalValue - values.expenses[0].expenseValue}
        </label>
      </div>
    </div>
  );
}

export default Profit;
