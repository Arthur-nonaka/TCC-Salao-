import DeleteButton from "./DeleteButton";
import SellButton from "./SellButton";

import axios from "axios";
import { useEffect, useState } from "react";

function ShowSchedule({
  schedule,
  type,
  handleReset,
  config,
  setMessage,
  setMessageType,
  setMessageShow,
  email,
}) {
  const [services, setServices] = useState([]);
  let isPastDate = false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/pullAccordion/Agenda", {
          schedule,
        });
        setServices(res.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const servicesShow = services.map((service, index) => {
    if (service.ser_nome.length > 12) {
      return (
        <label key={index}>{service.ser_nome.substring(0, 12) + "..."}</label>
      );
    }
    return <label key={index}>{service.ser_nome}</label>;
  });

  const content = config.map((row, index) => {
    return (
      <div key={index} className="">
        {row.render(schedule)}
      </div>
    );
  });
  const date = new Date();
  var datearray = schedule.age_date.split("-");
  date.setHours(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setMilliseconds(0);
  if (date > new Date(datearray[1] + "-" + datearray[0] + "-" + datearray[2])) {
    isPastDate = true;
  }

  let values = [schedule.cli_nome];
  return (
    <div
      className="schedule-part"
      style={
        isPastDate
          ? { backgroundColor: "#F6D55C" }
          : { backgroundColor: "#FBC8DB" }
      }
    >
      {content}
      -------
      {servicesShow}
      <div className="buttons">
        <SellButton
          schedule={schedule}
          services={services}
          setMessage={setMessage}
          setMessageShow={setMessageShow}
          setMessageType={setMessageType}
          email={email}
          handleReset={handleReset}
        />
        <DeleteButton
          handleReset={handleReset}
          type={type}
          rowCode={schedule.age_codigo}
          values={values}
        />
      </div>
    </div>
  );
}

export default ShowSchedule;
