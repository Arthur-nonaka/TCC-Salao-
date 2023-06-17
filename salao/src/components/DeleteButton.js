import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";

function DeleteButton({ handleReset, values, type, rowCode }) {
  const handleClickDelete = async () => {
    let r = prompt("Digite '" + values[0] + "' para confirmar o DELETE");
    if (r === values[0]) {
      try {
        await axios.post("/delete/" + type, { rowCode, type });
        handleReset();
      } catch (error) {
        console.log(error);
      }
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
