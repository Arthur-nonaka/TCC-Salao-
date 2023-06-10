import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Message from "../components/Message";

import "../Login.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [salonName, setSalonName] = useState("");
  const [messageShow, setMessageShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeSalonName = (event) => {
    setSalonName(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setMessageShow(true);
      setMessage("Preencha todos os campos");
    } else if (password !== confirmPassword) {
      setMessageShow(true);
      setMessage("Valores invalidos na senha");
    } else {
      const type = "user";
      axios
        .post("/register/" + type, { type, name, email, password, salonName })
        .then((res) => {
          setMessage("");
          setMessageShow(false);
          navigate("/");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setMessage(err.response.data.errorMessage);
            setMessageShow(true);
          } else {
            setMessage(err.message);
            setMessageShow(true);
          }
        });
    }
  };

  return (
    <div className="container-fluid d-flex  align-items-center h-100">
      <main className=" m-auto" style={{ width: "500px" }}>
        <div>
          <Message
            messageShow={messageShow}
            setMessageShow={setMessageShow}
            messageType={messageType}
            message={message}
          />
        </div>
        <form
          className="border p-4 rounded"
          style={{ backgroundColor: "white" }}
          onSubmit={onSubmit}
        >
          <div className="form-group  m-2 w-auto me-1">
            <label className="fs-6 mb-1"> Nome </label>
            <input
              type="text"
              className="form-control p-2 input"
              placeholder="Nome"
              onChange={handleChangeName}
              value={name}
            />
          </div>
          <div className="form-group  m-2 w-auto me-1">
            <label className="fs-6 mb-1"> Nome do Estabelecimento </label>
            <input
              type="text"
              className="form-control p-2 input"
              placeholder="Nome do Estabelecimento"
              onChange={handleChangeSalonName}
              value={salonName}
            />
          </div>
          <div className="form-row d-flex">
            <div className="form-group ms-2 w-50">
              <label className="fs-6 mb-1"> Senha</label>
              <input
                type="password"
                className="form-control p-2 input"
                placeholder="Senha"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <div className="form-group ps-1 w-50 me-1">
              <label className="fs-6 mb-1"> Confirmar Senha</label>
              <input
                type="password"
                className="form-control p-2 input"
                placeholder="Confirmar"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
            </div>
          </div>
          <div className="form-group  m-2 w-auto me-1">
            <label className="fs-6 mb-1"> Email </label>
            <input
              type="text"
              className="form-control input"
              id="floatingEmail "
              placeholder="user@gmail.com"
              onChange={handleChangeEmail}
              value={email}
            />
          </div>
          <div className="form-row me-1 d-flex justify-content-end">
            <button type="submit" className="btn p-2 fs-6 button">
              Cadastrar
            </button>
          </div>
        </form>

        <div className="mt-2">
          <Link to="/" className="link">
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
}

export default SignUpPage;
