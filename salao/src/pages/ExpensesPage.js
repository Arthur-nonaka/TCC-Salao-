import { useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";

import Title from "../components/Title";
import FunctionsBar from "../components/FunctionsBar";
import Message from "../components/Message";
import SearchTerm from "../components/SearchTerm";

function ExpensesPage() {
  const setShowLoading = useOutletContext();
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState(new Date().getMonth()+1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [messageShow, setMessageShow] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const currentLocation = useLocation();
  const email = currentLocation.state.email;
  const type = "Despesas";

  const [reset, setReset] = useState(false);
  const handleReset = () => {
    setReset(!reset);
  };
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    setShowLoading(true);
    axios
      .post("/pull/Despesas", { email, year, month })
      .then((res) => {
        setExpenses(res.data);
        setShowLoading(false);
      })
      .catch((err) => {
        setMessageType("error");
        setMessage(err);
        setMessageShow(true);
      });
  }, [reset, email, year, month]);

  const config = [
    {
      label: "Descrição",
      render: (value) => value.des_descricao,
      value: (value) => value.des_descricao,
    },
    {
      label: "Preço",
      render: (value) => <div>R${value.des_valor}</div>,
      value: (value) => value.des_valor,
    },
    {
      label: "Data",
      render: (value) => value.des_data,
      equal: (value) => value.des_data,
      value: (value) => value.des_data,
    },
  ];

  const handlePriceChange = (event) => {
    if (event.target.value >= 0) {
      setPrice(event.target.value);
    } else {
      setPrice(price);
    }
  };

  const registerPage = (
    <div>
      <div className="form-group w-auto me-1">
        <label className="fs-6 mb-1"> Descrição </label>
        <input
          type="text"
          className="form-control p-2 input"
          placeholder="Nome"
          onChange={(event) => setDesc(event.target.value)}
          value={desc}
        />
      </div>
      <div className="me-1">
        <label className="fs-6 mb-1"> Preço </label>
        <input
          type="number"
          className="form-control p-2 input"
          placeholder="Preço"
          onChange={handlePriceChange}
          value={price}
        />
      </div>
      <div className="form-group w-auto me-1">
        <label className="fs-6 mb-1"> Dia </label>
        <input
          type="date"
          className="form-control p-2 input"
          onInput={(event) => setDate(event.target.value)}
        />
      </div>
    </div>
  );

  const values = { desc, price, date, email };
  const resetValues = () => {
    setDesc("");
    setPrice(0);
    setDate("");
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
        data={expenses}
        config={config}
        size={"10000px"}
        type={type}
        handleReset={handleReset}
        setYear={setYear}
        setMonth={setMonth}
        year={year}
        month={month}
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

export default ExpensesPage;
