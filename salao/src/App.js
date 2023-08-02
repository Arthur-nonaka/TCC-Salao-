import NavBar from "./components/NavBar";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import MethodDonut from "./components/Graph/MethodDonut";
import ServicesPie from "./components/Graph/ServicesPie";
import MonthSaleColumn from "./components/Graph/MonthSaleColumn";

function App() {
  const currentLocation = useLocation();
  const email = currentLocation.state.email;

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState();

  let content = <Outlet />;
  if (currentLocation.pathname === "/beautyflow") {
    content = (
      <div className="row">
        <div className="graph-container">
          <MethodDonut email={email} />
          <ServicesPie email={email} year={year} month={month}/>
        </div>
        <div className="graph-container">
          <MonthSaleColumn email={email} year={year} setYear={setYear} setMonth={setMonth}/>
        </div>
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
