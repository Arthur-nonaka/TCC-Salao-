import { useState, Fragment } from "react";
import { BsPencilFill } from "react-icons/bs";
import axios from "axios";

import DeleteButton from "./DeleteButton";

function ShowRow({
  row,
  config,
  type,
  handleReset,
  accordion,
  handleSetEditId,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [accordionContent, setAccordionContent] = useState([]);

  let values = Object.values(row);
  let rowCode = values.shift();

  const handleClickEdit = (id) => {
    handleSetEditId(id);
  };
  const handleClickOpen = () => {
    if (accordion) {
      setIsOpen(!isOpen);
      axios.post("/pullAccordion/" + accordion, { rowCode }).then((res) => {
        setAccordionContent(res.data);
      });
    }
  };

  const renderedAccordionContent = accordionContent.map(
    (accordionValue, index) => {
      return <div key={index}>{Object.values(accordionValue)}</div>;
    }
  );

  const renderedCells = config.map((column, index) => {
    return (
      <td key={index} onClick={handleClickOpen}>
        <label style={{ width: "180px" }}>{column.render(row)}</label>
      </td>
    );
  });

  const renderedRow = (
    <Fragment>
      <tr className="accordion">
        {renderedCells}
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
              className="btn btn-primary"
              onClick={() => handleClickEdit(id)}
            >
              <BsPencilFill fontSize={13} />{" "}
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
      {isOpen && (
        <div className="accordion-content">{renderedAccordionContent}</div>
      )}
    </Fragment>
  );

  return renderedRow;
}

export default ShowRow;
