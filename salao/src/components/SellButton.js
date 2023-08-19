import { BiMoney } from "react-icons/bi";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

function SellButton({
  schedule,
  services,
  setMessage,
  setMessageType,
  setMessageShow,
  email,
  handleReset,
}) {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  const handleSellClick = (event) => {
    event.preventDefault();
    const selectElement = document.getElementById("method");
    const selectedValue = selectElement.value;

    axios
      .post("/register/Venda", {
        email,
        schedule,
        services,
        totalPrice,
        selectedValue,
      })
      .then((res) => {
        setMessageType("success");
        setMessage(res.data);
        setMessageShow(true);
        setShowModal(false);
        handleReset();
      })
      .catch((err) => console.log(err));
  };

  const handleButtonClick = () => {
    setShowModal(!showModal);
    setPrice(0);
  };
  const handlePriceChange = (event) => {
    if (event.target.value >= 0) {
      setPrice(event.target.value);
    } else {
      setPrice(price);
    }
  };

  const plus = (event) => {
    event.preventDefault();
    setTotalPrice((parseFloat(totalPrice) + parseFloat(price)).toFixed(2));
    setPrice(0);
  };
  const minus = (event) => {
    event.preventDefault();
    if (parseFloat(totalPrice) - parseFloat(price) < 0) {
    } else {
      setTotalPrice((parseFloat(totalPrice) - parseFloat(price)).toFixed(2));
      setPrice(0);
    }
  };

  const servicesShow = services.map((service) => {
    let content = service.ser_nome;
    if (service.ser_nome.length > 12) {
      content = <label>{service.ser_nome.substring(0, 12) + "..."}</label>;
    }

    return (
      <li>
        <div>
          {content} - R${service.ser_preco}{" "}
        </div>
      </li>
    );
  });

  useEffect(() => {
    let y = 0;
    services.forEach((x) => {
      y += x.ser_preco;
    });
    setTotalPrice(y);
  }, [services]);
  let servicesPrices = 0;
  services.forEach((x) => {
    servicesPrices += x.ser_preco;
  });

  return (
    <div>
      {showModal &&
        ReactDOM.createPortal(
          <div className="background-modal">
            <div
              className="modal-container"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="register">
              <form
                className="border p-4 rounded"
                style={{
                  backgroundColor: "white",
                  borderColor: "#E68AA5",
                  width: "360px",
                }}
              >
                <div>
                  <h2> Realizar Venda</h2>
                  <h5 style={{ backgroundColor: "#FBC8DB", padding: "5px" }}>
                    {schedule.cli_nome}
                  </h5>
                  <h5> Serviços (R${servicesPrices}) </h5>
                  <ul>{servicesShow}</ul>
                  <h5>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Preço Total: R${totalPrice}
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0px",
                          margin: "7px",
                          borderRadius: "20px",
                          backgroundColor: "#FBACC7",
                          color: "white",
                        }}
                        className="btn"
                        onClick={plus}
                      >
                        {" "}
                        <BiPlusCircle size={20} />
                      </button>
                      <input
                        type="number"
                        className="form-control fs-6 input-login"
                        style={{
                          width: "50px",
                          padding: "5px",
                          height: "26px",
                        }}
                        onChange={handlePriceChange}
                        value={price}
                      />
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0px",
                          margin: "7px",
                          borderRadius: "20px",
                          backgroundColor: "#FBACC7",
                          color: "white",
                        }}
                        className="btn"
                        onClick={minus}
                      >
                        <BiMinusCircle size={20} />
                      </button>
                    </div>
                  </h5>
                  <h6>
                    Forma de Pagamento:
                    <div>
                      <select
                        id="method"
                        className="form-control input method fs-7"
                      >
                        <option value={"cartao"}>Cartão</option>
                        <option value={"pix"}>Pix</option>
                        <option value={"dinheiro"}>Dinheiro</option>
                        <option value={"outros"}>Outros...</option>
                      </select>
                    </div>
                  </h6>
                </div>
                <div className="form-row d-flex justify-content-between">
                  <button
                    onClick={handleSellClick}
                    type="submit"
                    className="btn p-2 fs-7 button me-1 m-2"
                  >
                    Vender
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.querySelector(".modal-page")
        )}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          padding: "7px",
          width: "37px",
        }}
        className="btn btn-success"
        onClick={handleButtonClick}
      >
        <BiMoney fontSize={16} />
      </button>
    </div>
  );
}

export default SellButton;
