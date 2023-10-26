import NavBar from "./components/NavBar";
import ReactDOM from "react-dom";

import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "./pages/logo.jpeg";

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

  let content = <Outlet context={setShowLoading} />;
  if (currentLocation.pathname === "/beautyflow") {
    content = (
      <div className="container-fluid d-flex flex-row justify-content-start mt-2">
        <div className="">
          <Profit email={email} year={year} month={month} />
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
      <div style={{ height: "94vh" }}>{content}</div>

      <footer>
        <div className="rodape">
          <div className="contato">
            <label className="title">Fale Conosco:</label>
            <i className="bx bxl-instagram-alt">
              <a className="desc">@BeautyFlowOFC</a>
            </i>
            <i className="bx bxl-facebook-circle">
              <a className="desc">BeautyFlowOFC</a>
            </i>
            <i className="bx bxl-twitter">
              <a className="desc">yourBeautyFlow</a>
            </i>
            <i className="bx bxs-phone">
              <a className="desc">99607-1828</a>
            </i>
          </div>
          <div className="logo">
            <img className="logoImg" src={logo} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
