import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

import Button from '../components/Button'

import logo from './yoshi.png';
import '../Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/login', { email, password })
      .then(res => {
        setText('');
        setErrorShow(false);
        navigate('/beautyflow');
      })
      .catch(err => {
        if (err.response.status == 400) {
          setText(err.response.data.errorMessage);
          setErrorShow(true);
        }
      })
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassordd = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseError = () => {
    setErrorShow(false);
  };

  const content = <div className="border p-4 d-flex justify-content-between align-items-center mb-2 rounded text-danger border-danger bg-danger bg-opacity-25">
    {text}
    <div className='Xbutton' onClick={handleCloseError}>
      X
    </div>
  </div>;

  return (
    <div className='container-fluid d-flex flex-column align-items-center h-100'>
      <main className="form-signin w-100 m-auto">
      <div>
        {errorShow && content}
      </div>
        <form className="border p-5 w-100 rounded">
          <div className="d-flex justify-content-center">
            <img className="mb-4" src={logo} alt="" width="72" height="57" />
          </div>

          <div className="form-floating">
            <input type="email" className="form-control fs-6" id="floatingInput " placeholder="name@example.com" value={email} onChange={onChangeEmail} />
            <label className="fs-5" htmlFor="floatingInput">Email </label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control fs-6" id="floatingPassword " placeholder="senha" value={password} onChange={onChangePassordd} />
            <label className="fs-5" htmlFor="floatingPassword">Senha </label>
          </div>

          <Button css="w-100 btn btn-lg btn-primary mt-2 fs-5" type="submit" onClick={onSubmit}>Login</Button>

        </form>

        <div className='d-flex flex-row justify-content-center border mt-2 p-4 fs-6 rounded'>
          Não tem uma conta? <Link to='/signup' className="link ms-1">Criar Conta</Link>.
        </div>
      </main>
    </div>
  );
};

export default LoginPage;