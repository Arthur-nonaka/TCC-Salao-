import { Link } from "react-router-dom";
import Button from '../components/Button'

import logo from './yoshi.png';

import '../Login.css';

function LoginPage() {


  return (
    <div className='container-fluid d-flex flex-column align-items-center h-100'>
      <main className="form-signin w-100 m-auto">
        <form className="border p-5 w-100 rounded">
          <div className="d-flex justify-content-center">
            <img className="mb-4" src={logo} alt="" width="72" height="57" />
          </div>

          <div className="form-floating">
            <input type="email" className="form-control fs-6" id="floatingInput " placeholder="name@example.com" />
            <label className="fs-5" for="floatingInput">Email </label>
          </div>

          <div className="form-floating">
            <input type="password" className="form-control fs-6" id="floatingPassword " placeholder="senha" />
            <label className="fs-5" for="floatingPassword">Senha </label>
          </div>

          <Link to='beautyflow'>
            <Button css="w-100 btn btn-lg btn-primary mt-2 fs-5" type="submit">Login</Button>
          </Link>

        </form>

        <div className='d-flex flex-row justify-content-center border mt-2 p-4 fs-6 rounded'>
          Não tem uma conta? <Link to='/signup' className="link ms-1">Criar Conta</Link>.
        </div>
      </main>
    </div>
  );
};

export default LoginPage;