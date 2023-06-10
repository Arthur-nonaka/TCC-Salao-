import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function FunctionsBar({
  registerPage,
  type,
  values,
  handleReset,
  setMessage,
  setMessageShow,
  setMessageType,
  resetValues,
  width,
}) {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
    resetValues();
  };

  const register = () => {
    axios
      .post("/register/" + type, { values, type })
      .then((res) => {
        setMessageType("success");
        setMessage(res.data);
        setMessageShow(true);
        handleReset();
        resetValues();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setMessageType("error");
          setMessage(err.response.data.errorMessage);
          setMessageShow(true);
        }
      });
  };

  const handleClickRegister = (event) => {
    event.preventDefault();
    for (let x = 0; x < Object.values(values).length; x++) {
      if (Object.values(values)[x] === "") {
        setMessageType("error");
        setMessage("Insira um valor em todos os campos");
        setMessageShow(true);
        handleShowRegister();
        return;
      }
    }
    register();
    handleShowRegister();
  };

  return (
    <div className="sidebar ">
      {showRegister &&
        ReactDOM.createPortal(
          <div className="background-modal">
            <div className="modal-container" onClick={handleShowRegister}></div>
            <div className="register">
              <form
                className="border p-4 rounded"
                style={{
                  backgroundColor: "white",
                  borderColor: "#E68AA5",
                  width: width,
                }}
              >
                {registerPage}
                <div className="form-row d-flex justify-content-between">
                  <button
                    onClick={handleClickRegister}
                    type="submit"
                    className="btn p-2 fs-7 button me-1 m-2"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.querySelector(".modal-page")
        )}

      <ul className="navbar-nav mb-lg-0">
        <button onClick={handleShowRegister} className="options ">
          Cadastrar
        </button>
      </ul>
    </div>
  );
}

export default FunctionsBar;
