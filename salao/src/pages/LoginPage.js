import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Message from "../components/Message";

import logo from "./logo2.png";
import "../Style.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageShow, setMessageShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (email !== "" && password !== "") {
      axios
        .post("/login", { email, password })
        .then((res) => {
          setMessage("");
          setMessageShow(false);
          navigate("/beautyflow", {
            state: {
              email,
            },
          });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setMessageType("error");
            setMessage(err.response.data.errorMessage);
            console.log(err.response.data.errorMessage);
            setMessageShow(true);
          }
        });
    } else {
      setMessageType("error");
      setMessageShow(true);
      setMessage("Informe os valores");
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassordd = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center h-100">
      <main className="form-signin w-100 m-auto">
        <div>
          <Message
            setMessageShow={setMessageShow}
            messageType={messageType}
            messageShow={messageShow}
            message={message}
          />
        </div>
        <form
          className="border p-5 w-100 rounded"
          style={{ backgroundColor: "white" }}
          onSubmit={onSubmit}
        >
          <div className="d-flex justify-content-center">
            <img className="mb-4" src={logo} alt="" width="72" height="57" />
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control fs-6 input-login"
              id="floatingInput "
              placeholder="name@example.com"
              value={email}
              onChange={onChangeEmail}
            />
            <label className="fs-5" htmlFor="floatingInput">
              Email{" "}
            </label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control fs-6 input-login"
              id="floatingPassword "
              placeholder="senha"
              value={password}
              onChange={onChangePassordd}
            />
            <label className="fs-5" htmlFor="floatingPassword">
              Senha{" "}
            </label>
          </div>

          <button className="w-100 btn btn-lg  mt-2 fs-5 button">
            Login
          </button>
        </form>

        <div
          className="d-flex flex-row justify-content-center border mt-2 p-4 fs-6 rounded"
          style={{ backgroundColor: "white" }}
        >
          Não tem uma conta?{" "}
          <Link to="/signup" className="link ms-1">
            Criar Conta
          </Link>
          .
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
