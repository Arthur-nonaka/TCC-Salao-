import NavBar from "./components/NavBar";
import ReactDOM from "react-dom";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import MethodDonut from "./components/Graph/MethodDonut";
import MethodDonutTotal from "./components/Graph/MethodDonutTotal";
import ServicesPie from "./components/Graph/ServicesPie";
import MonthSaleColumn from "./components/Graph/MonthSaleColumn";
import Profit from "./components/Graph/Profit";
import MethodDonutYear from "./components/Graph/MethodDonutYear";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const currentLocation = useLocation();
  const email = currentLocation.state.email;

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [showLoading, setShowLoading] = useState(false);

  let content = <Outlet setShowLoading={setShowLoading}/>;
  if (currentLocation.pathname === "/beautyflow") {
    content = (
      <div className="container-fluid d-flex flex-row justify-content-start mt-2">
        <div className="">
          <Profit email={email} />
        </div>
        <div>
          <div className="row">
            <div className="col-3">
              <ServicesPie
                email={email}
                year={year}
                month={month}
                setShowLoading={setShowLoading}
              />
            </div>
            <div className="col-7">
              <MonthSaleColumn
                email={email}
                year={year}
                setYear={setYear}
                setMonth={setMonth}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <MethodDonutTotal email={email} />
            </div>
            <div className="col">
              <MethodDonutYear email={email} year={year} />
            </div>
            <div className="col">
              <MethodDonut email={email} year={year} month={month} />
            </div>
          </div>
          {/* <div className="row">
            <div className="col bg-primary"> 1</div>
            <div className="col bg-alert"> 2</div>
            <div className="col bg-danger"> 3</div>
          </div> */}
        </div>
      </div>
    );
  }
  return (
    <div>
      {showLoading &&
        ReactDOM.createPortal(
          <LoadingScreen />,
          document.querySelector(".loading")
        )}
      <NavBar />
      {content}
    </div>
  );
}

export default App;
