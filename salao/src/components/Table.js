import { useState } from "react";
import { BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";
import ShowRow from "./ShowRow";
import ShowRowEdit from "./ShowRowEdit";

function Table({ data, config, type, handleReset, size, accordion, setYear, setMonth, year, month }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [editId, setEditId] = useState(0);

  const handleSetEditId = (id) => {
    setEditId(id);
  };

  const handleLeftClick = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  const handleRightClick = () => {
    setPageNumber(pageNumber + 1);
  };

  const updatedData = data.slice((pageNumber - 1) * 10, pageNumber * 10);
  const nextupdatedData = data.slice(pageNumber * 10, pageNumber * 20);

  const renderedHeader = config.map((column) => {
    if (column.header) {
      return (
        <th style={{ width: size, padding: "0" }} key={column.label}>
          {column.header()}
        </th>
      );
    }

    return (
      <th style={{ width: size }} key={column.label}>
        {column.label}
      </th>
    );
  });
  const updatedHeader = [...renderedHeader, <th key={"A"}> </th>];

  const renderedRows = updatedData.map((row) => {
    let content = (
      <ShowRow
        key={row.id}
        id={row.id}
        row={row}
        config={config}
        type={type}
        handleReset={handleReset}
        accordion={accordion}
        handleSetEditId={handleSetEditId}
      />
    );
    if (editId === row.id) {
      content = (
        <ShowRowEdit
          key={row.id}
          row={row}
          config={config}
          type={type}
          handleReset={handleReset}
          accordion={accordion}
          handleSetEditId={handleSetEditId}
        />
      );
    }
    return content;
  });
  const handleLeftMonthClick = () => {
    setPageNumber(1);
    setMonth(month - 1);
    if (month <= 1) {
      setYear(year - 1);
      setMonth(12);
    }
  }
  const handleRightMonthClick = () => {
    setPageNumber(1);
    setMonth(month + 1);
    if (month >= 12) {
      setYear(year + 1);
      setMonth(1);
    }
  }
  let monthName;
  switch (month) {
    case 1:
      monthName = "Janeiro";
      break;
    case 2:
      monthName = "Fevereiro";
      break;
    case 3:
      monthName = "Março";
      break;
    case 4:
      monthName = "Abril";
      break;
    case 5:
      monthName = "Maio";
      break;
    case 6:
      monthName = "Junho";
      break;
    case 7:
      monthName = "Julho";
      break;
    case 8:
      monthName = "Agosto";
      break;
    case 9:
      monthName = "Setembro";
      break;
    case 10:
      monthName = "Outubro";
      break;
    case 11:
      monthName = "Novembro";
      break;
    case 12:
      monthName = "Dezembro";
      break;
  }

  let monthContent = <div></div>;
  if (year !== undefined) {
    monthContent =
      <div>
        {year}
        <button onClick={handleLeftMonthClick} className="buttonWithSymbol">
          {" "}
          <BsCaretLeftFill />{" "}
        </button>
        <label style={{width: "80px", textAlign: "center"}}>
          {monthName}
        </label>
        <button onClick={handleRightMonthClick} className="buttonWithSymbol">
          {" "}
          <BsCaretRightFill />{" "}
        </button>
      </div>
  }

  return (
    <div>
      <table
        className="table table-striped table-border"
        style={{ margin: "0" }}
      >
        <thead style={{ backgroundColor: "#FBACC7" }}>
          <tr>{updatedHeader}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      <div className="page">
        <div>
          <button onClick={handleLeftClick} className="buttonWithSymbol">
            <BsCaretLeftFill size={19} />
          </button>
          <label style={{ fontSize: "20px" }}>{pageNumber}</label>
          <button
            onClick={handleRightClick}
            className="buttonWithSymbol"
            disabled={nextupdatedData.length === 0}
          >
            <BsCaretRightFill size={19} />
          </button>
        </div>
        {monthContent}
      </div>
    </div>
  );
}

export default Table;
