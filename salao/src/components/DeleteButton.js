import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";

function DeleteButton({ handleReset, values, type, rowCode }) {
  const handleClickDelete = () => {
    let r = prompt("Digite '" + values[0] + "' para confirmar o DELETE");
    if (r === values[0]) {
      axios
        .post("/delete/" + type, { rowCode, type })
        .then((res) => {
          handleReset();
        })
        .catch((err) => {
          alert("DELETE o agendamento PRIMEIRO");
        });
    } else {
      alert("Nao ocorreu o DELETE");
    }
  };

  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="btn btn-danger"
      onClick={() => handleClickDelete()}
    >
      <BsFillTrash3Fill fontSize={13} />
    </button>
  );
}

export default DeleteButton;
