import ShowSchedule from "./ShowSchedule";

function Schedules({ data, type, handleReset, config, email }) {
  const content = data.map((schedule, index) => {
    return (
      <ShowSchedule
        key={index}
        schedule={schedule}
        type={type}
        handleReset={handleReset}
        config={config}
        email={email}
      />
    );
  });

  return <div className="schedule-container">{content}</div>;
}

export default Schedules;
