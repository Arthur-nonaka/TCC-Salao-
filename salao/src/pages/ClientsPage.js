import { useState, useEffect } from "react";
import { useLocation,useOutletContext } from "react-router-dom";
import axios from "axios";

import PhoneInput from "../components/PhoneInput";
import Title from "../components/Title";
import FunctionsBar from "../components/FunctionsBar";
import Message from "../components/Message";
import SearchTerm from "../components/SearchTerm";

function ClientsPage() {
  const setShowLoading = useOutletContext();
  const [name, setName] = useState("");
  const [fone, setFone] = useState("");

  const [messageShow, setMessageShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const currentLocation = useLocation();
  const email = currentLocation.state.email;
  const type = "Clientes";

  const [reset, setReset] = useState(false);
  const handleReset = () => {
    setReset(!reset);
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    setShowLoading(true);
    axios
      .post("/pull/Clientes", { email })
      .then((res) => {
        setClients(res.data);
        setShowLoading(false);
      })
      .catch((err) => {
        setMessageType("error");
        setMessage(err);
        setMessageShow(true);
      });
  }, [reset, email]);

  const config = [
    {
      label: "Nome",
      render: (value) => value.cli_nome,
      sortValue: (value) => value.cli_nome,
      searchValue: (value) => value.cli_nome,
      value: (value) => value.cli_nome,
    },
    {
      label: "Telefone",
      render: (value) => value.cli_telefone,
      value: (value) => value.cli_telefone,
    },
  ];

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeFone = (event) => {
    setFone(event.target.value);
  };

  const registerPage = (
    <div>
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
        <label className="fs-6 mb-1"> Telefone </label>
        <PhoneInput value={fone} onChange={handleChangeFone} classname={"form-control p-2 input"}/>
      </div>
    </div>
  );

  const values = { name, fone, email };
  const resetValues = () => {
    setName("");
    setFone("");
  };
  return (
    <div className="main">
      <Title type={type}></Title>
      <Message
        setMessageShow={setMessageShow}
        messageShow={messageShow}
        messageType={messageType}
        message={message}
      />
      <SearchTerm
        data={clients}
        config={config}
        size={"10000px"}
        type={type}
        handleReset={handleReset}
      />
      <FunctionsBar
        width={"300px"}
        resetValues={resetValues}
        registerPage={registerPage}
        values={values}
        type={type}
        handleReset={handleReset}
        setMessage={setMessage}
        setMessageShow={setMessageShow}
        setMessageType={setMessageType}
      />
    </div>
  );
}

export default ClientsPage;
