import DeleteButton from "./DeleteButton";

function ShowSchedule({ schedule, type, handleReset, config }) {
  const content = config.map((row, index) => {
    return (
      <div key={index} className="">
        {row.render(schedule)}
      </div>
    );
  });

  let values = [schedule.cli_nome];
  return (
    <div className="schedule-part">
      {content}
      <DeleteButton
        handleReset={handleReset}
        type={type}
        rowCode={schedule.age_codigo}
        values={values}
      />
    </div>
  );
}

export default ShowSchedule;
