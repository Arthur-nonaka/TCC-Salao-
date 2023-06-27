import { useState, useEffect } from "react";
import { BsPencilFill } from "react-icons/bs";
import axios from "axios";

import DeleteButton from "./DeleteButton";

function ShowRowEdit({
  row,
  config,
  type,
  handleReset,
  handleSetEditId,
}) {
  const [editValues, SetEditValues] = useState([]);

  let values = Object.values(row);
  let rowCode = values.shift();

  useEffect(() => {
    SetEditValues(values);
  }, []);

  const handleClickEdit = async () => {
    try {
      handleSetEditId(0);
      await axios.post("/edit/" + type, { editValues, rowCode });
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (event, index) => {
    const updatedValues = editValues.map((value, i) => {
      if (index === i) {
        return event.target.value;
      }
      return value;
    });

    SetEditValues(updatedValues);
  };

  const renderedCellsEdit = config.map((column, index) => {
    return (
      <td key={index}>
        <input
          value={editValues[index]}
          className="form-control input"
          style={{ width: "180px", padding: "1px" }}
          onChange={(event) => handleChangeInput(event, index)}
        />
      </td>
    );
  });

  const renderedRowEdit = (
    <tr className="accordion">
      {renderedCellsEdit}
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="btn-group" style={{ height: "29px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="btn btn-success"
            onClick={() => handleClickEdit()}
          >
            <BsPencilFill fontSize={13} />
          </button>
          <DeleteButton
            handleReset={handleReset}
            values={values}
            type={type}
            rowCode={rowCode}
          />
        </div>
      </td>
    </tr>
  );

  return renderedRowEdit;
}

export default ShowRowEdit;
