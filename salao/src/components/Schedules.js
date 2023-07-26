import ShowSchedule from "./ShowSchedule";

function Schedules({ data, type, handleReset, config, email, setMessage, setMessageType, setMessageShow }) {
  const content = data.map((schedule, index) => {
    return (
      <ShowSchedule
        key={index}
        schedule={schedule}
        type={type}
        handleReset={handleReset}
        config={config}
        email={email}
        setMessage={setMessage}
        setMessageShow={setMessageShow}
        setMessageType={setMessageType}
      />
    );
  });

  return <div className="schedule-container">{content}</div>;
}

export default Schedules;
