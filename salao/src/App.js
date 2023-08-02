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
      <div className="container" style={{width: "800px"}}>
        <div className="row d-flex justify-content-center ">
          <div className="col">
            <MethodDonut email={email} />
          </div>
          <div className="col">
            <ServicesPie email={email} year={year} month={month} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MonthSaleColumn
              email={email}
              year={year}
              setYear={setYear}
              setMonth={setMonth}
            />
          </div>
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
